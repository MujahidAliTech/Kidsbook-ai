import { ALPHABET_DATA } from '../data/alphabet';
import { NUMBERS_DATA } from '../data/numbers';
import { URDU_ALPHABET_DATA } from '../data/urduAlphabet';
import { ANIMALS_DATA } from '../data/animals';
import { FRUITS_DATA } from '../data/fruits';
import { VEGETABLES_DATA } from '../data/vegetables';
import { COLORS_DATA } from '../data/colors';
import { SHAPES_DATA } from '../data/shapes';
import { generateCustomBookContent } from './aiService';
import { Book, BookConfig, BookPage, PageType } from '../types';

export async function generateBook(config: BookConfig): Promise<Book> {
  const bookId = `book-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const isRtlLanguage = config.language === 'urdu';
  const isBilingual = config.language === 'bilingual';

  // Determine Title
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

  // 2. Content Pages
  let contentItems: any[] = [];

  if (config.category === 'custom' && config.customTopic) {
    const aiResult = await generateCustomBookContent(
      config.customTopic,
      config.ageGroup,
      config.language,
      config.style,
      config.pageCount
    );
    contentItems = aiResult.pages;
  } else {
    contentItems = getCategoryItems(config.category, config.pageCount);
  }

  const targetCount = Math.min(config.pageCount, contentItems.length);

  for (let i = 0; i < targetCount; i++) {
    const raw = contentItems[i];
    const pageType = getPageTypeForIndex(i, config.style);
    const page = buildPageFromItem(raw, i, pageType, config, pageNumberCounter++, isRtlLanguage, isBilingual);
    pages.push(page);
  }

  // 3. Parent / Teacher Guide Page
  if (config.includeGuide) {
    pages.push({
      id: `${bookId}-guide`,
      pageNumber: pageNumberCounter++,
      type: 'guide',
      title: isRtlLanguage ? 'والدین اور اساتذہ کے لیے رہنما ہدایت' : 'Parent & Teacher Learning Guide',
      instructions: 'Tips & Objectives for Maximum Educational Growth',
      isRtl: isRtlLanguage
    });
  }

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
    config
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
    shapes: 'Shapes'
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
      return 'activity';
    case 'flashcard':
      return 'learning';
    case 'mixed': {
      const cycle: PageType[] = ['learning', 'tracing', 'coloring', 'activity'];
      return cycle[index % cycle.length];
    }
    case 'learning':
    default:
      return 'learning';
  }
}

function buildPageFromItem(
  item: any,
  index: number,
  pageType: PageType,
  config: BookConfig,
  pageNumber: number,
  isRtl: boolean,
  isBilingual: boolean
): BookPage {
  // Extract values with fallbacks across data schema types
  const mainCharacter = item.letter || (item.num !== undefined ? String(item.num) : item.name || item.mainCharacter || '');
  const word = item.word || item.name || item.wordEnglish || '';
  const urduWord = item.urduWord || item.urduName || item.wordUrdu || '';
  const urduTransliteration = item.urduTransliteration || item.transliteration || '';
  const imageEmoji = item.emoji || item.imageEmoji || '🌟';
  const svgShape = item.svgShape || item.svgType || 'default';
  const description = item.sentence || item.sentenceUrdu || item.fact || item.description || '';
  const tracingText = item.tracing || item.tracingText || `${word} ${word}`;
  const activity = item.activityPrompt || item.activityUrdu || item.activity || `Explore and practice ${word}`;
  const countingObjects = item.objects || (item.num ? Array(item.num).fill(imageEmoji) : undefined);
  const colorHex = item.hex;

  // Age group tracing & instructions formatting
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
  } else if (config.category === 'shapes') {
    title = `Shape: ${word}`;
  } else if (config.category === 'colors') {
    title = `Color: ${word}`;
  }

  return {
    id: `pg-${pageNumber}-${Math.random().toString(36).substring(2, 6)}`,
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
    instructions: isRtl ? 'تصویر پر رنگ بھریں اور نیچے پنسل سے لکیروں پر مشق کریں۔' : 'Trace the dotted guide lines and complete the activity.',
    countingObjects,
    colorHex,
    isRtl
  };
}
