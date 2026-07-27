import React from 'react';

interface Props {
  text: string;
  rows?: number;
  ageGroup?: string;
}

export const TracingLines: React.FC<Props> = ({ text, rows = 5, ageGroup = '3-4' }) => {
  // Adjust font size based on age group
  let fontSizeClass = 'text-2xl md:text-3xl';
  if (ageGroup === '2-3') {
    fontSizeClass = 'text-3xl md:text-4xl';
  } else if (ageGroup === '5-6' || ageGroup === '6-7') {
    fontSizeClass = 'text-xl md:text-2xl';
  }

  // Determine items to render with generous spacing across the line width
  let itemsToRender: string[] = [];
  const trimmed = (text || '').trim();

  if (!trimmed) {
    itemsToRender = ['', '', '', ''];
  } else if (trimmed.includes('  ')) {
    // Use exact items provided without duplicating
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
    <div className="w-full space-y-2 my-1">
      {Array.from({ length: rowCount }).map((_, rIdx) => (
        <div
          key={rIdx}
          className="relative w-full h-12 md:h-14 bg-slate-50/50 rounded-lg border border-slate-200 flex items-center px-8 md:px-12 overflow-hidden"
        >
          {/* Top Line (Solid Indigo) */}
          <div className="absolute top-[18%] left-0 right-0 border-b border-indigo-200" />
          
          {/* Middle Dashed Line (Dashed Gray) */}
          <div className="absolute top-[50%] left-0 right-0 border-b border-dashed border-slate-300" />
          
          {/* Bottom Baseline (Solid Red/Indigo) */}
          <div className="absolute bottom-[18%] left-0 right-0 border-b border-indigo-300" />

          {/* Dotted Tracing Items distributed with wide equal spacing */}
          <div className="relative z-10 w-full flex justify-around items-center font-mono font-bold text-slate-300 select-none">
            {itemsToRender.map((item, iIdx) => (
              <span
                key={iIdx}
                className={`${fontSizeClass} font-outline-dotted text-slate-300 whitespace-nowrap`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

