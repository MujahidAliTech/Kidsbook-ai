import { Book, BookConfig, BookPage, LessonPlan, QualityScore, PageType } from '../../types';
import { createLessonPlan } from './lessonPlanner';
import { calculateQualityScore } from './qualityChecker';

export function buildCompleteBook(
  config: BookConfig,
  rawAiData: any,
  isAiGenerated: boolean = true
): Book {
  const bookId = `ai-book-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const isRtlLanguage = config.language === 'urdu' || config.category === 'urdu-alphabet';
  const isBilingual = config.language === 'bilingual';

  let title = rawAiData?.title || config.customTitle?.trim();
  if (!title) {
    title = getDefaultTitle(config);
  }

  const rawPages: any[] = Array.isArray(rawAiData?.pages)
    ? rawAiData.pages
    : Array.isArray(rawAiData)
    ? rawAiData
    : [];

  const pages: BookPage[] = [];
  let pageNumberCounter = 1;

  // 1. Cover Page
  if (config.includeCover) {
    pages.push({
      id: `${bookId}-cover`,
      pageNumber: pageNumberCounter++,
      type: 'cover',
      title: title,
      instructions: config.childName ? `Specially created for ${config.childName}` : 'Printable Educational Mini-Book',
      isRtl: isRtlLanguage
    });
  }

  // 2. Introduction & Outline Page
  if (config.pageCount >= 5) {
    pages.push({
      id: `${bookId}-intro`,
      pageNumber: pageNumberCounter++,
      type: 'introduction',
      title: isRtlLanguage ? 'کتاب کا خلاصہ اور خاکہ' : 'Book Outline & Goals',
      description: isRtlLanguage
        ? 'اس کتاب کا مقصد بچوں کے لیے آسان، دلکش اور موثر تعلیم فراہم کرنا ہے۔'
        : `Designed specifically for ages ${config.ageGroup} with interactive lessons, tracing activities, and creative practice.`,
      sectionOutline: [
        'Core Concept & Vocabulary Lessons',
        'Guided Tracing & Motor Control Exercises',
        'Interactive Quizzes & Matching Activities',
        'Parent Guide & Achievement Summary'
      ],
      isRtl: isRtlLanguage
    });
  }

  // 3. Process Content Pages
  const targetCount = Math.min(config.pageCount, rawPages.length > 0 ? rawPages.length : config.pageCount);

  for (let i = 0; i < targetCount; i++) {
    const item = rawPages[i] || {};
    const pageType = (item.type as PageType) || getPageTypeForIndex(i, config.style);

    const page: BookPage = {
      id: `pg-${pageNumberCounter}-${Math.random().toString(36).substring(2, 6)}`,
      pageNumber: pageNumberCounter++,
      type: pageType,
      title: item.title || `${item.mainCharacter || i + 1} - ${item.word || 'Lesson'}`,
      mainCharacter: item.mainCharacter || (item.num !== undefined ? String(item.num) : item.letter || `${i + 1}`),
      word: item.word || item.name || config.customTopic || 'Learning',
      urduWord: item.urduWord || '',
      urduTransliteration: item.urduTransliteration || '',
      imageEmoji: item.imageEmoji || '🌟',
      imageUrl: item.imageUrl,
      svgShape: item.svgShape || 'default',
      description: item.description || `Discover and practice ${item.word || 'this lesson'}.`,
      tracingText: item.tracingText || `${item.word || item.mainCharacter || 'Practice'} ${item.word || ''}`,
      activity: item.activity || `Explore and practice ${item.word || 'this item'}`,
      instructions: item.instructions || (isRtlLanguage ? 'پنسل سے لکیروں پر مشق کریں۔' : 'Trace the guide lines and complete the activity.'),
      countingObjects: item.countingObjects || (item.num ? Array(item.num).fill(item.imageEmoji || '🍎') : undefined),
      colorHex: item.colorHex,
      options: item.options,
      correctAnswer: item.correctAnswer,
      isRtl: isRtlLanguage,

      // Extended
      storyText: item.storyText,
      storyCharacters: item.storyCharacters,
      learningMessage: item.learningMessage,
      quizQuestions: item.quizQuestions,
      matchingPairs: item.matchingPairs,
      parentTips: item.parentTips
    };

    pages.push(page);
  }

  // 4. Parent / Teacher Guide Page
  if (config.includeGuide) {
    pages.push({
      id: `${bookId}-guide`,
      pageNumber: pageNumberCounter++,
      type: 'guide',
      title: isRtlLanguage ? 'والدین اور اساتذہ کے لیے رہنما ہدایت' : 'Parent & Teacher Learning Guide',
      instructions: 'Tips & Objectives for Maximum Educational Growth',
      parentTips: rawAiData?.parentTips || [
        'Guide your child to hold the pencil comfortably without straining.',
        'Read aloud together to encourage speech development and active listening.',
        'Praise effort and progress generously.',
        'Keep learning sessions short (10–15 minutes) for optimal focus.'
      ],
      isRtl: isRtlLanguage
    });
  }

  // 5. Completion Certificate
  if (config.pageCount >= 6) {
    pages.push({
      id: `${bookId}-certificate`,
      pageNumber: pageNumberCounter++,
      type: 'certificate',
      title: 'Star Achiever Certificate',
      instructions: config.childName ? `Awarded to ${config.childName}` : 'Awarded to Little Superstar',
      description: `For outstanding enthusiasm and effort in completing ${title}!`,
      isRtl: isRtlLanguage
    });
  }

  const lessonPlan: LessonPlan = createLessonPlan(config, rawAiData?.lessonPlan);
  const qualityScore: QualityScore = calculateQualityScore(pages, config);

  return {
    id: bookId,
    title,
    category: getCategoryDisplayName(config.category, config.customTopic),
    categoryKey: config.category,
    language: config.language,
    ageGroup: config.ageGroup,
    style: config.style,
    createdAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    pages,
    config,
    isAiGenerated,
    qualityScore,
    lessonPlan
  };
}

function getDefaultTitle(config: BookConfig): string {
  const childPrefix = config.childName ? `${config.childName}'s ` : 'My First ';

  if (config.category === 'custom' && config.customTopic) {
    return `${childPrefix}${config.customTopic} Learning Book`;
  }

  switch (config.category) {
    case 'alphabet':
      return `${childPrefix}Alphabet Learning Book`;
    case 'numbers1-10':
      return `${childPrefix}1 to 10 Numbers Workbook`;
    case 'numbers1-20':
      return `${childPrefix}1 to 20 Numbers Activity Book`;
    case 'urdu-alphabet':
      return 'اردو قاعدہ پہلا سبق (Urdu Qaida)';
    case 'animals':
      return `${childPrefix}Animal Friends Explorer`;
    case 'fruits':
      return `${childPrefix}Delicious Fruits Book`;
    case 'vegetables':
      return `${childPrefix}Healthy Vegetables Book`;
    case 'colors':
      return `${childPrefix}Colorful World Book`;
    case 'shapes':
      return `${childPrefix}Shapes & Patterns Book`;
    default:
      return `${childPrefix}Educational Learning Book`;
  }
}

