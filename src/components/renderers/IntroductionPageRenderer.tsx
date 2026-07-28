import React from 'react';
import { BookPage } from '../../types';
import { BookOpen, CheckCircle2, Target, Sparkles } from 'lucide-react';

interface Props {
  page: BookPage;
}

export const IntroductionPageRenderer: React.FC<Props> = ({ page }) => {
  return (
    <div className={`w-full h-full flex flex-col justify-between p-4 ${page.isRtl ? 'rtl text-right' : 'ltr text-left'}`}>
      {/* Header */}
      <div className="border-b-2 border-indigo-100 pb-3">
        <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest mb-1">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Curriculum Overview</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{page.title}</h2>
      </div>

      {/* Description */}
      <div className="my-3 p-4 bg-indigo-50/80 rounded-2xl border border-indigo-100">
        <p className="text-sm font-medium text-slate-700 leading-relaxed">
          {page.description}
        </p>
      </div>

      {/* Section Outline */}
      <div className="flex-1 my-2">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Target className="w-4 h-4 text-indigo-600" />
          <span>Book Outline & Learning Modules</span>
        </h3>
        <div className="space-y-2">
          {(page.sectionOutline || [
            'Core Vocabulary & Character Introduction',
            'Interactive Letter & Number Tracing Practice',
            'Fun Matching & Color-by-Number Worksheets',
            'Final Progress Checklist & Certificate'
          ]).map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span className="text-xs font-bold text-slate-800 leading-tight pt-1">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Encouragement */}
      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
        <p className="text-xs font-black text-amber-900 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-amber-600" />
          <span>Ready to Learn? Let's turn the page and get started!</span>
        </p>
      </div>
    </div>
  );
};
