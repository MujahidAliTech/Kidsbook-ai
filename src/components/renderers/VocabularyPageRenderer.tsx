import React from 'react';
import { BookPage } from '../../types';
import { BookMarked, Volume2, Sparkles } from 'lucide-react';
import { KidsImageIllustration } from './KidsImageIllustration';

interface Props {
  page: BookPage;
}

export const VocabularyPageRenderer: React.FC<Props> = ({ page }) => {
  return (
    <div className={`w-full h-full flex flex-col justify-between p-4 ${page.isRtl ? 'rtl text-right' : 'ltr text-left'}`}>
      {/* Header */}
      <div className="border-b-2 border-emerald-100 pb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">
            <BookMarked className="w-4 h-4 text-emerald-500" />
            <span>Vocabulary Builder</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">{page.title}</h2>
        </div>
        <div className="w-12 h-12 flex items-center justify-center">
          <KidsImageIllustration emoji={page.imageEmoji || '📚'} size={44} />
        </div>
      </div>

      {/* Main Vocabulary Word Card */}
      <div className="my-2 p-4 bg-gradient-to-tr from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 text-center space-y-2">
        <span className="text-4xl font-black text-emerald-900 tracking-wide block">
          {page.word}
        </span>

        {page.urduWord && (
          <div className="flex items-center justify-center gap-2 pt-1 border-t border-emerald-200/60">
            <span className="text-2xl font-bold font-serif text-emerald-800">{page.urduWord}</span>
            {page.urduTransliteration && (
              <span className="text-xs font-mono font-bold text-emerald-600 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                ({page.urduTransliteration})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Sentence Example & Pronunciation */}
      <div className="my-2 space-y-2">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Context Sentence:</span>
          <p className="text-xs font-extrabold text-slate-800 leading-snug">
            {page.description || `${page.word} is bright, fun, and very easy to remember!`}
          </p>
        </div>

        {page.tracingText && (
          <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-emerald-900 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pronunciation Guide:</span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
              {page.tracingText}
            </span>
          </div>
        )}
      </div>

      {/* Footer Practice */}
      <div className="p-2.5 bg-emerald-100/60 rounded-xl text-center">
        <p className="text-[11px] font-bold text-emerald-900 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{page.activity || 'Say the word 3 times out loud and draw a picture!'}</span>
        </p>
      </div>
    </div>
  );
};
