export interface AlphabetItem {
  letter: string;
  word: string;
  urduWord: string;
  urduTransliteration: string;
  emoji: string;
  sentence: string;
  tracing: string;
  activityPrompt: string;
  svgShape: string;
}

export const ALPHABET_DATA: AlphabetItem[] = [
  {
    letter: 'A',
    word: 'Apple',
    urduWord: 'سیب',
    urduTransliteration: 'Seb',
    emoji: '🍎',
    sentence: 'A is for Apple. Apples are sweet and crunchy.',
    tracing: 'A A A A A',
    activityPrompt: 'Trace the letter A and color the juicy apple.',
    svgShape: 'apple'
  },
  {
    letter: 'B',
    word: 'Ball',
    urduWord: 'گیند',
    urduTransliteration: 'Gaind',
    emoji: '⚽',
    sentence: 'B is for Ball. We can bounce and roll the ball.',
    tracing: 'B B B B B',
    activityPrompt: 'Trace the letter B and color the round ball.',
    svgShape: 'ball'
  },
  {
    letter: 'C',
    word: 'Cat',
    urduWord: 'بلی',
    urduTransliteration: 'Billi',
    emoji: '🐱',
    sentence: 'C is for Cat. The playful cat says Meow!',
    tracing: 'C C C C C',
    activityPrompt: 'Trace C and count how many whiskers the cat has.',
    svgShape: 'cat'
  },
  {
    letter: 'D',
    word: 'Dog',
    urduWord: 'کتا',
    urduTransliteration: 'Kutta',
    emoji: '🐶',
    sentence: 'D is for Dog. The friendly dog wags its tail.',
    tracing: 'D D D D D',
    activityPrompt: 'Trace D and say "Woof Woof" aloud!',
    svgShape: 'dog'
  },
  {
    letter: 'E',
    word: 'Elephant',
    urduWord: 'ہاتھی',
    urduTransliteration: 'Haathi',
    emoji: '🐘',
    sentence: 'E is for Elephant. Elephants have long trunks.',
    tracing: 'E E E E E',
    activityPrompt: 'Trace E and color the big gentle elephant.',
    svgShape: 'elephant'
  },
  {
    letter: 'F',
    word: 'Fish',
    urduWord: 'مچھلی',
    urduTransliteration: 'Machhli',
    emoji: '🐟',
    sentence: 'F is for Fish. Fish swim swiftly in water.',
    tracing: 'F F F F F',
    activityPrompt: 'Trace F and draw bubbles around the fish.',
    svgShape: 'fish'
  },
  {
    letter: 'G',
    word: 'Giraffe',
    urduWord: 'زرافہ',
    urduTransliteration: 'Zarafah',
    emoji: '🦒',
    sentence: 'G is for Giraffe. Giraffes have tall necks.',
    tracing: 'G G G G G',
    activityPrompt: 'Trace G and color the spots on the giraffe.',
    svgShape: 'giraffe'
  },
  {
    letter: 'H',
    word: 'Hat',
    urduWord: 'ٹوپی',
    urduTransliteration: 'Topi',
    emoji: '🎩',
    sentence: 'H is for Hat. We wear a hat on our head.',
    tracing: 'H H H H H',
    activityPrompt: 'Trace H and decorate the fancy hat.',
    svgShape: 'hat'
  },
  {
    letter: 'I',
    word: 'Ice Cream',
    urduWord: 'آئس کریم',
    urduTransliteration: 'Ice Cream',
    emoji: '🍦',
    sentence: 'I is for Ice Cream. Yummy ice cream is cold.',
    tracing: 'I I I I I',
    activityPrompt: 'Trace I and choose your favorite ice cream flavor.',
    svgShape: 'icecream'
  },
  {
    letter: 'J',
    word: 'Juice',
    urduWord: 'جوس',
    urduTransliteration: 'Juice',
    emoji: '🧃',
    sentence: 'J is for Juice. Fresh juice is good for health.',
    tracing: 'J J J J J',
    activityPrompt: 'Trace J and draw a straw in the juice box.',
    svgShape: 'juice'
  },
  {
    letter: 'K',
    word: 'Kite',
    urduWord: 'پتنگ',
    urduTransliteration: 'Patang',
    emoji: '🪁',
    sentence: 'K is for Kite. Kites fly high in the sky.',
    tracing: 'K K K K K',
    activityPrompt: 'Trace K and color the bright soaring kite.',
    svgShape: 'kite'
  },
  {
    letter: 'L',
    word: 'Lion',
    urduWord: 'شیر',
    urduTransliteration: 'Sher',
    emoji: '🦁',
    sentence: 'L is for Lion. The brave lion is king of the jungle.',
    tracing: 'L L L L L',
    activityPrompt: 'Trace L and draw a fluffy mane for the lion.',
    svgShape: 'lion'
  },
  {
    letter: 'M',
    word: 'Moon',
    urduWord: 'چاند',
    urduTransliteration: 'Chaand',
    emoji: '🌙',
    sentence: 'M is for Moon. The glowing moon shines at night.',
    tracing: 'M M M M M',
    activityPrompt: 'Trace M and count the stars around the moon.',
    svgShape: 'moon'
  },
  {
    letter: 'N',
    word: 'Nest',
    urduWord: 'گھونسلا',
    urduTransliteration: 'Ghoonsla',
    emoji: '🪺',
    sentence: 'N is for Nest. Birds lay eggs inside a cozy nest.',
    tracing: 'N N N N N',
    activityPrompt: 'Trace N and count the eggs inside the nest.',
    svgShape: 'nest'
  },
  {
    letter: 'O',
    word: 'Orange',
    urduWord: 'مالٹا',
    urduTransliteration: 'Malta',
    emoji: '🍊',
    sentence: 'O is for Orange. Oranges are citrus and sweet.',
    tracing: 'O O O O O',
    activityPrompt: 'Trace O and color the orange fruit.',
    svgShape: 'orange'
  },
  {
    letter: 'P',
    word: 'Pencil',
    urduWord: 'پنسل',
    urduTransliteration: 'Pencil',
    emoji: '✏️',
    sentence: 'P is for Pencil. We write and draw with a pencil.',
    tracing: 'P P P P P',
    activityPrompt: 'Trace P and use your pencil to complete the row.',
    svgShape: 'pencil'
  },
  {
    letter: 'Q',
    word: 'Queen',
    urduWord: 'ملکہ',
    urduTransliteration: 'Malika',
    emoji: '👑',
    sentence: 'Q is for Queen. The queen wears a shiny crown.',
    tracing: 'Q Q Q Q Q',
    activityPrompt: 'Trace Q and color the shiny royal crown.',
    svgShape: 'crown'
  },
  {
    letter: 'R',
    word: 'Rabbit',
    urduWord: 'خرگوش',
    urduTransliteration: 'Khargoosh',
    emoji: '🐰',
    sentence: 'R is for Rabbit. Rabbits love to hop and eat carrots.',
    tracing: 'R R R R R',
    activityPrompt: 'Trace R and help the rabbit hop to the carrot.',
    svgShape: 'rabbit'
  },
  {
    letter: 'S',
    word: 'Sun',
    urduWord: 'سورج',
    urduTransliteration: 'Suraj',
    emoji: '☀️',
    sentence: 'S is for Sun. The bright sun gives us warmth.',
    tracing: 'S S S S S',
    activityPrompt: 'Trace S and color the golden rays of the sun.',
    svgShape: 'sun'
  },
  {
    letter: 'T',
    word: 'Tree',
    urduWord: 'درخت',
    urduTransliteration: 'Darakht',
    emoji: '🌳',
    sentence: 'T is for Tree. Trees give us shade and fresh air.',
    tracing: 'T T T T T',
    activityPrompt: 'Trace T and draw green leaves on the tree.',
    svgShape: 'tree'
  },
  {
    letter: 'U',
    word: 'Umbrella',
    urduWord: 'چھتری',
    urduTransliteration: 'Chhatri',
    emoji: '☂️',
    sentence: 'U is for Umbrella. Umbrellas keep us dry in rain.',
    tracing: 'U U U U U',
    activityPrompt: 'Trace U and design rain drops under the umbrella.',
    svgShape: 'umbrella'
  },
  {
    letter: 'V',
    word: 'Van',
    urduWord: 'وین',
    urduTransliteration: 'Van',
    emoji: '🚐',
    sentence: 'V is for Van. The van carries us safely to school.',
    tracing: 'V V V V V',
    activityPrompt: 'Trace V and color the yellow school van.',
    svgShape: 'van'
  },
  {
    letter: 'W',
    word: 'Whale',
    urduWord: 'وھیل',
    urduTransliteration: 'Whale',
    emoji: '🐋',
    sentence: 'W is for Whale. Whales are majestic sea mammals.',
    tracing: 'W W W W W',
    activityPrompt: 'Trace W and draw ocean waves around the whale.',
    svgShape: 'whale'
  },
  {
    letter: 'X',
    word: 'Xylophone',
    urduWord: 'زائلوفون',
    urduTransliteration: 'Xylophone',
    emoji: '🎵',
    sentence: 'X is for Xylophone. Plays cheerful musical notes.',
    tracing: 'X X X X X',
    activityPrompt: 'Trace X and color each wooden bar a different color.',
    svgShape: 'xylophone'
  },
  {
    letter: 'Y',
    word: 'Yo-yo',
    urduWord: 'یو یو',
    urduTransliteration: 'Yo-Yo',
    emoji: '🪀',
    sentence: 'Y is for Yo-yo. A yo-yo spins up and down on a string.',
    tracing: 'Y Y Y Y Y',
    activityPrompt: 'Trace Y and trace the loopy string of the yo-yo.',
    svgShape: 'yoyo'
  },
  {
    letter: 'Z',
    word: 'Zebra',
    urduWord: 'زیبرا',
    urduTransliteration: 'Zebra',
    emoji: '🦓',
    sentence: 'Z is for Zebra. Zebras have black and white stripes.',
    tracing: 'Z Z Z Z Z',
    activityPrompt: 'Trace Z and color the zebra stripes.',
    svgShape: 'zebra'
  }
];
