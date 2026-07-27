export interface CustomFallbackPage {
  title: string;
  mainCharacter: string;
  word: string;
  urduWord: string;
  urduTransliteration: string;
  imageEmoji: string;
  description: string;
  tracingText: string;
  activity: string;
  instructions: string;
}

export const CUSTOM_FALLBACK_TOPICS: Record<string, CustomFallbackPage[]> = {
  vehicles: [
    {
      title: 'C is for Car',
      mainCharacter: 'Car',
      word: 'Car',
      urduWord: 'گاڑی',
      urduTransliteration: 'Gaari',
      imageEmoji: '🚗',
      description: 'Cars zoom on roads on 4 rubber wheels.',
      tracingText: 'CAR CAR CAR CAR',
      activity: 'Trace the word CAR and color the car red.',
      instructions: 'Trace the vehicle name and say beep beep!'
    },
    {
      title: 'B is for Bus',
      mainCharacter: 'Bus',
      word: 'Bus',
      urduWord: 'بس',
      urduTransliteration: 'Bus',
      imageEmoji: '🚌',
      description: 'The big yellow bus takes children safely to school.',
      tracingText: 'BUS BUS BUS BUS',
      activity: 'Trace BUS and count the passengers in the windows.',
      instructions: 'Trace the letters and count wheels.'
    },
    {
      title: 'T is for Train',
      mainCharacter: 'Train',
      word: 'Train',
      urduWord: 'ریل گاڑی',
      urduTransliteration: 'Rail Gaari',
      imageEmoji: '🚂',
      description: 'Trains chug along long steel tracks saying Choo Choo!',
      tracingText: 'TRAIN TRAIN TRAIN',
      activity: 'Trace TRAIN and connect the train cars in order.',
      instructions: 'Trace the word and say Choo Choo!'
    },
    {
      title: 'B is for Bicycle',
      mainCharacter: 'Bicycle',
      word: 'Bicycle',
      urduWord: 'سائیکل',
      urduTransliteration: 'Cycle',
      imageEmoji: '🚲',
      description: 'Riding a bicycle with a helmet is fun active exercise.',
      tracingText: 'CYCLE CYCLE CYCLE',
      activity: 'Trace CYCLE and color the 2 wheels.',
      instructions: 'Trace the word and draw a bell.'
    },
    {
      title: 'A is for Airplane',
      mainCharacter: 'Airplane',
      word: 'Airplane',
      urduWord: 'جہاز',
      urduTransliteration: 'Jahaz',
      imageEmoji: '✈️',
      description: 'Airplanes fly above clouds in the blue sky.',
      tracingText: 'PLANE PLANE PLANE',
      activity: 'Trace PLANE and draw fluffy clouds around it.',
      instructions: 'Trace the letters and fly high!'
    }
  ],
  space: [
    {
      title: 'R is for Rocket',
      mainCharacter: 'Rocket',
      word: 'Rocket',
      urduWord: 'راکٹ',
      urduTransliteration: 'Rocket',
      imageEmoji: '🚀',
      description: 'Rockets blast off high into outer space.',
      tracingText: 'ROCKET ROCKET',
      activity: 'Trace ROCKET and color the flaming engine.',
      instructions: 'Count down 3, 2, 1, Blast off!'
    },
    {
      title: 'M is for Moon',
      mainCharacter: 'Moon',
      word: 'Moon',
      urduWord: 'چاند',
      urduTransliteration: 'Chaand',
      imageEmoji: '🌙',
      description: 'The moon orbits earth and shines in the night sky.',
      tracingText: 'MOON MOON MOON',
      activity: 'Trace MOON and count stars near it.',
      instructions: 'Trace the word and draw stars.'
    },
    {
      title: 'A is for Astronaut',
      mainCharacter: 'Astronaut',
      word: 'Astronaut',
      urduWord: 'خلاباز',
      urduTransliteration: 'Khalabaaz',
      imageEmoji: '🧑‍🚀',
      description: 'Astronauts wear special suits to float in space.',
      tracingText: 'SPACE SPACE SPACE',
      activity: 'Trace SPACE and draw a space helmet.',
      instructions: 'Trace the letters and dream big!'
    },
    {
      title: 'S is for Sun',
      mainCharacter: 'Sun',
      word: 'Sun',
      urduWord: 'سورج',
      urduTransliteration: 'Suraj',
      imageEmoji: '☀️',
      description: 'The sun is a giant burning star giving warm light.',
      tracingText: 'SUN SUN SUN SUN',
      activity: 'Trace SUN and color golden rays.',
      instructions: 'Trace and color the glowing sun.'
    },
    {
      title: 'P is for Planet',
      mainCharacter: 'Planet',
      word: 'Planet',
      urduWord: 'سیارہ',
      urduTransliteration: 'Sayyara',
      imageEmoji: '🪐',
      description: 'Earth is our beautiful blue and green home planet.',
      tracingText: 'EARTH EARTH EARTH',
      activity: 'Trace EARTH and draw continents.',
      instructions: 'Trace and protect our planet!'
    }
  ],
  dinosaurs: [
    {
      title: 'T-Rex',
      mainCharacter: 'T-Rex',
      word: 'Tyrannosaurus',
      urduWord: 'ڈائنوسار',
      urduTransliteration: 'Dinosaur',
      imageEmoji: '🦖',
      description: 'T-Rex had strong legs and a big mighty roar.',
      tracingText: 'T-REX T-REX T-REX',
      activity: 'Trace T-REX and color its sharp teeth.',
      instructions: 'Trace the name and roar!'
    },
    {
      title: 'Triceratops',
      mainCharacter: 'Triceratops',
      word: 'Triceratops',
      urduWord: 'سہ سینگ ڈائنوسار',
      urduTransliteration: 'Triceratops',
      imageEmoji: '🦕',
      description: 'Triceratops had 3 protective horns on its head.',
      tracingText: 'DINO DINO DINO',
      activity: 'Trace DINO and count the 3 horns.',
      instructions: 'Trace and count the horns.'
    },
    {
      title: 'Brachiosaurus',
      mainCharacter: 'Dino',
      word: 'Brachiosaurus',
      urduWord: 'لمبی گردن ڈائنوسار',
      urduTransliteration: 'Long Neck Dino',
      imageEmoji: '🦕',
      description: 'This giant dinosaur had a tall neck to eat high leaves.',
      tracingText: 'TALL DINO TALL',
      activity: 'Trace TALL DINO and draw tall trees.',
      instructions: 'Trace the words and color.'
    },
    {
      title: 'Dino Egg',
      mainCharacter: 'Egg',
      word: 'Dinosaur Egg',
      urduWord: 'ڈائنوسار کا انڈا',
      urduTransliteration: 'Dino Egg',
      imageEmoji: '🥚',
      description: 'Baby dinosaurs hatched out of spotted eggs.',
      tracingText: 'EGG EGG EGG EGG',
      activity: 'Trace EGG and draw cracks on the hatching egg.',
      instructions: 'Trace and watch the baby dino hatch!'
    }
  ]
};

