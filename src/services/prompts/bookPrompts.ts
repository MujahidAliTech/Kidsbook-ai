import { BookConfig } from '../../types';

export function buildSystemInstruction(): string {
  return `You are a World-Class Senior Children's Educational Author, Curriculum Specialist, and Early Literacy Expert.
Your mission is to generate engaging, pedagogically sound, age-adapted, and 100% safe educational book content for young children (ages 2 to 7).

STRICT SAFETY & QUALITY RULES:
1. SAFE CONTENT: Never produce content related to violence, adult themes, politics, religious debates, medical advice, or scary imagery.
2. AGE ADAPTATION:
   - Ages 2-3: Extremely simple words, single prominent object/letter, 3-4 word sentences, huge visual focus.
   - Ages 3-4: Simple tracing letters/numbers, easy 1-5 counting, repetitive clear sounds.
   - Ages 4-5: Simple activities, matching pairs, 1-10 counting, basic vocabulary.
   - Ages 5-6: Writing guides, vocabulary expansion, simple multiple choice quizzes, phonics.
   - Ages 6-7: Short 2-3 sentence reading passages, word building, simple math/quizzes, fun facts.
3. LANGUAGE REGIMES:
   - English: Clear English vocabulary, phonics, tracing guides.
   - Urdu: Accurate Urdu script (e.g. أ, ب, پ), Urdu word, English transliteration, and Urdu activity instructions.
   - Bilingual: Side-by-side English word + Urdu word + English transliteration (e.g., Apple / سیب / Aam).
4. STRUCTURED OUTPUT: Return strict JSON only. No markdown formatting, no code fences, no extra conversational preamble.`;
}

export function buildLessonPlanPrompt(config: BookConfig): string {
  return `Create a structured educational lesson plan for a book with the following details:
Category: ${config.category}
Topic: ${config.customTopic || config.category}
Age Group: ${config.ageGroup} Years
Language: ${config.language}
Difficulty: ${config.difficulty || 'medium'}
Learning Goal: ${config.learningGoal || 'Master core foundational concepts and engaging practice'}

Return JSON matching this schema:
{
  "learningObjectives": ["string"],
  "targetVocabulary": ["string"],
  "practiceGoals": ["string"],
  "reviewGoals": ["string"],
  "difficultyLevel": "${config.difficulty || 'medium'}",
  "expectedOutcome": "string"
}`;
}

export function buildBookGenerationPrompt(config: BookConfig): string {
  const pageCount = config.pageCount || 6;
  const isUrdu = config.language === 'urdu' || config.category === 'urdu-alphabet';
  const isBilingual = config.language === 'bilingual';

  return `Generate a complete ${pageCount}-page educational book payload for children.

BOOK SPECIFICATIONS:
- Category: ${config.category}
- Specific Topic: "${config.customTopic || config.category}"
- Age Level: ${config.ageGroup} Years
- Language: ${config.language} (Is Urdu: ${isUrdu}, Is Bilingual: ${isBilingual})
- Book Style: ${config.style}
- Requested Content Pages: ${pageCount}
- Learning Goal: ${config.learningGoal || 'Fun foundational learning and active tracing/practice'}
- Child Name (if applicable): "${config.childName || ''}"

PAGE TYPE VARIETY REQUIREMENT:
Mix engaging page types across the book! Supported types:
"learning", "vocabulary", "tracing", "writing", "coloring", "counting", "matching", "quiz", "story", "review", "certificate"

SCHEMA REQUIREMENT:
Return a valid JSON object with the following structure:
{
  "title": "Main Book Title",
  "lessonPlan": {
    "learningObjectives": ["Objective 1", "Objective 2"],
    "targetVocabulary": ["Word 1", "Word 2", "Word 3"],
    "practiceGoals": ["Goal 1", "Goal 2"],
    "reviewGoals": ["Review 1"],
    "difficultyLevel": "${config.difficulty || 'medium'}",
    "expectedOutcome": "Clear summary of child achievement"
  },
  "parentTips": [
    "Tip 1 for parent/teacher",
    "Tip 2 for home practice",
    "Revision idea"
  ],
  "pages": [
    {
      "type": "learning | tracing | coloring | counting | matching | quiz | story | vocabulary | writing | review | certificate",
      "title": "Page Header or Concept Title",
      "mainCharacter": "Featured Letter, Number, or Key Focus (e.g. 'A', '7', '🦁')",
      "word": "Primary English Word",
      "urduWord": "Urdu Word (if Urdu/Bilingual) or empty",
      "urduTransliteration": "Phonetic Pronunciation in English (e.g., 'Seb' for Apple)",
      "imageEmoji": "A single cute representative emoji icon",
      "svgShape": "A simple outline shape key: star | heart | circle | triangle | apple | car | dinosaur | animal | sun | flower",
      "description": "1 to 2 educational sentences suited for age ${config.ageGroup}",
      "tracingText": "Repeated tracing guide line (e.g. 'A A A' or 'APPLE APPLE')",
      "activity": "Interactive call to action prompt for the child",
      "instructions": "Simple parent/child instructions",
      "countingObjects": ["🍎", "🍎", "🍎"],
      "options": ["Option A", "Option B", "Option C"],
      "correctAnswer": "Option A",
      "storyText": "Short 2-4 sentence mini story if type is story (Max 100 words)",
      "storyCharacters": ["Character 1", "Character 2"],
      "learningMessage": "Moral or key takeaway if story",
      "quizQuestions": [
        {
          "question": "Which animal says Roar?",
          "options": ["Cat", "Lion", "Fish"],
          "answer": "Lion"
        }
      ],
      "matchingPairs": [
        { "left": "A", "right": "Apple" },
        { "left": "B", "right": "Ball" }
      ]
    }
  ]
}

Make sure all ${pageCount} pages are distinct, educational, age-appropriate, and non-empty. Do NOT wrap in markdown block. Return raw valid JSON object.`;
}

export function generateAlphabetPrompt(config: BookConfig): string {
  return buildBookGenerationPrompt({ ...config, category: 'alphabet' });
}

export function generateNumberPrompt(config: BookConfig): string {
  return buildBookGenerationPrompt({ ...config, category: 'numbers1-10' });
}

export function generateUrduPrompt(config: BookConfig): string {
  return buildBookGenerationPrompt({ ...config, category: 'urdu-alphabet', language: 'urdu' });
}

export function generateWorksheetPrompt(config: BookConfig): string {
  return buildBookGenerationPrompt({ ...config, category: 'worksheet', style: 'activity' });
}

export function generateStoryPrompt(config: BookConfig): string {
  return buildBookGenerationPrompt({ ...config, category: 'story', style: 'learning' });
}

export function generateTracingPrompt(config: BookConfig): string {
  return buildBookGenerationPrompt({ ...config, style: 'tracing' });
}

export function generateActivityPrompt(config: BookConfig): string {
  return buildBookGenerationPrompt({ ...config, style: 'activity' });
}

export function generateVocabularyPrompt(config: BookConfig): string {
  return buildBookGenerationPrompt({ ...config, category: 'vocabulary' });
}

export function generateCustomBookPrompt(config: BookConfig): string {
  return buildBookGenerationPrompt(config);
}
