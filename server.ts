import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI-powered Custom Topic Book Generation
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
        parsed = JSON.parse(responseText);
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
