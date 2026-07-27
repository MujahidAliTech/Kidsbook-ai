import React from 'react';
import { BookPage } from '../../types';
import { TracingLines } from './TracingLines';
import { Pencil } from 'lucide-react';

interface Props {
  page: BookPage;
  ageGroup: string;
}

export const TracingPageRenderer: React.FC<Props> = ({ page, ageGroup }) => {
  const isUrdu = page.isRtl;

  return (
    <div
      className={`w-full h-full flex flex-col justify-between p-6 bg-white rounded-lg text-slate-800 ${
        isUrdu ? 'rtl font-urdu' : ''
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-emerald-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white font-bold text-xl flex items-center justify-center">
            <Pencil className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isUrdu ? `مشق لکیریں: ${page.mainCharacter}` : `Tracing Practice: ${page.mainCharacter}`}
            </h2>
            <p className="text-xs text-slate-500">{page.instructions}</p>
          </div>
        </div>

        <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 uppercase">
          Tracing
        </div>
      </div>

      {/* Top Sample Badge */}
      <div className="my-4 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{page.imageEmoji}</div>
          <div>
            <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Word Practice</span>
            <h3 className="text-2xl font-black text-slate-900">{page.word}</h3>
            {page.urduWord && <p className="text-sm font-semibold text-emerald-700">{page.urduWord}</p>}
          </div>
        </div>

        <div className="text-center px-4 py-2 bg-white rounded-xl border border-emerald-200 shadow-2xs">
          <span className="text-3xl font-black text-emerald-600 font-mono">{page.mainCharacter}</span>
          <p className="text-[10px] text-slate-400 font-medium">Character</p>
        </div>
      </div>

      {/* Multiple Tracing Rows */}
      <div className="my-auto space-y-2">
        <div className="text-xs font-bold text-slate-600 uppercase tracking-wider flex justify-between">
          <span>Row 1–3: Trace Letter / Character ({page.mainCharacter})</span>
          <span>Light Dotted Lines</span>
        </div>
        <TracingLines text={page.mainCharacter} rows={3} ageGroup={ageGroup} />

        <div className="text-xs font-bold text-slate-600 uppercase tracking-wider flex justify-between pt-1">
          <span>Row 4–6: Trace Word ({page.word})</span>
          <span>Writing Guide</span>
        </div>
        <TracingLines text={`${page.word}  ${page.word}`} rows={3} ageGroup={ageGroup} />
      </div>

      {/* Footer Encouragement */}
      <div className="pt-3 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
        ⭐ Excellent job! Keep your pencil steady along the guidelines.
      </div>
    </div>
  );
};
