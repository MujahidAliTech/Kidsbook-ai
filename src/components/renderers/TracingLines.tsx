import React from 'react';

interface Props {
  text: string;
  rows?: number;
  ageGroup?: string;
  isUrdu?: boolean;
}

export const TracingLines: React.FC<Props> = ({ text, rows = 5, ageGroup = '3-4', isUrdu = false }) => {
  // Adjust font size based on age group
  let fontSizeClass = 'text-3xl md:text-4xl';
  if (ageGroup === '2-3') {
    fontSizeClass = 'text-4xl md:text-5xl';
  } else if (ageGroup === '5-6' || ageGroup === '6-7') {
    fontSizeClass = 'text-2xl md:text-3xl';
  }

  // Determine items to render with generous spacing across the line width
  let itemsToRender: string[] = [];
  const trimmed = (text || '').trim();

  if (!trimmed) {
    itemsToRender = ['', '', '', ''];
  } else if (trimmed.includes('  ')) {
    itemsToRender = trimmed.split(/\s+/).filter(Boolean);
  } else if (trimmed.length <= 3) {
    // Single letter/character (e.g. 'A', 'خ', '1') -> 3-4 items spaced out widely
    const itemCount = ageGroup === '2-3' ? 3 : 4;
    itemsToRender = Array(itemCount).fill(trimmed);
  } else {
    // Word (e.g. 'Apple', 'سیب') -> 2 items with wide spacing
    itemsToRender = Array(2).fill(trimmed);
  }

  const rowCount = Math.max(1, rows);

  return (
    <div className="w-full space-y-2.5 my-1">
      {Array.from({ length: rowCount }).map((_, rIdx) => (
        <div
          key={rIdx}
          className="handwriting-grid-4line relative w-full h-14 md:h-16 bg-slate-50/70 rounded-xl border border-slate-200 flex items-center px-6 md:px-10 overflow-hidden shadow-2xs"
        >
          {/* 4-Line Primary Writing Grid */}
          {/* Line 1: Top Line (Red/Rose) */}
          <div className="absolute top-[16%] left-0 right-0 border-b-2 border-rose-400/80" />
          
          {/* Line 2: Dashed Midline (Blue/Indigo) */}
          <div className="absolute top-[38%] left-0 right-0 border-b border-dashed border-indigo-400" />
          
          {/* Line 3: Baseline (Solid Dark Blue) */}
          <div className="absolute top-[62%] left-0 right-0 border-b-2 border-indigo-800" />

          {/* Line 4: Bottom Line (Light Red/Pink) */}
          <div className="absolute top-[84%] left-0 right-0 border-b border-rose-300/80" />

          {/* Dotted Tracing Items distributed with wide equal spacing */}
          <div className={`relative z-10 w-full flex justify-around items-center font-bold text-slate-400 select-none ${isUrdu ? 'font-urdu' : 'font-kids'}`}>
            {itemsToRender.map((item, iIdx) => (
              <div key={iIdx} className="relative flex items-center justify-center">
                {/* Visual Start Dot for Child Guidance on the first letter of each row */}
                {iIdx === 0 && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200 shadow-xs" title="Start Point" />
                )}
                <span
                  className={`${fontSizeClass} ${isUrdu ? 'text-slate-400 tracking-widest' : 'font-outline-dotted text-slate-400'} whitespace-nowrap`}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
