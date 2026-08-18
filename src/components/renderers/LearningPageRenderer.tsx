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

export const LearningPageRenderer: React.FC<Props> = ({ page, ageGroup }) => {
  const isUrdu = page.isRtl;
  const isEarlyAge = ageGroup === '2-3' || ageGroup === '3-4';
  const tracingText = page.tracingText || page.mainCharacter || page.word || '';

  // Dynamic Theme Color based on page colorHex or default to cute red/rose
  const themeColor = page.colorHex || '#EF4444'; 

  // 1. GORGEOUS PICTURE BOOK STYLE FOR 2-3 & 3-4 YEARS (MATCHING THE USER'S PROVIDED IMAGE EXACTLY)
  if (isEarlyAge) {
    return (
      <div 
        className={`w-full h-full flex flex-col justify-between bg-white text-slate-800 relative overflow-hidden select-none transition-all ${
          isUrdu ? 'rtl font-urdu' : ''
        }`}
        style={{
          border: `14px solid ${themeColor}`, // Thick, vibrant dynamic solid border framing the entire sheet
          borderRadius: '24px'
        }}
      >
        {/* Soft watermark pattern of the item in the background (Apple pattern style from image) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex flex-wrap gap-6 p-4 items-center justify-around overflow-hidden select-none">
          {Array.from({ length: 15 }).map((_, idx) => (
            <span key={idx} className="text-5xl select-none">{page.imageEmoji}</span>
          ))}
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-between p-6 h-full">
          
          {/* Top: Huge Centered Character (E.g. "Aa" in black) */}
          <div className="text-center mt-2">
            <span className="text-8xl md:text-9xl font-black text-slate-950 tracking-tighter block leading-none select-none">
              {formatCharacter(page.mainCharacter || '')}
            </span>
          </div>

          {/* Center: Giant Beautiful HD Cartoon Illustration */}
          <div className="flex-1 flex items-center justify-center my-4">
            <div className="transform hover:scale-110 transition-transform duration-300 select-none animate-bounce-slow">
              <KidsImageIllustration emoji={page.imageEmoji || '⭐'} size={160} />
            </div>
          </div>

          {/* Bottom: Huge Centered Word in Dynamic Theme Color (E.g. "Apple" in Red) */}
          <div className="text-center mb-2">
            <span 
              className="text-5xl md:text-6xl font-black tracking-tight block leading-none select-none font-kids"
              style={{ color: themeColor }}
            >
              {page.word}
            </span>
            {isUrdu && page.urduWord && (
              <span className="text-4xl font-bold block mt-1 text-slate-700">
                {page.urduWord}
              </span>
            )}
          </div>

          {/* Tracing Area: ONLY for 3-4 Years, NOT for 2-3 Years */}
          {ageGroup === '3-4' && (
            <div className="mt-4 pt-3 border-t border-slate-100/80 bg-slate-50/50 p-3 rounded-2xl">
              <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                <span>✏️ Trace Character ({page.mainCharacter})</span>
                <span>Giant Guide Dot starting</span>
              </div>
              <TracingLines text={page.mainCharacter} rows={1} ageGroup="2-3" isUrdu={isUrdu} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. DEFAULT RENDERER FOR OLDER KIDS (4-5, 5-6, 6-7 YEARS)
  return (
    <div className={`w-full h-full flex flex-col justify-between text-slate-800 ${isUrdu ? 'rtl font-urdu' : ''}`}>
      
      {/* Header Detail */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
          {isUrdu ? 'اردو سیکھیں' : 'Learning Page'}
        </span>
        <span className="px-2.5 py-0.5 bg-slate-50 text-slate-700 text-[10px] font-black rounded-full border border-slate-200">
          Age {ageGroup} Years
        </span>
      </div>

      {/* Main Large Illustration & Character Container */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto space-y-4 py-4 text-center">
        
        {/* Massive Letter Display */}
        <div className="flex items-center gap-4">
          <span className="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter drop-shadow-xs font-kids">
            {formatCharacter(page.mainCharacter || '')}
          </span>
        </div>

        {/* Big Beautiful HD Cartoon Illustration */}
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shadow-xs transition-transform hover:scale-105 duration-200 p-4">
          <KidsImageIllustration emoji={page.imageEmoji || '⭐'} size={96} />
        </div>

        {/* Bold Word Display */}
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          {page.word} {page.urduWord ? ` / ${page.urduWord}` : ''}
        </h3>

        {/* Educational Fact / Description */}
        {page.description && (
          <p className="text-xs md:text-sm text-slate-600 max-w-sm mx-auto px-4 font-bold leading-relaxed bg-slate-50/80 py-2 rounded-2xl border border-slate-100">
            {page.description}
          </p>
        )}
      </div>

      {/* Bottom Action / Tracing Area */}
      <div className="mt-auto pt-3 border-t border-slate-100">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-wider">
            <span>✏️ Practice Writing ({page.mainCharacter})</span>
            <span>Trace on lines</span>
          </div>
          <TracingLines text={tracingText} rows={3} ageGroup={ageGroup} isUrdu={isUrdu} />
        </div>
      </div>

    </div>
  );
};
