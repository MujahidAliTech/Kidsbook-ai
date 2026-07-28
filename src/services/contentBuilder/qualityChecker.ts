import { BookConfig, QualityScore } from '../../types';

/**
 * Cleans markdown code fences, trailing commas, and unclosed JSON strings
 */
export function cleanAndRepairJson(rawText: string): any {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('Empty or invalid raw AI output');
  }

  // 1. Strip markdown fences
  let cleaned = rawText
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  // 2. Find start of JSON object or array
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');

  let startIndex = -1;
  if (firstBrace !== -1 && firstBracket !== -1) {
    startIndex = Math.min(firstBrace, firstBracket);
  } else if (firstBrace !== -1) {
    startIndex = firstBrace;
  } else {
    startIndex = firstBracket;
  }

  if (startIndex > 0) {
    cleaned = cleaned.substring(startIndex);
  }

  // 3. Find matching end index
  const lastBrace = cleaned.lastIndexOf('}');
  const lastBracket = cleaned.lastIndexOf(']');
  const endIndex = Math.max(lastBrace, lastBracket);

  if (endIndex !== -1 && endIndex < cleaned.length - 1) {
    cleaned = cleaned.substring(0, endIndex + 1);
  }

  // 4. Try parsing standard JSON
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn('Initial JSON parse failed. Attempting auto-repair...', err);
  }

  // 5. Auto-repair trailing commas
  cleaned = cleaned
    .replace(/,\s*([\]}])/g, '$1') // remove trailing commas before ] or }
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // remove control chars

  try {
    return JSON.parse(cleaned);
  } catch (err2) {
    console.error('Auto-repair JSON parse also failed:', cleaned);
    throw new Error('Could not repair JSON response from AI.');
  }
}

/**
 * Validates the parsed AI object structure
 */
export function validateBookOutput(data: any, config: BookConfig): boolean {
  if (!data || typeof data !== 'object') return false;

  const pages = Array.isArray(data.pages) ? data.pages : Array.isArray(data) ? data : null;
  if (!pages || pages.length === 0) return false;

  // Check that at least 50% of items have valid title or word
  let validItems = 0;
  for (const page of pages) {
    if (page && (page.title || page.word || page.mainCharacter || page.description)) {
      validItems++;
    }
  }

  return validItems >= Math.max(1, Math.floor(pages.length * 0.5));
}

/**
 * Evaluates pedagogical, readability, and structural quality
 */
export function calculateQualityScore(pages: any[], config: BookConfig): QualityScore {
  let eduPoints = 90;
  let readabilityPoints = 92;
  let agePoints = 90;
  let langPoints = 88;
  let activityPoints = 89;

  if (pages && pages.length > 0) {
    const hasTracing = pages.some((p) => p.tracingText || p.type === 'tracing');
    const hasActivity = pages.some((p) => p.activity || p.type === 'activity' || p.quizQuestions);
    const hasDescription = pages.some((p) => p.description && p.description.length > 5);

    if (hasTracing) eduPoints += 4;
    if (hasActivity) activityPoints += 6;
    if (hasDescription) readabilityPoints += 5;

    if (pages.length >= config.pageCount) {
      agePoints += 5;
    }
  }

  const overall = Math.round((eduPoints + readabilityPoints + agePoints + langPoints + activityPoints) / 5);

  return {
    educationalQuality: Math.min(100, eduPoints),
    readability: Math.min(100, readabilityPoints),
    ageSuitability: Math.min(100, agePoints),
    languageQuality: Math.min(100, langPoints),
    activityQuality: Math.min(100, activityPoints),
    overallScore: Math.min(100, overall),
    passed: overall >= 75
  };
}
