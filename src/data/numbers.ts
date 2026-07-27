export interface NumberItem {
  num: number;
  word: string;
  urduWord: string;
  urduTransliteration: string;
  objects: string[];
  emoji: string;
  sentence: string;
  tracing: string;
  activityPrompt: string;
}

export const NUMBERS_DATA: NumberItem[] = [
  {
    num: 1,
    word: 'One',
    urduWord: 'ایک',
    urduTransliteration: 'Ek',
    objects: ['🍎'],
    emoji: '🍎',
    sentence: 'Number 1. One solitary shiny apple.',
    tracing: '1 1 1 1 1',
    activityPrompt: 'Trace the number 1 and circle the single apple.'
  },
  {
    num: 2,
    word: 'Two',
    urduWord: 'دو',
    urduTransliteration: 'Do',
    objects: ['⚽', '⚽'],
    emoji: '⚽',
    sentence: 'Number 2. Two bouncing soccer balls.',
    tracing: '2 2 2 2 2',
    activityPrompt: 'Trace number 2 and count 1, 2 balls.'
  },
  {
    num: 3,
    word: 'Three',
    urduWord: 'تین',
    urduTransliteration: 'Teen',
    objects: ['🐱', '🐱', '🐱'],
    emoji: '🐱',
    sentence: 'Number 3. Three cute purring kittens.',
    tracing: '3 3 3 3 3',
    activityPrompt: 'Trace number 3 and color the 3 kittens.'
  },
  {
    num: 4,
    word: 'Four',
    urduWord: 'چار',
    urduTransliteration: 'Chaar',
    objects: ['⭐', '⭐', '⭐', '⭐'],
    emoji: '⭐',
    sentence: 'Number 4. Four bright sparkling stars.',
    tracing: '4 4 4 4 4',
    activityPrompt: 'Trace number 4 and connect the 4 stars.'
  },
  {
    num: 5,
    word: 'Five',
    urduWord: 'پانچ',
    urduTransliteration: 'Paanch',
    objects: ['🖐️', '🖐️', '🖐️', '🖐️', '🖐️'],
    emoji: '🖐️',
    sentence: 'Number 5. Five high-five fingers on one hand.',
    tracing: '5 5 5 5 5',
    activityPrompt: 'Trace number 5 and count the 5 fingers.'
  },
  {
    num: 6,
    word: 'Six',
    urduWord: 'چھ',
    urduTransliteration: 'Chhay',
    objects: ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈'],
    emoji: '🎈',
    sentence: 'Number 6. Six colorful floating balloons.',
    tracing: '6 6 6 6 6',
    activityPrompt: 'Trace number 6 and color each balloon.'
  },
  {
    num: 7,
    word: 'Seven',
    urduWord: 'سات',
    urduTransliteration: 'Saat',
    objects: ['🌈', '🌈', '🌈', '🌈', '🌈', '🌈', '🌈'],
    emoji: '🌈',
    sentence: 'Number 7. Seven vibrant rainbow colors.',
    tracing: '7 7 7 7 7',
    activityPrompt: 'Trace number 7 and count all 7 rainbows.'
  },
  {
    num: 8,
    word: 'Eight',
    urduWord: 'آٹھ',
    urduTransliteration: 'Aath',
    objects: ['🐙', '🐙', '🐙', '🐙', '🐙', '🐙', '🐙', '🐙'],
    emoji: '🐙',
    sentence: 'Number 8. An octopus has 8 wiggling tentacles.',
    tracing: '8 8 8 8 8',
    activityPrompt: 'Trace number 8 and count the octopuses.'
  },
  {
    num: 9,
    word: 'Nine',
    urduWord: 'نو',
    urduTransliteration: 'Nau',
    objects: ['🍓', '🍓', '🍓', '🍓', '🍓', '🍓', '🍓', '🍓', '🍓'],
    emoji: '🍓',
    sentence: 'Number 9. Nine sweet red strawberries.',
    tracing: '9 9 9 9 9',
    activityPrompt: 'Trace number 9 and circle 9 strawberries.'
  },
  {
    num: 10,
    word: 'Ten',
    urduWord: 'دس',
    urduTransliteration: 'Dus',
    objects: ['🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟'],
    emoji: '🌟',
    sentence: 'Number 10. Ten shining stars in the night sky.',
    tracing: '10 10 10 10',
    activityPrompt: 'Trace number 10 and practice counting to 10.'
  },
  {
    num: 11,
    word: 'Eleven',
    urduWord: 'گیارہ',
    urduTransliteration: 'Gyarah',
    objects: Array(11).fill('🚀'),
    emoji: '🚀',
    sentence: 'Number 11. Eleven rockets blasting off to space.',
    tracing: '11 11 11 11',
    activityPrompt: 'Trace number 11 and count the 11 rockets.'
  },
  {
    num: 12,
    word: 'Twelve',
    urduWord: 'بارہ',
    urduTransliteration: 'Baarah',
    objects: Array(12).fill('🌸'),
    emoji: '🌸',
    sentence: 'Number 12. A dozen 12 spring blossoms.',
    tracing: '12 12 12 12',
    activityPrompt: 'Trace number 12 and count 12 flowers.'
  },
  {
    num: 13,
    word: 'Thirteen',
    urduWord: 'تیرہ',
    urduTransliteration: 'Teerah',
    objects: Array(13).fill('🚗'),
    emoji: '🚗',
    sentence: 'Number 13. Thirteen toy cars on the road.',
    tracing: '13 13 13 13',
    activityPrompt: 'Trace number 13 and count all 13 cars.'
  },
  {
    num: 14,
    word: 'Fourteen',
    urduWord: 'چودہ',
    urduTransliteration: 'Choudah',
    objects: Array(14).fill('🐤'),
    emoji: '🐤',
    sentence: 'Number 14. Fourteen little yellow chicks.',
    tracing: '14 14 14 14',
    activityPrompt: 'Trace number 14 and count the chicks.'
  },
  {
    num: 15,
    word: 'Fifteen',
    urduWord: 'پندرہ',
    urduTransliteration: 'Pandrah',
    objects: Array(15).fill('🍦'),
    emoji: '🍦',
    sentence: 'Number 15. Fifteen sweet ice cream cones.',
    tracing: '15 15 15 15',
    activityPrompt: 'Trace number 15 and write 15.'
  },
  {
    num: 16,
    word: 'Sixteen',
    urduWord: 'سولہ',
    urduTransliteration: 'Solah',
    objects: Array(16).fill('🦋'),
    emoji: '🦋',
    sentence: 'Number 16. Sixteen fluttering butterflies.',
    tracing: '16 16 16 16',
    activityPrompt: 'Trace number 16 and count 16 butterflies.'
  },
  {
    num: 17,
    word: 'Seventeen',
    urduWord: 'سترہ',
    urduTransliteration: 'Satrah',
    objects: Array(17).fill('🍪'),
    emoji: '🍪',
    sentence: 'Number 17. Seventeen chocolate chip cookies.',
    tracing: '17 17 17 17',
    activityPrompt: 'Trace number 17 and count the cookies.'
  },
  {
    num: 18,
    word: 'Eighteen',
    urduWord: 'اٹھارہ',
    urduTransliteration: 'Atharah',
    objects: Array(18).fill('✏️'),
    emoji: '✏️',
    sentence: 'Number 18. Eighteen sharp pencils.',
    tracing: '18 18 18 18',
    activityPrompt: 'Trace number 18 and practice writing 18.'
  },
  {
    num: 19,
    word: 'Nineteen',
    urduWord: 'انیس',
    urduTransliteration: 'Unnees',
    objects: Array(19).fill('🎨'),
    emoji: '🎨',
    sentence: 'Number 19. Nineteen colorful paint palettes.',
    tracing: '19 19 19 19',
    activityPrompt: 'Trace number 19 and count to 19.'
  },
  {
    num: 20,
    word: 'Twenty',
    urduWord: 'بیس',
    urduTransliteration: 'Bees',
    objects: Array(20).fill('🎉'),
    emoji: '🎉',
    sentence: 'Number 20. Twenty party poppers for accomplishment!',
    tracing: '20 20 20 20',
    activityPrompt: 'Trace number 20 and celebrate learning numbers!'
  }
];
