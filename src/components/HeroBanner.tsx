import React from 'react';
import { Sparkles, Printer, Heart, CheckCircle2, ArrowDown, BookOpen, PlusCircle, Layers, Palette } from 'lucide-react';

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
    <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 mb-10 shadow-2xl relative overflow-hidden border border-indigo-800/40">
      {/* Background Decorative Lighting */}
      <div className="absolute -top-16 -right-16 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Headline & Action Buttons */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-black text-amber-300 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>AI-Powered Kids Educational Publisher</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            Create Beautiful Printable Learning Books with AI
          </h1>

          <p className="text-indigo-100 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
            Create educational books in seconds for children aged 2–7 years. Tailored worksheets for <strong className="text-amber-300">English &amp; Urdu Alphabets</strong>, <strong className="text-amber-300">Numbers 1–20</strong>, or <strong className="text-amber-300">Custom Topics</strong>.
          </p>

          {/* Primary & Secondary Call To Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToForm}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 group transform hover:-translate-y-0.5 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5 text-slate-950" />
              <span>Create Book</span>
              <ArrowDown className="w-4 h-4 text-slate-950 group-hover:translate-y-1 transition-transform" />
            </button>

            {onExploreTemplates && (
              <button
                onClick={onExploreTemplates}
                className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm rounded-2xl border border-white/20 transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>View Templates</span>
              </button>
            )}
          </div>

          {/* Key Feature Highlights */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3 text-xs font-semibold text-indigo-200">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Vector A4 PDF Output</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Urdu (قاعدہ) &amp; English</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Instant Offline Generation</span>
            </div>
          </div>
        </div>

        {/* Right Column: Friendly Educational Visual Mockup Illustration */}
        <div className="lg:col-span-5 hidden sm:flex justify-center">
          <div className="relative w-full max-w-sm bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Top Badge */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[10px] font-mono font-black text-indigo-200 uppercase bg-white/10 px-2 py-0.5 rounded-md">
                Interactive A4 Preview
              </span>
            </div>

            {/* Illustration Canvas Card */}
            <div className="bg-white text-slate-900 rounded-2xl p-5 shadow-inner space-y-4 text-center">
              <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-800 font-black text-xs rounded-full">
                My First Alphabet Book
              </div>

              {/* Central Cute Graphic */}
              <div className="py-4 bg-gradient-to-b from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100 flex flex-col items-center justify-center space-y-2">
                <span className="text-6xl animate-bounce">🍎</span>
                <span className="text-3xl font-black text-indigo-900 tracking-tight">A is for Apple</span>
                <span className="text-xs text-slate-500 font-extrabold uppercase tracking-widest">A a A a A a</span>
              </div>

              {/* Mock Tracing Guidelines */}
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-2.5 font-mono text-xs text-slate-400 tracking-widest bg-slate-50/80">
                A A A A A A A
              </div>
            </div>

            {/* Floating Badges around mockup */}
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-1.5">
              <Palette className="w-4 h-4" />
              <span>Coloring &amp; Tracing</span>
            </div>

            <div className="absolute -top-3 -right-3 bg-indigo-600 text-white font-black text-xs px-3.5 py-1.5 rounded-2xl shadow-xl flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-300" />
              <span>100% Free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
