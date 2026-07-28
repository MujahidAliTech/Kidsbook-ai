import React from 'react';
import { BookOpen, Heart, Printer, Sparkles, Sun, Moon } from 'lucide-react';

interface Props {
  onSelectCategory?: (category: string) => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

export const Footer: React.FC<Props> = ({ onSelectCategory, isDarkMode, toggleDarkMode }) => {
  return (
    <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100 dark:border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 text-white flex items-center justify-center font-bold shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">KidsBook AI</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              AI-powered printable learning books & educational worksheets for kids (Ages 2–7). Tailored for parents, teachers, and homeschooling educators.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold rounded-lg text-[11px] border border-emerald-200 dark:border-emerald-800">
              <Printer className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Standard A4 Print & PDF Ready</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Popular Topics
            </h4>
            <ul className="space-y-2">
              {[
                { label: "English Alphabet (A–Z)", cat: "alphabet" },
                { label: "Urdu Alphabet (آ–ے)", cat: "urdu-alphabet" },
                { label: "Numbers 1–10 Counting", cat: "numbers1-10" },
                { label: "Numbers 1–20 Practice", cat: "numbers1-20" },
                { label: "Animals & Jungle Friends", cat: "animals" },
                { label: "Fruits & Vegetables", cat: "fruits" }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onSelectCategory && onSelectCategory(item.cat)}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Features */}
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Workbook Styles
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>Tracing & Line Practice</li>
              <li>Coloring & Drawing Pages</li>
              <li>Interactive Matching Games</li>
              <li>Flashcard Cutout Sheets</li>
              <li>Parent & Teacher Guides</li>
              <li>Custom AI Prompt Worksheets</li>
            </ul>
          </div>

          {/* About & Mode Toggle */}
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              For Educators
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Designed to help early childhood educators save hours preparing classroom materials with instant A4 PDF export.
            </p>
            {toggleDarkMode && (
              <button
                onClick={toggleDarkMode}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-2 font-extrabold text-xs"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} KidsBook AI. All rights reserved. Built for parents & teachers.
          </p>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Kids Learning</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
