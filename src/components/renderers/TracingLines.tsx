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

  // Auto-format short single characters across line width
  let displayText = text;
  if (text && text.trim().length <= 3 && !text.includes(' ')) {
    const char = text.trim();
    displayText = `${char}   ${char}   ${char}   ${char}   ${char}`;
  }

  const rowCount = Math.max(1, rows);

  return (
    <div className="w-full space-y-2 my-1">
      {Array.from({ length: rowCount }).map((_, rIdx) => (
        <div
          key={rIdx}
          className="relative w-full h-12 md:h-14 bg-slate-50/50 rounded-lg border border-slate-200 flex items-center px-4 overflow-hidden"
        >
          {/* Top Line (Solid Indigo) */}
          <div className="absolute top-[18%] left-0 right-0 border-b border-indigo-200" />
          
          {/* Middle Dashed Line (Dashed Gray) */}
          <div className="absolute top-[50%] left-0 right-0 border-b border-dashed border-slate-300" />
          
          {/* Bottom Baseline (Solid Red/Indigo) */}
          <div className="absolute bottom-[18%] left-0 right-0 border-b border-indigo-300" />

          {/* Dotted Tracing Text */}
          <div className="relative z-10 w-full flex justify-between items-center font-mono font-bold tracking-widest text-slate-300 select-none">
            <span className={`${fontSizeClass} font-outline-dotted text-slate-300`}>
              {displayText}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
