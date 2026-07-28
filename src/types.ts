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
  | 'story'
  | 'phonics'
  | 'vocabulary'
  | 'worksheet'
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

export type PageType =
  | 'cover'
  | 'introduction'
  | 'learning'
  | 'vocabulary'
  | 'tracing'
  | 'writing'
  | 'coloring'
  | 'counting'
  | 'matching'
  | 'quiz'
  | 'puzzle'
  | 'story'
  | 'review'
  | 'certificate'
  | 'guide'
  | 'activity';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface LessonPlan {
  learningObjectives: string[];
  targetVocabulary: string[];
  practiceGoals: string[];
  reviewGoals: string[];
  difficultyLevel: string;
  expectedOutcome: string;
}

export interface QualityScore {
  educationalQuality: number;
  readability: number;
  ageSuitability: number;
  languageQuality: number;
  activityQuality: number;
  overallScore: number;
  passed: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface MatchingPair {
  left: string;
  right: string;
}

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
  
  // Extended AI Content fields
  storyText?: string;
  storyCharacters?: string[];
  learningMessage?: string;
  quizQuestions?: QuizQuestion[];
  matchingPairs?: MatchingPair[];
  parentTips?: string[];
  sectionOutline?: string[];
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
  difficulty?: Difficulty;
  learningGoal?: string;
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
  
  // AI Metadata
  isFavorite?: boolean;
  isAiGenerated?: boolean;
  qualityScore?: QualityScore;
  lessonPlan?: LessonPlan;
}

