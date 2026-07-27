export interface FruitItem {
  name: string;
  urduName: string;
  transliteration: string;
  emoji: string;
  colorName: string;
  fact: string;
  tracing: string;
  activityPrompt: string;
}

export const FRUITS_DATA: FruitItem[] = [
  {
    name: 'Apple',
    urduName: 'سیب',
    transliteration: 'Seb',
    emoji: '🍎',
    colorName: 'Red or Green',
    fact: 'An apple is red, sweet, crisp, and filled with vitamins.',
    tracing: 'APPLE APPLE APPLE',
    activityPrompt: 'Trace APPLE and color the apple shiny red.'
  },
  {
    name: 'Banana',
    urduName: 'کیلا',
    transliteration: 'Keela',
    emoji: '🍌',
    colorName: 'Yellow',
    fact: 'Bananas grow in bunches on tropical plants and taste sweet.',
    tracing: 'BANANA BANANA',
    activityPrompt: 'Trace BANANA and color the curved peel yellow.'
  },
  {
    name: 'Orange',
    urduName: 'مالٹا',
    transliteration: 'Malta',
    emoji: '🍊',
    colorName: 'Orange',
    fact: 'Oranges are round citrus fruits packed with healthy Vitamin C.',
    tracing: 'ORANGE ORANGE',
    activityPrompt: 'Trace ORANGE and color the round orange.'
  },
  {
    name: 'Mango',
    urduName: 'آم',
    transliteration: 'Aam',
    emoji: '🥭',
    colorName: 'Golden Yellow',
    fact: 'Mango is known as the King of Fruits for its delicious taste.',
    tracing: 'MANGO MANGO MANGO',
    activityPrompt: 'Trace MANGO and color the juicy golden mango.'
  },
  {
    name: 'Grapes',
    urduName: 'انگور',
    transliteration: 'Angoor',
    emoji: '🍇',
    colorName: 'Purple or Green',
    fact: 'Grapes grow in bunches on vines and are juicy bite-sized treats.',
    tracing: 'GRAPES GRAPES',
    activityPrompt: 'Trace GRAPES and count how many grapes in the cluster.'
  },
  {
    name: 'Watermelon',
    urduName: 'تربوز',
    transliteration: 'Tarbooz',
    emoji: '🍉',
    colorName: 'Green outside, Red inside',
    fact: 'Watermelons are giant cooling summer fruits filled with water.',
    tracing: 'WATERMELON WATERMELON',
    activityPrompt: 'Trace WATERMELON and color the juicy red slice.'
  },
  {
    name: 'Strawberry',
    urduName: 'اسٹراسبری',
    transliteration: 'Strawberry',
    emoji: '🍓',
    colorName: 'Bright Red',
    fact: 'Strawberries have tiny seeds on their outer skin and taste tangy.',
    tracing: 'STRAWBERRY STRAWBERRY',
    activityPrompt: 'Trace STRAWBERRY and color the little green top.'
  },
  {
    name: 'Pineapple',
    urduName: 'انناس',
    transliteration: 'Ananas',
    emoji: '🍍',
    colorName: 'Yellow Brown',
    fact: 'Pineapples have a prickly crown of leaves and sweet yellow fruit.',
    tracing: 'PINEAPPLE PINEAPPLE',
    activityPrompt: 'Trace PINEAPPLE and draw diamond patterns on its skin.'
  },
  {
    name: 'Pear',
    urduName: 'ناشپاتی',
    transliteration: 'Nashpati',
    emoji: '🍐',
    colorName: 'Green or Yellow',
    fact: 'Pears have a bell shape and sweet juicy white flesh inside.',
    tracing: 'PEAR PEAR PEAR',
    activityPrompt: 'Trace PEAR and color the smooth green skin.'
  },
  {
    name: 'Coconut',
    urduName: 'ناریل',
    transliteration: 'Nariyal',
    emoji: '🥥',
    colorName: 'Brown outside, White inside',
    fact: 'Coconuts grow high on palm trees and contain sweet refreshing water.',
    tracing: 'COCONUT COCONUT',
    activityPrompt: 'Trace COCONUT and color the coconut shell.'
  }
];
