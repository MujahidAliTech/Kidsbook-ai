export type Category =
  | 'alphabet'
  | 'numbers1-10'
  | 'numbers1-20'
  | 'urdu-alphabet'
  | 'animals'
  | 'fruits'
  | 'vegetables'
  | 'colors'
  | 'shapes'
  | 'custom';

export type Language = 'english' | 'urdu' | 'bilingual';

export type AgeGroup = '2-3' | '3-4' | '4-5' | '5-6' | '6-7';

export type BookStyle =
  | 'learning'
  | 'tracing'
  | 'coloring'
  | 'activity'
  | 'flashcard'
  | 'mixed';

export type PageType = 'cover' | 'learning' | 'tracing' | 'coloring' | 'activity' | 'guide';

export interface BookPage {
  id: string;
  pageNumber: number;
  type: PageType;
  title: string;
  mainCharacter?: string;
  word?: string;
  urduWord?: string;
  urduTransliteration?: string;
  imageEmoji?: string;
  imageUrl?: string; // High-resolution AI outline illustration URL or base64
  svgShape?: string; // Key for outline vector drawing for coloring
  description?: string;
  tracingText?: string;
  activity?: string;
  instructions?: string;
  countingObjects?: string[];
  colorHex?: string;
  options?: string[];
  correctAnswer?: string;
  isRtl?: boolean;
}

export interface BookConfig {
  category: Category;
  customTopic?: string;
  language: Language;
  ageGroup: AgeGroup;
  style: BookStyle;
  pageCount: number;
  includeCover: boolean;
  includeGuide: boolean;
  customTitle?: string;
  childName?: string;
}

export interface Book {
  id: string;
  title: string;
  category: string;
  categoryKey: Category;
  language: Language;
  ageGroup: AgeGroup;
  style: BookStyle;
  createdAt: string;
  pages: BookPage[];
  config: BookConfig;
}