export function getGenericCustomPages(topic: string, count: number): CustomFallbackPage[] {
  const normalized = topic.toLowerCase().trim();
  for (const key of Object.keys(CUSTOM_FALLBACK_TOPICS)) {
    if (normalized.includes(key)) {
      return CUSTOM_FALLBACK_TOPICS[key].slice(0, count);
    }
  }

  // Generic fallback if topic is unique (e.g. "Pakistan", "Insects", "Ocean")
  const pages: CustomFallbackPage[] = [];
  const emojis = ['🌟', '🎨', '🚀', '⚽', '📚', '🧩', '🌈', '🐾', '🌺', '🎵'];
  
  for (let i = 1; i <= count; i++) {
    const emoji = emojis[(i - 1) % emojis.length];
    pages.push({
      title: `${topic} - Concept ${i}`,
      mainCharacter: `${topic} ${i}`,
      word: `${topic} Word ${i}`,
      urduWord: `موضوع ${i}`,
      urduTransliteration: `${topic}`,
      imageEmoji: emoji,
      description: `Explore and learn fun facts about ${topic}.`,
      tracingText: `${topic.toUpperCase()} ${i}`,
      activity: `Trace the word and color the ${topic} picture.`,
      instructions: `Practice writing and discuss ${topic} together!`
    });
  }
  return pages;
}
