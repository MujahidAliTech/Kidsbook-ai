import React from 'react';
import { BookPage } from '../../types';
import { BookOpen, Heart, Sparkles } from 'lucide-react';

interface Props {
  page: BookPage;
}

export const StoryPageRenderer: React.FC<Props> = ({ page }) => {
  return (
    <div className={`w-full h-full flex flex-col justify-between p-4 ${page.isRtl ? 'rtl text-right' : 'ltr text-left'}`}>
      {/* Story Title & Badge */}
      <div className="border-b-2 border-amber-100 pb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black text-amber-600 uppercase tracking-widest mb-1">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Mini Bedtime Story</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">{page.title}</h2>
        </div>
        <span className="text-4xl">{page.imageEmoji || '📖'}</span>
      </div>

      {/* Story Illustration & Character Chips */}
      <div className="my-2 p-3 bg-amber-50/80 rounded-2xl border border-amber-200/80 space-y-2">
        {page.storyCharacters && page.storyCharacters.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-black uppercase text-amber-800">Characters:</span>
            {page.storyCharacters.map((char, cIdx) => (
              <span key={cIdx} className="px-2 py-0.5 bg-white text-amber-900 text-[10px] font-bold rounded-md border border-amber-200">
                {char}
              </span>
            ))}
          </div>
        )}

        {/* Story Body */}
        <p className="text-sm font-medium text-slate-800 leading-relaxed italic p-2 bg-white/80 rounded-xl">
          "{page.storyText || page.description || 'Once upon a time, there was a curious friend who loved to explore and learn new things every day.'}"
        </p>
      </div>

      {/* Learning Moral Message */}
      <div className="my-2 p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
        <div className="flex items-center gap-1.5 text-xs font-black text-indigo-700 uppercase tracking-wider mb-1">
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span>Moral &amp; Learning Message</span>
        </div>
        <p className="text-xs font-bold text-slate-800">
          {page.learningMessage || 'Kindness, curious exploration, and practicing every day makes us super smart!'}
        </p>
      </div>

      {/* Interactive Activity */}
      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
        <p className="text-[11px] font-extrabold text-slate-700 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{page.activity || 'Tell this story in your own words to your parent or teacher!'}</span>
        </p>
      </div>
    </div>
  );
};
