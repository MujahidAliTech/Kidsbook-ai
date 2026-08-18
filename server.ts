import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { buildSystemInstruction, buildBookGenerationPrompt } from "./src/services/prompts/bookPrompts";

// Resilient API calling helper with Exponential Backoff + Jitter to absorb transient 503 errors
async function generateContentWithRetry(ai: any, params: any, maxRetries = 3) {
  let attempt = 0;
  while (true) {
    try {
      return await ai.models.generateContent(params);
    } catch (err: any) {
      attempt++;
      const errStatus = err.status || err.code || (err.error && err.error.code);
      const isTransient = errStatus === 503 || String(err.message || '').includes("503") || String(err.message || '').includes("UNAVAILABLE") || String(err.message || '').includes("high demand");
      
      if (isTransient && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 600 + Math.random() * 300; // ~1.5s, ~2.7s
        console.warn(`[Gemini API 503 Transient Warning] High demand on model ${params.model}. Retrying attempt ${attempt}/${maxRetries} after ${Math.round(delay)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw err;
      }
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Complete AI Educational Book Generation
  app.post("/api/generate-book", async (req, res) => {
    try {
      const { config } = req.body;

      if (!config) {
        return res.status(400).json({ error: "Book configuration is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(503).json({
          error: "API_KEY_NOT_CONFIGURED",
          message: "AI book generation requires an active Gemini API connection.",
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemInstruction = buildSystemInstruction();
      const prompt = buildBookGenerationPrompt(config);

      const modelsToTry = [
        "gemini-3.7-flash",
        "gemini-3.6-flash",
        "gemini-3.5-flash"
      ];

      let lastError: any = null;
      let responseText = "";

      for (const model of modelsToTry) {
        try {
          console.log(`Attempting book generation with model: ${model}`);
          const response = await generateContentWithRetry(ai, {
            model: model,
            contents: prompt,
            config: {
              systemInstruction,
              responseMimeType: "application/json",
              temperature: 0.7,
            },
          });
          responseText = response.text || "{}";
          lastError = null;
          break; // Succeeded!
        } catch (err: any) {
          console.log(`[Model Fallback Handler] Model ${model} returned code: ${err.status || err.code || 'unavailable'}. Retrying next available...`);
          lastError = err;
        }
      }

      if (lastError) {
        throw lastError;
      }

      return res.json({
        success: true,
        payload: responseText,
      });
    } catch (err: any) {
      console.error("Error generating AI book:", err);
      return res.status(500).json({
        error: "GENERATION_FAILED",
        message: err.message || "An unexpected error occurred during AI generation.",
      });
    }
  });

  // API Route for AI-powered Custom Topic Book Generation (Backwards Compatibility)
  app.post("/api/generate-custom", async (req, res) => {

    try {
      const { topic, ageGroup, language, style, pageCount } = req.body;

      if (!topic || typeof topic !== "string") {
        return res.status(400).json({ error: "Topic is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(503).json({
          error: "API_KEY_NOT_CONFIGURED",
          message: "Custom AI generation requires an AI API connection. The built-in educational categories are available now.",
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `You are an expert children's educational content creator.
Create an educational printable mini-book content array for kids aged ${ageGroup || '3-4 Years'}.
Topic: "${topic}"
Language: ${language || 'English'}
Style: ${style || 'Learning Book'}
Number of content items needed: ${pageCount || 5}

Return a valid JSON array of objects, where each object represents one page content:
[
  {
    "title": "Page title or letter/number concept",
    "mainCharacter": "Key letter/number or short word",
    "word": "Main vocabulary word in English",
    "urduWord": "Urdu translation if language is Urdu or Bilingual, otherwise empty string",
    "urduTransliteration": "Phonetic English spelling for Urdu word, or empty string",
    "imageEmoji": "A single representative emoji for visual icon",
    "description": "Simple 1-sentence educational fact suitable for ${ageGroup}",
    "tracingText": "Light tracing guide string like 'CAR CAR CAR'",
    "activity": "Simple interactive prompt like 'Color the car red' or 'Count the wheels'",
    "instructions": "Instruction for parent/child"
  }
]

Make sure the content is age-appropriate, positive, safe, highly engaging for children, and matches the topic strictly.
Respond ONLY with the JSON array.`;

      const modelsToTry = [
        "gemini-3.7-flash",
        "gemini-3.6-flash",
        "gemini-3.5-flash"
      ];

      let lastError: any = null;
      let responseText = "";

      for (const model of modelsToTry) {
        try {
          console.log(`Attempting custom generation with model: ${model}`);
          const response = await generateContentWithRetry(ai, {
            model: model,
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              temperature: 0.7,
            },
          });
          responseText = response.text || "[]";
          lastError = null;
          break; // Succeeded!
        } catch (err: any) {
          console.log(`[Model Fallback Handler] Custom generator model ${model} returned code: ${err.status || err.code || 'unavailable'}. Retrying next available...`);
          lastError = err;
        }
      }

      if (lastError) {
        throw lastError;
      }
      let parsed = [];
      try {
        const cleanedText = responseText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
        parsed = JSON.parse(cleanedText);
      } catch (e) {
        console.error("Failed to parse Gemini JSON output:", responseText);
        return res.status(500).json({ error: "Failed to parse AI output." });
      }

      return res.json({ success: true, items: parsed });
    } catch (err: any) {
      console.error("Error generating custom book:", err);
      return res.status(500).json({
        error: "GENERATION_FAILED",
        message: err.message || "An unexpected error occurred.",
      });
    }
  });

  // Helper for generating fallback SVG coloring page outline
  function generateFallbackSvgDataUrl(prompt: string): string {
    const cleanPrompt = prompt
      .replace(/create a coloring page of/i, '')
      .replace(/a coloring page of/i, '')
      .replace(/color page of/i, '')
      .replace(/draw/i, '')
      .trim()
      .toUpperCase();

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect x="20" y="20" width="460" height="460" rx="24" fill="none" stroke="#000000" stroke-width="6" stroke-dasharray="12 8"/>
      <circle cx="250" cy="220" r="130" fill="#ffffff" stroke="#000000" stroke-width="8"/>
      <circle cx="200" cy="180" r="16" fill="#ffffff" stroke="#000000" stroke-width="6"/>
      <circle cx="300" cy="180" r="16" fill="#ffffff" stroke="#000000" stroke-width="6"/>
      <circle cx="204" cy="184" r="6" fill="#000000"/>
      <circle cx="304" cy="184" r="6" fill="#000000"/>
      <path d="M 220 240 Q 250 270 280 240" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round"/>
      <path d="M 170 120 Q 250 80 330 120" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round"/>
      <text x="250" y="405" font-family="sans-serif" font-weight="900" font-size="26" text-anchor="middle" fill="#ffffff" stroke="#000000" stroke-width="3" letter-spacing="2">
        ${cleanPrompt || 'COLORING PAGE'}
      </text>
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  // API Route for AI Printable Outline Coloring Page Image Generation
  app.post("/api/generate-coloring-image", async (req, res) => {
    try {
      const { prompt: userPrompt } = req.body;

      if (!userPrompt || typeof userPrompt !== "string") {
        return res.status(400).json({ error: "Prompt is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(530).json({
          error: "API_KEY_NOT_CONFIGURED",
          message: "AI Image Generation requires an active Gemini API key. Please configure your GEMINI_API_KEY.",
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const fullPrompt = `A clean, black and white printable outline vector coloring book illustration for kids of: ${userPrompt}. 
Features:
- Pure black outlines on plain white background.
- Bold, smooth, clean vector lines suitable for children to color with crayons or markers.
- No color, no gray shading, no gradients, no photorealism.
- High contrast, cute, age-appropriate, clear subject in center.`;

      let imageUrl: string | null = null;

      // Tier 1: Try gemini-3.1-flash-lite-image
      try {
        const response = await generateContentWithRetry(ai, {
          model: "gemini-3.1-flash-lite-image",
          contents: {
            parts: [
              {
                text: fullPrompt,
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData?.data) {
              const mime = part.inlineData.mimeType || "image/png";
              imageUrl = `data:${mime};base64,${part.inlineData.data}`;
              break;
            }
          }
        }
      } catch (imgError: any) {
        console.log("[Image Fallback Handler] Primary image model gemini-3.1-flash-lite-image rate-limited/failed. Trying backup model...");
        
        // Tier 2: Try gemini-3.1-flash-image
        try {
          const fallbackResp = await generateContentWithRetry(ai, {
            model: "gemini-3.1-flash-image",
            contents: { parts: [{ text: fullPrompt }] },
            config: { imageConfig: { aspectRatio: "1:1" } }
          });
          if (fallbackResp.candidates?.[0]?.content?.parts) {
            for (const part of fallbackResp.candidates[0].content.parts) {
              if (part.inlineData?.data) {
                const mime = part.inlineData.mimeType || "image/png";
                imageUrl = `data:${mime};base64,${part.inlineData.data}`;
                break;
              }
            }
          }
        } catch (e: any) {
          console.log("[Image Fallback Handler] All direct image generation models rate limited. Attempting Tier 3 vector SVG generation...");

          // Tier 3: Ask a text model with higher quota to generate clean SVG code
          try {
            const svgPrompt = `You are a professional children's book illustrator.
Create a clean, cute, black-and-white vector SVG coloring page outline for kids of: "${userPrompt}".
Requirements:
1. Return ONLY raw valid SVG code starting with <svg> and ending with </svg>. No markdown block, no conversational text.
2. ViewBox "0 0 500 500".
3. Use thick black strokes (stroke="#000000", stroke-width="6" or "8") and white fills (fill="#ffffff") or fill="none" suitable for coloring inside the lines.
4. Include simple recognizable cute shapes representing "${userPrompt}".`;

            let svgResp = null;
            for (const textModel of ["gemini-3.7-flash", "gemini-3.6-flash", "gemini-3.5-flash"]) {
              try {
                console.log(`Attempting SVG outline generation with model: ${textModel}`);
                svgResp = await generateContentWithRetry(ai, {
                  model: textModel,
                  contents: svgPrompt,
                  config: { temperature: 0.3 }
                });
                if (svgResp && svgResp.text) {
                  break;
                }
              } catch (svgModelErr: any) {
                console.log(`[SVG Fallback Handler] Outline model ${textModel} unavailable. Trying next backup...`);
              }
            }

            const text = svgResp?.text || "";
            const svgMatch = text.match(/<svg[\s\S]*?<\/svg>/i);
            if (svgMatch) {
              const cleanSvg = svgMatch[0];
              imageUrl = `data:image/svg+xml;utf8,${encodeURIComponent(cleanSvg)}`;
            }
          } catch (svgErr: any) {
            console.log("[SVG Fallback Handler] Tier 3 outline vector generation completed with offline fallback protection.");
          }
        }
      }

      // Tier 4: Fallback to built-in clean vector outline if all AI attempts fail
      if (!imageUrl) {
        imageUrl = generateFallbackSvgDataUrl(userPrompt);
      }

      return res.json({
        success: true,
        imageUrl: imageUrl,
        prompt: userPrompt,
      });

    } catch (err: any) {
      console.error("Error in generate-coloring-image endpoint:", err);
      // Even in catch block, return a valid fallback image so UI never crashes
      return res.json({
        success: true,
        imageUrl: generateFallbackSvgDataUrl(req.body?.prompt || 'Coloring Page'),
        prompt: req.body?.prompt || 'Coloring Page',
        isFallback: true
      });
    }
  });

  // Serve Vite in development mode or static files in production mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KidsBook AI Server running at http://localhost:${PORT}`);
  });
}

startServer();
