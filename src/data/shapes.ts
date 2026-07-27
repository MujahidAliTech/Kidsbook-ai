export interface ShapeItem {
  name: string;
  urduName: string;
  transliteration: string;
  sides: string;
  emoji: string;
  realWorldExample: string;
  fact: string;
  tracing: string;
  activityPrompt: string;
  svgType: 'circle' | 'square' | 'triangle' | 'rectangle' | 'star' | 'heart' | 'oval' | 'diamond';
}

export const SHAPES_DATA: ShapeItem[] = [
  {
    name: 'Circle',
    urduName: 'دائرہ',
    transliteration: 'Dairah',
    sides: '0 straight sides (1 curved line)',
    emoji: '⭕',
    realWorldExample: 'Clock, Coin, & Full Moon',
    fact: 'A circle is perfectly round with no sharp corners.',
    tracing: 'CIRCLE CIRCLE',
    activityPrompt: 'Trace the circle and color things that are round.',
    svgType: 'circle'
  },
  {
    name: 'Square',
    urduName: 'مربع',
    transliteration: 'Murabba',
    sides: '4 equal sides & 4 corners',
    emoji: '⬛',
    realWorldExample: 'Building Block, Window, & Dice',
    fact: 'A square has 4 sides that are all exactly the same length.',
    tracing: 'SQUARE SQUARE',
    activityPrompt: 'Trace the square and count its 4 equal sides.',
    svgType: 'square'
  },
  {
    name: 'Triangle',
    urduName: 'تثلیث / تکونا',
    transliteration: 'Takoona',
    sides: '3 straight sides & 3 corners',
    emoji: '🔺',
    realWorldExample: 'Pizza Slice, Sailboat, & Roof',
    fact: 'A triangle has 3 straight sides and 3 pointy corners.',
    tracing: 'TRIANGLE TRIANGLE',
    activityPrompt: 'Trace the triangle and point to its 3 corners.',
    svgType: 'triangle'
  },
  {
    name: 'Rectangle',
    urduName: 'مستطیل',
    transliteration: 'Mustateel',
    sides: '4 sides (2 long, 2 short)',
    emoji: '📱',
    realWorldExample: 'Door, Book, & Envelope',
    fact: 'A rectangle has 4 sides with opposite sides matching in length.',
    tracing: 'RECTANGLE RECTANGLE',
    activityPrompt: 'Trace the rectangle and identify the 2 long sides.',
    svgType: 'rectangle'
  },
  {
    name: 'Star',
    urduName: 'ستارہ',
    transliteration: 'Sitara',
    sides: '5 points',
    emoji: '⭐',
    realWorldExample: 'Starfish & Night Sky Star',
    fact: 'A star has 5 bright points reaching outward.',
    tracing: 'STAR STAR STAR',
    activityPrompt: 'Trace the star and count all 5 points.',
    svgType: 'star'
  },
  {
    name: 'Heart',
    urduName: 'دل',
    transliteration: 'Dil',
    sides: '2 curved arches meeting at a bottom point',
    emoji: '❤️',
    realWorldExample: 'Greeting Card & Love Badge',
    fact: 'A heart shape symbolises love, warmth, and friendship.',
    tracing: 'HEART HEART HEART',
    activityPrompt: 'Trace the heart and color it with your favorite color.',
    svgType: 'heart'
  },
  {
    name: 'Oval',
    urduName: 'بیضوی',
    transliteration: 'Baizwi',
    sides: '0 straight sides (stretched circle)',
    emoji: '🥚',
    realWorldExample: 'Egg, Mirror, & Watermelon',
    fact: 'An oval looks like a stretched circle shaped like a bird egg.',
    tracing: 'OVAL OVAL OVAL',
    activityPrompt: 'Trace the oval and color the egg shape.',
    svgType: 'oval'
  },
  {
    name: 'Diamond',
    urduName: 'ہیرا / لڈو کی شکل',
    transliteration: 'Heera',
    sides: '4 slanting equal sides',
    emoji: '🔷',
    realWorldExample: 'Kite & Road Sign',
    fact: 'A diamond shape looks like a tilted square flying like a kite.',
    tracing: 'DIAMOND DIAMOND',
    activityPrompt: 'Trace the diamond and draw ribbons on its tail.',
    svgType: 'diamond'
  }
];
