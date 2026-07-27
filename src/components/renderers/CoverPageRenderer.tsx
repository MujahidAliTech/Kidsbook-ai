import React from 'react';
import { Book } from '../../types';
import { Sparkles, Award, Heart, Star } from 'lucide-react';

interface Props {
  book: Book;
}

export const CoverPageRenderer: React.FC<Props> = ({ book }) => {
  const childName = book.config.childName?.trim();
  const isUrdu = book.language === 'urdu';

  return (
    <div
      className={`w-full h-full p-8 bg-gradient-to-b from-amber-50/60 via-white to-sky-50/60 border-[8px] border-double border-indigo-200 rounded-xl flex flex-col justify-between items-center text-center relative overflow-hidden ${
        isUrdu ? 'rtl font-urdu' : ''
      }`}
    >
      {/* Corner Decorative Elements */}
      <div className="absolute top-4 left-4 text-amber-400 opacity-60">
        <Star className="w-8 h-8 fill-amber-300" />
      </div>
      <div className="absolute top-4 right-4 text-sky-400 opacity-60">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute bottom-4 left-4 text-rose-400 opacity-60">
        <Heart className="w-8 h-8 fill-rose-200" />
      </div>
      <div className="absolute bottom-4 right-4 text-emerald-400 opacity-60">
        <Award className="w-8 h-8" />
      </div>

      {/* Top Header Badge */}
      <div className="pt-6 w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-800 rounded-full font-bold text-sm tracking-wide border border-indigo-200 shadow-xs">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>KidsBook AI Printable Mini-Book</span>
        </div>

        {childName && (
          <div className="mt-6 px-6 py-2 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 text-amber-900 rounded-2xl border-2 border-amber-300 shadow-xs">
            <p className="text-xs uppercase tracking-widest font-semibold text-amber-700">
              {isUrdu ? 'خاص طور پر تیار کردہ برائے:' : 'SPECIALLY CREATED FOR'}
            </p>
            <h2 className="text-2xl font-black text-amber-900 mt-0.5">{childName}</h2>
          </div>
        )}
      </div>

      {/* Main Title & Cover Graphic */}
      <div className="my-8 flex flex-col items-center max-w-lg">
        {/* Large Central Illustration */}
        <div className="w-40 h-40 rounded-full bg-white border-4 border-dashed border-indigo-300 flex items-center justify-center text-7xl shadow-md my-4 transform hover:scale-105 transition-transform">
          {getCoverEmoji(book.categoryKey)}
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mt-4 text-indigo-950">
          {book.title}
        </h1>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <span className="px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-lg border border-sky-200">
            {book.category}
          </span>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
            Age {book.ageGroup} Years
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-lg border border-purple-200 capitalize">
            {book.style} Book
          </span>
          {book.language !== 'english' && (
            <span className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-lg border border-rose-200 capitalize">
              {book.language}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="pb-4 w-full border-t border-slate-200 pt-4 flex flex-col items-center text-slate-500 text-xs">
        <p className="font-medium text-slate-700">
          {isUrdu ? 'کڈز بک اے آئی - بچوں کی تعلیمی کتابیں' : 'KidsBook AI — Create. Learn. Print.'}
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          {book.pages.length} Pages • High Quality Printable PDF Layout
        </p>
      </div>
    </div>
  );
};

function getCoverEmoji(category: string): string {
  switch (category) {
    case 'alphabet':
      return '🔤';
    case 'numbers1-10':
    case 'numbers1-20':
      return '🔢';
    case 'urdu-alphabet':
      return '🇵🇰';
    case 'animals':
      return '🦁';
    case 'fruits':
      return '🍎';
    case 'vegetables':
      return '🥕';
    case 'colors':
      return '🎨';
    case 'shapes':
      return '⭐';
    default:
      return '📚';
  }
}
