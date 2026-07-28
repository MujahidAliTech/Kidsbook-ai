import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { buildSystemInstruction, buildBookGenerationPrompt } from "./src/services/prompts/bookPrompts";

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

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const responseText = response.text || "{}";

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

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const responseText = response.text || "[]";
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

      try {
        const response = await ai.models.generateContent({
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
        console.warn("Primary image model gemini-3.1-flash-lite-image failed, trying fallback...", imgError.message);
        
        // Fallback attempt with imagen-3.0-generate-002 or gemini-3.1-flash-image
        try {
          const fallbackResp = await ai.models.generateContent({
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
          console.error("All image generation models failed:", e.message);
        }
      }

      if (imageUrl) {
        return res.json({
          success: true,
          imageUrl: imageUrl,
          prompt: userPrompt,
        });
      } else {
        return res.status(500).json({
          error: "IMAGE_GEN_FAILED",
          message: "Could not generate coloring image outline. Please try again or refine your prompt.",
        });
      }
    } catch (err: any) {
      console.error("Error in generate-coloring-image endpoint:", err);
      return res.status(500).json({
        error: "GENERATION_ERROR",
        message: err.message || "Failed to process image generation request.",
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
