import React from 'react';
import { BookPage } from '../../types';
import { VectorOutline } from './VectorOutline';
import { Palette } from 'lucide-react';

interface Props {
  page: BookPage;
}

export const ColoringPageRenderer: React.FC<Props> = ({ page }) => {
  const isUrdu = page.isRtl;

  return (
    <div
      className={`w-full h-full flex flex-col justify-between p-6 bg-white rounded-lg text-slate-800 ${
        isUrdu ? 'rtl font-urdu' : ''
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-purple-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-600 text-white font-bold text-xl flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isUrdu ? `رنگ بھریں: ${page.word || page.mainCharacter}` : `Coloring Page: ${page.word || page.mainCharacter}`}
            </h2>
            <p className="text-xs text-slate-500">
              {isUrdu ? 'تصویر میں اپنی پسند کے رنگ بھریں۔' : 'Color inside the lines with crayons or colored pencils.'}
            </p>
          </div>
        </div>

        <div className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-200 uppercase">
          Coloring
        </div>
      </div>

      {/* Main Coloring Graphic */}
      <div className="my-auto flex flex-col items-center justify-center text-center py-4">
        <div className="p-4 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-300 flex items-center justify-center min-h-[220px]">
          {page.imageUrl ? (
            <div className="relative group">
              <img
                src={page.imageUrl}
                alt={page.word || 'Coloring outline'}
                referrerPolicy="no-referrer"
                className="max-h-72 max-w-full object-contain filter contrast-150 border-2 border-slate-900 rounded-2xl bg-white p-2 shadow-sm"
              />
              <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-purple-600 text-white text-[10px] font-bold rounded-full shadow-xs">
                AI Outline
              </span>
            </div>
          ) : (
            <VectorOutline shapeKey={page.svgShape} word={page.word} emoji={page.imageEmoji} />
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">{page.word}</h3>
          {page.urduWord && (
            <p className="text-lg font-bold text-purple-700 mt-0.5">{page.urduWord}</p>
          )}
        </div>
      </div>

      {/* Recommended Color Palette Bubbles */}
      <div className="pt-4 border-t border-slate-200 flex flex-col items-center">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Suggested Colors
        </span>
        <div className="flex gap-3">
          <div className="w-7 h-7 rounded-full bg-red-400 border-2 border-slate-800" title="Red" />
          <div className="w-7 h-7 rounded-full bg-amber-400 border-2 border-slate-800" title="Yellow" />
          <div className="w-7 h-7 rounded-full bg-emerald-400 border-2 border-slate-800" title="Green" />
          <div className="w-7 h-7 rounded-full bg-sky-400 border-2 border-slate-800" title="Blue" />
          <div className="w-7 h-7 rounded-full bg-purple-400 border-2 border-slate-800" title="Purple" />
        </div>
      </div>
    </div>
  );
};
