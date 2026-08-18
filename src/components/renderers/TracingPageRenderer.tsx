import React from 'react';
import { BookPage } from '../../types';
import { TracingLines } from './TracingLines';
import { KidsImageIllustration } from './KidsImageIllustration';

interface Props {
  page: BookPage;
  ageGroup: string;
}

const formatCharacter = (char: string) => {
  if (!char) return '';
  const trimmed = char.trim();
  if (trimmed.length === 1 && /[A-Za-z]/.test(trimmed)) {
    return `${trimmed.toUpperCase()}${trimmed.toLowerCase()}`;
  }
  return trimmed;
};

export const TracingPageRenderer: React.FC<Props> = ({ page, ageGroup }) => {
  const isUrdu = page.isRtl;
  const isEarlyTracing = ageGroup === '3-4';
  const doubleChar = formatCharacter(page.mainCharacter || '');

  return (
    <div className={`w-full h-full flex flex-col justify-between text-slate-800 ${isUrdu ? 'rtl font-urdu' : ''}`}>
      
      {/* 1. Header Details */}
      <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
        <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
          {isUrdu ? 'حروف لکھیں' : 'Tracing Practice'}
        </span>
        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-200">
          Age {ageGroup} Years
        </span>
      </div>

      {/* 2. Visual Cute Summary Card */}
      <div className="p-3.5 bg-emerald-50/40 rounded-2xl border border-emerald-100 flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <KidsImageIllustration emoji={page.imageEmoji || '⭐'} size={44} />
          </div>
          <div>
            <span className="text-[9px] text-emerald-800 font-extrabold uppercase tracking-wider block">Vocabulary</span>
            <h3 className="text-xl font-black text-slate-900 leading-none">{page.word}</h3>
            {page.urduWord && <p className="text-xs font-bold text-emerald-700 mt-1">{page.urduWord}</p>}
          </div>
        </div>
        <div className="px-4 py-1.5 bg-white rounded-xl border border-emerald-200 text-center">
          <span className="text-2xl font-black text-emerald-600 font-kids">{doubleChar || page.mainCharacter}</span>
        </div>
      </div>

      {/* 3. Spacious Handwriting / Tracing Grids */}
      <div className="flex-1 flex flex-col justify-around my-auto py-2 space-y-3">
        {isEarlyTracing ? (
          /* Early Tracing (Age 3-4): Spacious lines, easy flow */
          <>
            <div className="space-y-1">
              <div className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider flex justify-between">
                <span>✏️ Trace Character ({doubleChar || page.mainCharacter})</span>
                <span>Giant Guide</span>
              </div>
              <TracingLines text={doubleChar || page.mainCharacter} rows={2} ageGroup="2-3" isUrdu={isUrdu} />
            </div>

            <div className="space-y-1 pt-1">
              <div className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider flex justify-between">
                <span>✏️ Trace Word ({page.word})</span>
                <span>Spacious Lines</span>
              </div>
              <TracingLines text={page.word} rows={2} ageGroup="3-4" isUrdu={isUrdu} />
            </div>
          </>
        ) : (
          /* Default Tracing for older ages */
          <>
            <div className="space-y-1">
              <div className="text-[9px] font-bold text-slate-600 uppercase tracking-wider flex justify-between">
                <span>Trace Letter / Character ({page.mainCharacter})</span>
                <span>Light Dotted Lines</span>
              </div>
              <TracingLines text={page.mainCharacter} rows={3} ageGroup={ageGroup} isUrdu={isUrdu} />
            </div>

            <div className="space-y-1 pt-1">
              <div className="text-[9px] font-bold text-slate-600 uppercase tracking-wider flex justify-between">
                <span>Trace Word ({page.word})</span>
                <span>Writing Guide</span>
              </div>
              <TracingLines text={`${page.word}  ${page.word}`} rows={3} ageGroup={ageGroup} isUrdu={isUrdu} />
            </div>
          </>
        )}
      </div>

      {/* 4. Footer encouragement */}
      <div className="pt-2 border-t border-slate-100 text-center text-[10px] font-black text-emerald-600 flex items-center justify-center gap-1 mt-1">
        🌟 Excellent effort! Keep your pencil steady!
      </div>

    </div>
  );
};
