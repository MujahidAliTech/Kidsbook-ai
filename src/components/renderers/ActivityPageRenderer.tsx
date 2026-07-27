import React from 'react';
import { BookPage } from '../../types';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  page: BookPage;
}

export const ActivityPageRenderer: React.FC<Props> = ({ page }) => {
  const isUrdu = page.isRtl;
  const objects = page.countingObjects || (page.mainCharacter ? Array(Number(page.mainCharacter) || 3).fill(page.imageEmoji || '⭐') : ['🍎', '🍎', '🍎']);

  return (
    <div
      className={`w-full h-full flex flex-col justify-between p-6 bg-white rounded-lg text-slate-800 ${
        isUrdu ? 'rtl font-urdu' : ''
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-amber-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500 text-white font-bold text-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isUrdu ? 'تعلیمی سرگرمی' : `Fun Activity: ${page.word || page.title}`}
            </h2>
            <p className="text-xs text-slate-500">{page.activity}</p>
          </div>
        </div>

        <div className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200 uppercase">
          Activity
        </div>
      </div>

      {/* Main Activity Work Area */}
      <div className="my-auto space-y-6">
        {/* Task 1: Count Objects */}
        <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200">
          <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">
            Task 1: Count the items below
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center py-4 bg-white rounded-xl border border-amber-200 shadow-2xs">
            {objects.map((obj, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-2xl bg-amber-100/70 border border-amber-300 flex items-center justify-center text-3xl shadow-xs"
              >
                {obj}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between bg-white p-3 rounded-xl border border-amber-200">
            <span className="text-sm font-bold text-slate-700">How many items did you count?</span>
            <div className="w-16 h-12 border-2 border-dashed border-slate-800 rounded-lg bg-slate-50 flex items-center justify-center text-xl font-mono text-slate-300">
              ?
            </div>
          </div>
        </div>

        {/* Task 2: Match / Circle the Correct Word */}
        <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-200">
          <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-3">
            Task 2: Circle the correct matching word
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[page.word || 'Apple', 'Banana', 'Cat', 'Star'].map((opt, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl border-2 border-indigo-200 flex items-center justify-between text-sm font-bold text-slate-800 hover:border-indigo-500"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-slate-400 flex items-center justify-center text-[10px] text-slate-500">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>
                <div className="w-5 h-5 rounded-full border border-dashed border-slate-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Parent Check Point</span>
        </div>
        <span>Score: _____ / 10</span>
      </div>
    </div>
  );
};
