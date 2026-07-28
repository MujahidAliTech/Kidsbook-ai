import { ALPHABET_DATA } from '../../data/alphabet';
import { NUMBERS_DATA } from '../../data/numbers';
import { URDU_ALPHABET_DATA } from '../../data/urduAlphabet';
import { ANIMALS_DATA } from '../../data/animals';
import { FRUITS_DATA } from '../../data/fruits';
import { VEGETABLES_DATA } from '../../data/vegetables';
import { COLORS_DATA } from '../../data/colors';
import { SHAPES_DATA } from '../../data/shapes';
import { getGenericCustomPages } from '../../data/customFallback';
import { Book, BookConfig, BookPage, PageType, LessonPlan, QualityScore } from '../../types';

export function getLocalFallbackBook(config: BookConfig): Book {
  const bookId = `fallback-book-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const isRtlLanguage = config.language === 'urdu' || config.category === 'urdu-alphabet';
  const isBilingual = config.language === 'bilingual';

  let title = config.customTitle?.trim();
  if (!title) {
    title = getDefaultTitle(config);
  }

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

  // 2. Introduction / Outline Page
  if (config.pageCount >= 5) {
    pages.push({
      id: `${bookId}-intro`,
      pageNumber: pageNumberCounter++,
      type: 'introduction',
      title: isRtlLanguage ? 'تعارف اور فہرست' : 'Welcome & Outline',
      description: isRtlLanguage
        ? 'اس کتاب میں بچوں کے لیے دلچسپ اور تعلیمی اسباق شامل ہیں۔'
        : `Welcome to ${title}! Designed for ages ${config.ageGroup} with interactive learning, tracing, and practice activities.`,
      sectionOutline: [
        'Core Concepts & Vocabulary',
        'Tracing & Writing Practice',
        'Fun Interactive Activities',
        'Review & Parent Progress Checklist'
      ],
      isRtl: isRtlLanguage
    });
  }

  // 3. Content Items
  let rawItems: any[] = [];
  if (config.category === 'custom' && config.customTopic) {
    rawItems = getGenericCustomPages(config.customTopic, config.pageCount);
  } else {
    rawItems = getCategoryItems(config.category, config.pageCount);
  }

  const targetCount = Math.min(config.pageCount, rawItems.length > 0 ? rawItems.length : config.pageCount);

  for (let i = 0; i < targetCount; i++) {
    const raw = rawItems[i] || {
      title: `Page ${i + 1}`,
      mainCharacter: `${i + 1}`,
      word: config.customTopic || 'Learning',
      description: 'Explore and practice core foundational concepts.',
      imageEmoji: '⭐'
    };
    const pageType = getPageTypeForIndex(i, config.style);
    const page = buildFallbackPageFromItem(raw, i, pageType, config, pageNumberCounter++, isRtlLanguage, isBilingual);
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
      parentTips: [
        'Encourage your child to pronounce words out loud while tracing.',
        'Use fingers or colorful crayons to follow the dotted lines.',
        'Praise effort rather than perfection to build confidence.',
        'Review 2-3 pages daily for steady skill retention.'
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
      description: `For outstanding effort and dedication in completing the ${title}!`,
      isRtl: isRtlLanguage
    });
  }

  const lessonPlan: LessonPlan = {
    learningObjectives: ['Build core vocabulary & concept recognition', 'Develop motor skills with tracing practice', 'Boost confidence and interactive engagement'],
    targetVocabulary: rawItems.slice(0, 5).map((it) => it.word || it.letter || it.name || 'Concept'),
    practiceGoals: ['Tracing letter/number forms', 'Identifying matching objects', 'Coloring within outlines'],
    reviewGoals: ['Daily 5-minute review session', 'Parent-guided questions'],
    difficultyLevel: config.difficulty || 'medium',
    expectedOutcome: `Child gains foundational mastery in ${config.customTopic || config.category} concepts.`
  };

  const qualityScore: QualityScore = {
    educationalQuality: 92,
    readability: 95,
    ageSuitability: 94,
    languageQuality: 90,
    activityQuality: 91,
    overallScore: 92,
    passed: true
  };

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
    isAiGenerated: false,
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
      return config.language === 'urdu'
        ? 'میرا پہلا انگلش حروف تہجی'
        : `${childPrefix}Alphabet Learning Book`;
    case 'numbers1-10':
      return `${childPrefix}1 to 10 Counting & Tracing Book`;
    case 'numbers1-20':
      return `${childPrefix}1 to 20 Numbers Activity Book`;
    case 'urdu-alphabet':
      return 'اردو قاعدہ پہلا سبق (Urdu Qaida)';
    case 'animals':
      return `${childPrefix}Animal Friends Learning Book`;
    case 'fruits':
      return `${childPrefix}Delicious Fruits Learning Book`;
    case 'vegetables':
      return `${childPrefix}Healthy Vegetables Workbook`;
    case 'colors':
      return `${childPrefix}Colorful World Learning Book`;
    case 'shapes':
      return `${childPrefix}Shapes & Patterns Explorer`;
    case 'story':
      return `${childPrefix}Bedtime Mini Storybook`;
    case 'phonics':
      return `${childPrefix}Phonics & Sound Builder`;
    case 'vocabulary':
      return `${childPrefix}Word Builder & Picture Dictionary`;
    case 'worksheet':
      return `${childPrefix}Fun Activity Worksheet Book`;
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

function getCategoryItems(category: string, requestedCount: number): any[] {
  let list: any[] = [];
  switch (category) {
    case 'alphabet':
      list = [...ALPHABET_DATA];
      break;
    case 'numbers1-10':
      list = NUMBERS_DATA.slice(0, 10);
      break;
    case 'numbers1-20':
      list = [...NUMBERS_DATA];
      break;
    case 'urdu-alphabet':
      list = [...URDU_ALPHABET_DATA];
      break;
    case 'animals':
      list = [...ANIMALS_DATA];
      break;
    case 'fruits':
      list = [...FRUITS_DATA];
      break;
    case 'vegetables':
      list = [...VEGETABLES_DATA];
      break;
    case 'colors':
      list = [...COLORS_DATA];
      break;
    case 'shapes':
      list = [...SHAPES_DATA];
      break;
    default:
      list = [...ALPHABET_DATA];
  }

  if (requestedCount >= list.length) {
    return list;
  }
  return list.slice(0, requestedCount);
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

function buildFallbackPageFromItem(
  item: any,
  index: number,
  pageType: PageType,
  config: BookConfig,
  pageNumber: number,
  isRtl: boolean,
  isBilingual: boolean
): BookPage {
  const mainCharacter = item.letter || (item.num !== undefined ? String(item.num) : item.name || item.mainCharacter || `${index + 1}`);
  const word = item.word || item.name || item.wordEnglish || 'Learning';
  const urduWord = item.urduWord || item.urduName || item.wordUrdu || '';
  const urduTransliteration = item.urduTransliteration || item.transliteration || '';
  const imageEmoji = item.emoji || item.imageEmoji || '🌟';
  const svgShape = item.svgShape || item.svgType || 'default';
  const description = item.sentence || item.sentenceUrdu || item.fact || item.description || `Discover and learn about ${word}.`;
  const tracingText = item.tracing || item.tracingText || `${word} ${word}`;
  const activity = item.activityPrompt || item.activityUrdu || item.activity || `Explore and practice ${word}`;
  const countingObjects = item.objects || (item.num ? Array(item.num).fill(imageEmoji) : undefined);
  const colorHex = item.hex;

  let finalTracing = tracingText;
  if (config.ageGroup === '2-3') {
    finalTracing = `${mainCharacter}  ${mainCharacter}  ${mainCharacter}`;
  } else if (config.ageGroup === '5-6' || config.ageGroup === '6-7') {
    finalTracing = `${word} ${word} ${word}`;
  }

  let title = `${mainCharacter} is for ${word}`;
  if (config.category === 'numbers1-10' || config.category === 'numbers1-20') {
    title = `Number ${mainCharacter} - ${word}`;
  } else if (config.category === 'urdu-alphabet' || isRtl) {
    title = `${mainCharacter} - ${urduWord}`;
  }

  return {
    id: `fallback-pg-${pageNumber}-${Math.random().toString(36).substring(2, 6)}`,
    pageNumber,
    type: pageType,
    title,
    mainCharacter,
    word,
    urduWord,
    urduTransliteration,
    imageEmoji,
    svgShape,
    description,
    tracingText: finalTracing,
    activity,
    instructions: isRtl ? 'تصویر پر رنگ بھریں اور نیچے پنسل سے لکیروں پر مشق کریں۔' : 'Trace the dotted guide lines and complete the practice exercise.',
    countingObjects,
    colorHex,
    isRtl
  };
}
