import { BookConfig, LessonPlan } from '../../types';

export function createLessonPlan(config: BookConfig, aiPlan?: Partial<LessonPlan>): LessonPlan {
  const topic = config.customTopic || config.category || 'General Learning';
  const age = config.ageGroup;
  const isUrdu = config.language === 'urdu' || config.category === 'urdu-alphabet';

  if (aiPlan && Array.isArray(aiPlan.learningObjectives) && aiPlan.learningObjectives.length > 0) {
    return {
      learningObjectives: aiPlan.learningObjectives,
      targetVocabulary: aiPlan.targetVocabulary || [topic],
      practiceGoals: aiPlan.practiceGoals || ['Tracing & Motor Control', 'Visual Discrimination'],
      reviewGoals: aiPlan.reviewGoals || ['Memory recall game', 'Parent feedback'],
      difficultyLevel: aiPlan.difficultyLevel || config.difficulty || 'medium',
      expectedOutcome: aiPlan.expectedOutcome || `Child successfully masters core ${topic} concepts for age ${age}.`
    };
  }

  return {
    learningObjectives: [
      `Recognize key symbols, letters, or concepts for ${topic}`,
      `Enhance fine motor skills through guided letter and shape tracing`,
      `Expand vocabulary with age-appropriate contextual examples`
    ],
    targetVocabulary: [topic, 'Practice', 'Learn', 'Trace'],
    practiceGoals: [
      'Pencil grip and line tracing',
      'Visual object matching and identification',
      'Interactive question answering'
    ],
    reviewGoals: [
      'Daily 5-minute review with parent',
      'Recalling main characters or words'
    ],
    difficultyLevel: config.difficulty || (age === '2-3' ? 'easy' : age === '6-7' ? 'hard' : 'medium'),
    expectedOutcome: isUrdu
      ? `بچہ ${topic} کے بنیادی تصورات اور لکھنے کی مشق میں کامیابی حاصل کرے گا۔`
      : `Child gains foundational mastery in ${topic} concepts suitable for age ${age}.`
  };
}
