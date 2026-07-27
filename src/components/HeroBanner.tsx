import React from 'react';
import { Sparkles, Printer, Heart, CheckCircle2 } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-sky-200 border border-white/15 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Designed for Children Aged 2–7 Years</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Create Custom Printable Learning Books in Seconds
        </h1>

        <p className="mt-3 text-indigo-100 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
          Generate tailored educational worksheets, tracing workbooks, and coloring mini-books. Print instantly at home or school!
        </p>

        {/* Feature Highlights */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-indigo-200">
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Built-in Educational Libraries</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Pure A4 Print & PDF Output</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>English, Urdu & Bilingual Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};
