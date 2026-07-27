import { CustomFallbackPage, getGenericCustomPages } from '../data/customFallback';

export interface CustomGenerationResult {
  pages: CustomFallbackPage[];
  isAiGenerated: boolean;
  message?: string;
}

export async function generateCustomBookContent(
  topic: string,
  ageGroup: string,
  language: string,
  style: string,
  pageCount: number
): Promise<CustomGenerationResult> {
  try {
    const response = await fetch('/api/generate-custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, ageGroup, language, style, pageCount }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && Array.isArray(data.items) && data.items.length > 0) {
        return {
          pages: data.items,
          isAiGenerated: true,
          message: 'Generated using Gemini AI',
        };
      }
    }
  } catch (err) {
    console.warn('AI API call unreachable or error, falling back to built-in template library:', err);
  }

  // Fallback to local custom library
  const fallbackPages = getGenericCustomPages(topic, pageCount);
  return {
    pages: fallbackPages,
    isAiGenerated: false,
    message: 'Custom AI generation requires an AI API connection. Built-in educational templates are available now.',
  };
}
