import React from 'react';
import { BookPage } from '../../types';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  page: BookPage;
}

export const QuizPageRenderer: React.FC<Props> = ({ page }) => {
  const questions = page.quizQuestions && page.quizQuestions.length > 0
    ? page.quizQuestions
    : [
        {
          question: `Which word relates to ${page.word || 'this lesson'}?`,
          options: [page.word || 'Option A', 'Banana', 'Car'],
          answer: page.word || 'Option A'
        },
        {
          question: `Can you identify the character ${page.mainCharacter || '⭐'}?`,
          options: ['Yes, I see it!', 'Not sure', 'Try again'],
          answer: 'Yes, I see it!'
        }
      ];

  return (
    <div className={`w-full h-full flex flex-col justify-between p-4 ${page.isRtl ? 'rtl text-right' : 'ltr text-left'}`}>
      {/* Header */}
      <div className="border-b-2 border-purple-100 pb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black text-purple-600 uppercase tracking-widest mb-1">
            <HelpCircle className="w-4 h-4 text-purple-500" />
            <span>Interactive Quiz Challenge</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">{page.title}</h2>
        </div>
        <span className="text-3xl">{page.imageEmoji || '❓'}</span>
      </div>

      {/* Questions List */}
      <div className="flex-1 my-3 space-y-4">
        {questions.map((q, idx) => (
          <div key={idx} className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-2">
            <p className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-mono">
                {idx + 1}
              </span>
              <span>{q.question}</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {q.options.map((opt, oIdx) => (
                <div
                  key={oIdx}
                  className="p-2.5 bg-white rounded-xl border border-purple-200 text-center text-xs font-extrabold text-slate-800 shadow-2xs hover:bg-purple-100/50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full border border-purple-300 flex items-center justify-center text-[9px] text-purple-700 font-bold">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span>{opt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Instructions */}
      <div className="p-2.5 bg-purple-100/60 rounded-xl text-center">
        <p className="text-[11px] font-bold text-purple-900 flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
          <span>Circle the correct answer with your pencil or crayon!</span>
        </p>
      </div>
    </div>
  );
};
