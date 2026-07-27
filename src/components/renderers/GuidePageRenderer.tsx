import React from 'react';
import { BookPage } from '../../types';
import { GraduationCap, Clock, Heart, Award, CheckSquare, Smile } from 'lucide-react';

interface Props {
  page: BookPage;
  ageGroup: string;
}

export const GuidePageRenderer: React.FC<Props> = ({ page, ageGroup }) => {
  const isUrdu = page.isRtl;

  return (
    <div
      className={`w-full h-full flex flex-col justify-between p-6 bg-slate-50/70 border-4 border-indigo-200 rounded-lg text-slate-800 ${
        isUrdu ? 'rtl font-urdu' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b-2 border-indigo-200 pb-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shadow-xs">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-indigo-950">
            {isUrdu ? 'والدین اور اساتذہ کے لیے رہنما ہدایت' : 'Parent & Teacher Guide'}
          </h2>
          <p className="text-xs text-indigo-700 font-semibold">
            Tailored learning path for Age {ageGroup} Years
          </p>
        </div>
      </div>

      {/* Guide Content Sections */}
      <div className="my-auto space-y-4">
        {/* Objectives */}
        <div className="p-4 bg-white rounded-xl border border-indigo-100 shadow-2xs">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm mb-2">
            <CheckSquare className="w-4 h-4 text-indigo-600" />
            <span>Learning Objectives for Age {ageGroup}</span>
          </div>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
            <li>Master letter & number recognition through multi-sensory visual cues.</li>
            <li>Develop fine motor precision by tracing dotted guidelines gently.</li>
            <li>Expand active vocabulary and phonics association.</li>
            <li>Build confidence through positive reinforcement and immediate praise.</li>
          </ul>
        </div>

        {/* How Parents Can Help */}
        <div className="p-4 bg-white rounded-xl border border-amber-100 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-100" />
            <span>How You Can Help Your Child</span>
          </div>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
            <li>Say words aloud together with your child while tracing each letter.</li>
            <li>Encourage light grip on crayons or primary pencils.</li>
            <li>Celebrate effort over perfection — every line traced is progress!</li>
          </ul>
        </div>

        {/* Time Recommendation & Routine */}
        <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Recommended Session Length</h4>
              <p className="text-xs text-slate-500">Short, consistent daily practice works best</p>
            </div>
          </div>
          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 font-black text-sm rounded-lg">
            10–15 Mins / Day
          </span>
        </div>

        {/* Reward Sticker Grid */}
        <div className="p-4 bg-white rounded-xl border border-indigo-100 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Completion Sticker Chart</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Place stickers when completed!</span>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className="h-12 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center bg-slate-50"
              >
                <Smile className="w-4 h-4 text-slate-300" />
                <span className="text-[9px] font-bold text-slate-400">Day {s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-200 text-center text-[11px] text-slate-400 font-medium">
        Generated with KidsBook AI • Printable Educational Worksheets
      </div>
    </div>
  );
};
