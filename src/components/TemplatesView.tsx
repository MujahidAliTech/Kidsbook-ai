import React from 'react';
import { FEATURED_TEMPLATES, BookTemplate } from '../data/templates';
import { BookConfig } from '../types';
import { Sparkles, ArrowRight, Printer, BookOpen } from 'lucide-react';

interface Props {
  onSelectTemplate: (config: BookConfig) => void;
}

export const TemplatesView: React.FC<Props> = ({ onSelectTemplate }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full border border-amber-200 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Instant 1-Click Printable Templates</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Featured Learning Book Templates
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-2xl">
          Choose a pre-designed educational mini-book crafted by teachers. Click any card to load, customize, or print directly!
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => onSelectTemplate(tpl.config)}
            className="bg-white rounded-3xl p-6 border-2 border-slate-200/80 hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${tpl.badgeColor}`}>
                  {tpl.ageBadge}
                </span>
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  {tpl.categoryName}
                </span>
              </div>

              {/* Cover Emoji Badge */}
              <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition-transform">
                {tpl.coverEmoji}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                {tpl.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                {tpl.subtitle}
              </p>
            </div>

            {/* Footer CTA */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>{tpl.config.pageCount} Printable Pages</span>
              </span>
              <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-extrabold">
                <span>Load Book</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