function getCategoryDisplayName(category: string, customTopic?: string): string {
  if (category === 'custom' && customTopic) {
    return `Custom: ${customTopic}`;
  }
  const map: Record<string, string> = {
    alphabet: 'English Alphabet',
    'numbers1-10': 'Numbers 1–10',
    'numbers1-20': 'Numbers 1–20',
    'urdu-alphabet': 'Urdu Alphabet',
    animals: 'Animals',
    fruits: 'Fruits',
    vegetables: 'Vegetables',
    colors: 'Colors',
    shapes: 'Shapes',
    story: 'Mini Stories',
    phonics: 'Phonics',
    vocabulary: 'Vocabulary',
    worksheet: 'Worksheets'
  };
  return map[category] || 'General Learning';
}

function getPageTypeForIndex(index: number, style: string): PageType {
  switch (style) {
    case 'tracing':
      return 'tracing';
    case 'coloring':
      return 'coloring';
    case 'activity':
      return index % 3 === 0 ? 'activity' : index % 3 === 1 ? 'matching' : 'quiz';
    case 'flashcard':
      return 'learning';
    case 'mixed': {
      const cycle: PageType[] = ['learning', 'tracing', 'coloring', 'activity', 'matching', 'quiz'];
      return cycle[index % cycle.length];
    }
    case 'learning':
    default:
      return 'learning';
  }
}
