import React from 'react';
import { BookPage } from '../../types';
import { TracingLines } from './TracingLines';

interface Props {
  page: BookPage;
  ageGroup: string;
}

export const LearningPageRenderer: React.FC<Props> = ({ page, ageGroup }) => {
  const isUrdu = page.isRtl;
  const tracingText = page.tracingText || page.mainCharacter || page.word || '';

  return (
    <div
      className={`w-full h-full flex flex-col justify-between p-5 bg-white rounded-lg text-slate-800 ${
        isUrdu ? 'rtl font-urdu' : ''
      }`}
    >
      {/* Top Banner Header */}
      <div className="flex justify-between items-center border-b-2 border-indigo-100 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-xs">
            {page.mainCharacter}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{page.title}</h2>
            {page.urduWord && (
              <p className="text-xs font-semibold text-indigo-600">
                {page.urduWord} {page.urduTransliteration ? `(${page.urduTransliteration})` : ''}
              </p>
            )}
          </div>
        </div>

        <div className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[11px] font-bold rounded-full border border-indigo-200 uppercase tracking-wider">
          Learning
        </div>
      </div>

      {/* Main Visual Display */}
      <div className="my-2 flex flex-col items-center justify-center text-center">
        {/* Large Emoji / Visual Card */}
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-amber-50/80 border-3 border-amber-200 flex items-center justify-center text-6xl md:text-7xl shadow-xs relative my-1">
          <span>{page.imageEmoji}</span>
          {page.colorHex && (
            <div
              className="absolute top-2 right-2 w-5 h-5 rounded-full border-2 border-white shadow-xs"
              style={{ backgroundColor: page.colorHex }}
              title={`Color: ${page.word}`}
            />
          )}
        </div>

        {/* Word Display */}
        <h3 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
          {page.word}
        </h3>

        {/* Description Fact */}
        {page.description && (
          <p className="mt-1 text-slate-600 max-w-md text-xs md:text-sm font-medium leading-tight bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            {page.description}
          </p>
        )}
      </div>

      {/* Tracing & Writing Guideline Row - 6 Lines to fill A4 Page */}
      <div className="mt-auto pt-3 border-t border-slate-200">
        <div className="flex justify-between items-center mb-1 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <span>✏️ Practice Writing ({page.mainCharacter})</span>
          <span>Trace on lines</span>
        </div>

        <TracingLines text={tracingText} rows={6} ageGroup={ageGroup} isUrdu={isUrdu} />
      </div>
    </div>
  );
};
