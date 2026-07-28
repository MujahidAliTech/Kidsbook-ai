import React from 'react';
import { BookPage } from '../../types';
import { Layers, CheckCircle2 } from 'lucide-react';

interface Props {
  page: BookPage;
}

export const MatchingPageRenderer: React.FC<Props> = ({ page }) => {
  const pairs = page.matchingPairs && page.matchingPairs.length > 0
    ? page.matchingPairs
    : [
        { left: page.mainCharacter || 'A', right: page.word || 'Apple' },
        { left: 'B', right: 'Ball' },
        { left: 'C', right: 'Cat' },
        { left: 'D', right: 'Dog' }
      ];

  return (
    <div className={`w-full h-full flex flex-col justify-between p-4 ${page.isRtl ? 'rtl text-right' : 'ltr text-left'}`}>
      {/* Header */}
      <div className="border-b-2 border-sky-100 pb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black text-sky-600 uppercase tracking-widest mb-1">
            <Layers className="w-4 h-4 text-sky-500" />
            <span>Matching Pairs Exercise</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">{page.title}</h2>
        </div>
        <span className="text-3xl">{page.imageEmoji || '🧩'}</span>
      </div>

      {/* Matching Columns */}
      <div className="flex-1 my-3 relative flex items-center justify-between gap-6 px-2">
        {/* Left Column */}
        <div className="flex-1 space-y-3">
          {pairs.map((p, idx) => (
            <div key={idx} className="p-3 bg-sky-50 rounded-xl border-2 border-sky-200 text-center text-sm font-black text-sky-900 shadow-2xs">
              {p.left}
            </div>
          ))}
        </div>

        {/* Center Dotted Guide Lines */}
        <div className="w-12 h-full flex flex-col justify-around items-center">
          {pairs.map((_, idx) => (
            <div key={idx} className="w-full border-b-2 border-dashed border-sky-300 my-2 opacity-50" />
          ))}
        </div>

        {/* Right Column (Shuffled) */}
        <div className="flex-1 space-y-3">
          {[...pairs].reverse().map((p, idx) => (
            <div key={idx} className="p-3 bg-indigo-50 rounded-xl border-2 border-indigo-200 text-center text-sm font-black text-indigo-900 shadow-2xs">
              {p.right}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="p-2.5 bg-sky-100/60 rounded-xl text-center">
        <p className="text-[11px] font-bold text-sky-900 flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
          <span>Draw straight pencil lines to connect the matching pairs!</span>
        </p>
      </div>
    </div>
  );
};
