import { Book, BookConfig } from '../types';
import { buildCompleteBook } from './contentBuilder/bookBuilder';
import { getLocalFallbackBook } from './fallbackContent/localFallbacks';
import { cleanAndRepairJson, validateBookOutput } from './contentBuilder/qualityChecker';

export interface BookGenerationResult {
  book: Book;
  isAiGenerated: boolean;
  message?: string;
  workflowStep?: string;
}

// Memory Cache to prevent duplicate AI requests
const bookCache = new Map<string, Book>();

function getCacheKey(config: BookConfig): string {
  return `${config.category}_${config.customTopic || ''}_${config.language}_${config.ageGroup}_${config.style}_${config.pageCount}_${config.childName || ''}`;
}

export async function generateAiBook(
  config: BookConfig,
  onProgress?: (step: string) => void
): Promise<BookGenerationResult> {
  const cacheKey = getCacheKey(config);
  if (bookCache.has(cacheKey)) {
    if (onProgress) onProgress('Book Ready! (Loaded from Cache)');
    return {
      book: bookCache.get(cacheKey)!,
      isAiGenerated: true,
      message: 'Generated using Gemini AI (Cached for optimal speed)'
    };
  }

  try {
    if (onProgress) onProgress('Analyzing Topic & Setting Learning Goals...');
    await new Promise((r) => setTimeout(r, 200));

    if (onProgress) onProgress('Planning Lessons & Creating Outline...');
    await new Promise((r) => setTimeout(r, 200));

    if (onProgress) onProgress('Creating Educational Pages & Activities...');

    // 18-second AbortController timeout to prevent the loader from hanging at 92%
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.warn('[AI Service] Generation request timed out after 18 seconds. Switching to instant educational templates.');
    }, 18000);

    const response = await fetch('/api/generate-book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (onProgress) onProgress('Writing Tracing Guides & Exercises...');

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.payload) {
        if (onProgress) onProgress('Performing Educational Quality Check...');

        let parsedPayload = data.payload;
        if (typeof parsedPayload === 'string') {
          try {
            parsedPayload = cleanAndRepairJson(parsedPayload);
          } catch (e) {
            console.warn('Payload repair warning:', e);
          }
        }

        const isValid = validateBookOutput(parsedPayload, config);
        if (isValid) {
          if (onProgress) onProgress('Finalizing Printable A4 Worksheets...');

          const book = buildCompleteBook(config, parsedPayload, true);
          bookCache.set(cacheKey, book);

          if (onProgress) onProgress('Book Ready!');

          return {
            book,
            isAiGenerated: true,
            message: 'Generated using Gemini AI'
          };
        }
      }
    }
  } catch (err) {
    console.warn('AI API call unreachable or error. Switching to built-in template system:', err);
  }

  // Local Fallback if AI unavailable or invalid
  if (onProgress) onProgress('Generating using built-in educational templates...');
  await new Promise((r) => setTimeout(r, 300));

  const fallbackBook = getLocalFallbackBook(config);
  if (onProgress) onProgress('Book Ready!');

  return {
    book: fallbackBook,
    isAiGenerated: false,
    message: 'AI is temporarily unavailable. Generating using built-in educational templates.'
  };
}

/**
 * High-resolution AI Vector Outline Image generator for coloring pages
 */
export async function generateColoringImage(prompt: string): Promise<{ success: boolean; imageUrl?: string; message?: string }> {
  try {
    const response = await fetch('/api/generate-coloring-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.imageUrl) {
        return { success: true, imageUrl: data.imageUrl };
      }
    }
  } catch (err: any) {
    console.warn('Coloring image generation failed:', err);
  }

  return {
    success: false,
    message: 'Image generation requires active AI connection.'
  };
}
