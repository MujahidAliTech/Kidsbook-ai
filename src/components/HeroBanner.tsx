import React from 'react';
import { Sparkles, Printer, Heart, CheckCircle2, ArrowDown, BookOpen, PlusCircle } from 'lucide-react';

interface Props {
  onCreateClick?: () => void;
  onExploreTemplates?: () => void;
}

export const HeroBanner: React.FC<Props> = ({ onCreateClick, onExploreTemplates }) => {
  const scrollToForm = () => {
    if (onCreateClick) {
      onCreateClick();
    }
    const formElem = document.getElementById('generator-form');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 mb-10 shadow-xl relative overflow-hidden">
      {/* Decorative Background Glowing Circles */}
      <div className="absolute -top-12 -right-12 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-sky-200 border border-white/20 mb-4">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>For Parents, Teachers & Educators • Ages 2–7 Years</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Create & Print Custom Learning Workbooks in Seconds
        </h1>

        <p className="mt-4 text-indigo-100 text-base sm:text-lg font-normal max-w-2xl leading-relaxed">
          Generate tailored educational worksheets for <strong className="text-white font-bold">English & Urdu Alphabets</strong>, <strong className="text-white font-bold">Numbers 1–20</strong>, <strong className="text-white font-bold">Animals, Fruits</strong>, or <strong className="text-white font-bold">Custom AI Topics</strong>. Print instantly on standard A4 paper!
        </p>

        {/* Major Prominent Call To Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={scrollToForm}
            className="px-7 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 group transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-5 h-5 text-slate-950" />
            <span>Create Book Now</span>
            <ArrowDown className="w-4 h-4 text-slate-950 group-hover:translate-y-1 transition-transform" />
          </button>

          {onExploreTemplates && (
            <button
              onClick={onExploreTemplates}
              className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm rounded-2xl border border-white/20 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Explore Pre-Made Templates</span>
            </button>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-xs font-semibold text-indigo-200">
          <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>A4 PDF Print-Ready</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
            <Printer className="w-4 h-4 text-amber-300" />
            <span>English & Urdu (اردو) Support</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>100% Free & Saved in Browser</span>
          </div>
        </div>
      </div>
    </div>
  );
};
