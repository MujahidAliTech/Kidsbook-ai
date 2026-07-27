import { BookConfig } from '../types';

export interface BookTemplate {
  id: string;
  title: string;
  subtitle: string;
  categoryName: string;
  ageBadge: string;
  badgeColor: string;
  coverEmoji: string;
  config: BookConfig;
}

export const FEATURED_TEMPLATES: BookTemplate[] = [
  {
    id: 'tpl-alphabet-starter',
    title: 'My First Alphabet Adventure',
    subtitle: 'Learn A to Z with cheerful pictures and easy tracing lines.',
    categoryName: 'English Alphabet',
    ageBadge: '3–4 Years',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    coverEmoji: '🔤',
    config: {
      category: 'alphabet',
      language: 'english',
      ageGroup: '3-4',
      style: 'learning',
      pageCount: 10,
      includeCover: true,
      includeGuide: true,
      customTitle: 'My First Alphabet Adventure',
      childName: ''
    }
  },
  {
    id: 'tpl-numbers-10',
    title: 'Counting 1 to 10 Fun Workbook',
    subtitle: 'Count colorful objects and practice writing early numbers.',
    categoryName: 'Numbers 1–10',
    ageBadge: '2–3 Years',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    coverEmoji: '🔢',
    config: {
      category: 'numbers1-10',
      language: 'english',
      ageGroup: '2-3',
      style: 'tracing',
      pageCount: 10,
      includeCover: true,
      includeGuide: true,
      customTitle: 'Counting 1 to 10 Fun Workbook',
      childName: ''
    }
  },
  {
    id: 'tpl-urdu-qaida',
    title: 'اردو قاعدہ پہلا سبق (Urdu Qaida)',
    subtitle: 'ا سے ی تک حروف تہجی سیکھیں اور لکیروں پر پنسل چلائیں۔',
    categoryName: 'Urdu Alphabet',
    ageBadge: '3–4 Years',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    coverEmoji: '🇵🇰',
    config: {
      category: 'urdu-alphabet',
      language: 'urdu',
      ageGroup: '3-4',
      style: 'learning',
      pageCount: 10,
      includeCover: true,
      includeGuide: true,
      customTitle: 'اردو قاعدہ پہلا سبق',
      childName: ''
    }
  },
  {
    id: 'tpl-animal-safari',
    title: 'Wild Animal Safari Friends',
    subtitle: 'Discover amazing animal facts, sounds, and fun coloring activities.',
    categoryName: 'Animals',
    ageBadge: '4–5 Years',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    coverEmoji: '🦁',
    config: {
      category: 'animals',
      language: 'english',
      ageGroup: '4-5',
      style: 'coloring',
      pageCount: 10,
      includeCover: true,
      includeGuide: false,
      customTitle: 'Wild Animal Safari Friends',
      childName: ''
    }
  },
  {
    id: 'tpl-colors-shapes',
    title: 'Colors & Shapes Explorer',
    subtitle: 'Identify vibrant shapes, trace lines, and match colors.',
    categoryName: 'Shapes',
    ageBadge: '2–3 Years',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    coverEmoji: '🎨',
    config: {
      category: 'shapes',
      language: 'english',
      ageGroup: '2-3',
      style: 'mixed',
      pageCount: 8,
      includeCover: true,
      includeGuide: true,
      customTitle: 'Colors & Shapes Explorer',
      childName: ''
    }
  },
  {
    id: 'tpl-bilingual-fruits',
    title: 'Bilingual Fruits & Vegetables (English + Urdu)',
    subtitle: 'Learn fruit and veg names in both English and Urdu with transliteration.',
    categoryName: 'Fruits',
    ageBadge: '5–6 Years',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    coverEmoji: '🍎',
    config: {
      category: 'fruits',
      language: 'bilingual',
      ageGroup: '5-6',
      style: 'learning',
      pageCount: 10,
      includeCover: true,
      includeGuide: true,
      customTitle: 'Bilingual Fruits & Vegetables',
      childName: ''
    }
  }
];
