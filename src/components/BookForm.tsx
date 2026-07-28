import React, { useState } from 'react';
import { BookConfig, Category, Language, AgeGroup, BookStyle } from '../types';
import { Sparkles, BookOpen, Layers, Globe, User, Check, Grid, Type, Sliders, Layout, Calendar, HeartHandshake } from 'lucide-react';

interface Props {
  onGenerate: (config: BookConfig) => void;
  isGenerating: boolean;
}

export const BookForm: React.FC<Props> = ({ onGenerate, isGenerating }) => {
  const [category, setCategory] = useState<Category>('alphabet');
  const [customTopic, setCustomTopic] = useState('');
  const [language, setLanguage] = useState<Language>('english');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('3-4');
  const [style, setStyle] = useState<BookStyle>('learning');
  const [pageCount, setPageCount] = useState<number>(10);
  const [isCustomPageCount, setIsCustomPageCount] = useState(false);
  const [includeCover, setIncludeCover] = useState(true);
  const [includeGuide, setIncludeGuide] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [childName, setChildName] = useState('');

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    if (cat === 'numbers1-10') setPageCount(10);
    else if (cat === 'numbers1-20') setPageCount(20);
    else if (cat === 'alphabet') setPageCount(10);
    else if (cat === 'urdu-alphabet') setPageCount(10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPageCount = Math.min(Math.max(pageCount || 5, 1), 50);

    onGenerate({
      category,
      customTopic: category === 'custom' ? customTopic : undefined,
      language,
      ageGroup,
      style,
      pageCount: finalPageCount,
      includeCover,
      includeGuide,
      customTitle,
      childName
    });
  };

  return (
    <form
      id="generator-form"
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800 space-y-8 scroll-mt-24 transition-colors"
    >
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-black rounded-full border border-indigo-200 dark:border-indigo-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Interactive Book Builder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Configure Your Learning Workbook
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
            Tailor age-appropriate worksheets, tracing paths, and illustrations in 6 easy steps.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-indigo-50/50 dark:bg-indigo-950/50 p-2.5 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 text-xs font-bold text-indigo-900 dark:text-indigo-200">
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>A4 High-Res PDF Ready</span>
        </div>
      </div>

      {/* 1. Category Selector Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Grid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>1. Choose Book Category</span>
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">10 Options</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { id: 'alphabet', label: 'English Alphabet', icon: '🔤', desc: 'A to Z Tracing & Words' },
            { id: 'urdu-alphabet', label: 'Urdu Alphabet', icon: '🇵🇰', desc: 'ا سے ی اردو قاعدہ' },
            { id: 'numbers1-10', label: 'Numbers 1–10', icon: '🔢', desc: 'Counting & Tracing' },
            { id: 'numbers1-20', label: 'Numbers 1–20', icon: '🔟', desc: 'Advanced Practice' },
            { id: 'animals', label: 'Animals', icon: '🦁', desc: 'Wild & Farm Animals' },
            { id: 'fruits', label: 'Fruits', icon: '🍎', desc: 'Healthy Fruit Names' },
            { id: 'vegetables', label: 'Vegetables', icon: '🥕', desc: 'Fresh Veggies' },
            { id: 'shapes', label: 'Shapes', icon: '⭐', desc: 'Geometry & Tracing' },
            { id: 'colors', label: 'Colors', icon: '🎨', desc: 'Vibrant World' },
            { id: 'custom', label: 'Custom AI Topic', icon: '✨', desc: 'Space, Dinosaurs, etc.' }
          ].map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id as Category)}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between h-32 relative overflow-hidden group cursor-pointer ${
                category === cat.id
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/90 text-indigo-950 dark:text-white shadow-md ring-2 ring-indigo-500/20 transform -translate-y-0.5'
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-3xl transform group-hover:scale-110 transition-transform">{cat.icon}</span>
                {category === cat.id && (
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shadow-xs">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div>
                <span className="font-extrabold text-xs block leading-tight text-slate-900 dark:text-white">{cat.label}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block mt-0.5 line-clamp-1">{cat.desc}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Topic Input */}
        {category === 'custom' && (
          <div className="mt-3 p-4 bg-indigo-50/80 dark:bg-indigo-950/60 rounded-2xl border border-indigo-200 dark:border-indigo-800 animate-in fade-in duration-150">
            <label className="block text-xs font-extrabold text-indigo-900 dark:text-indigo-200 mb-1.5">
              Specify Custom Topic (e.g. Space Exploration, Dinosaurs, Vehicles, Good Manners)
            </label>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g. Vehicles, Space Exploration, Dinosaurs..."
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white shadow-xs"
              required
            />
            <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium mt-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Gemini AI will generate custom vocabulary, tracing lines, and coloring activities for this topic.</span>
            </p>
          </div>
        )}
      </div>

      {/* 2. Select Language */}
      <div className="space-y-3">
        <label className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>2. Select Language</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'english', label: 'English', desc: 'English headings & vocabulary' },
            { id: 'urdu', label: 'Urdu (اردو قاعدہ)', desc: 'RTL layout with Noto Nastaliq Urdu text' },
            { id: 'bilingual', label: 'Bilingual (English + Urdu)', desc: 'Side-by-side translation worksheets' }
          ].map((lang) => (
            <button
              type="button"
              key={lang.id}
              onClick={() => setLanguage(lang.id as Language)}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                language === lang.id
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/90 text-indigo-950 dark:text-white font-bold shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="font-extrabold text-sm block">{lang.label}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{lang.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Select Age Group */}
      <div className="space-y-3">
        <label className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>3. Select Target Age Group</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { id: '2-3', label: '2–3 Years', note: 'Extra large fonts & simple graphics' },
            { id: '3-4', label: '3–4 Years', note: 'Large tracing & easy word association' },
            { id: '4-5', label: '4–5 Years', note: 'Balanced tracing & counting practice' },
            { id: '5-6', label: '5–6 Years', note: 'Writing, spelling & matching activities' },
            { id: '6-7', label: '6–7 Years', note: 'Full sentences & math exercises' }
          ].map((age) => (
            <button
              type="button"
              key={age.id}
              onClick={() => setAgeGroup(age.id as AgeGroup)}
              className={`p-3 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer ${
                ageGroup === age.id
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/90 text-indigo-950 dark:text-white font-extrabold shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="text-sm font-black block">{age.label}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block mt-1 leading-tight">
                {age.note}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Select Book Style */}
      <div className="space-y-3">
        <label className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>4. Select Book Style</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {[
            { id: 'learning', label: 'Learning Book', icon: '📖' },
            { id: 'tracing', label: 'Tracing Book', icon: '✏️' },
            { id: 'coloring', label: 'Coloring Book', icon: '🎨' },
            { id: 'activity', label: 'Activity Book', icon: '🧩' },
            { id: 'flashcard', label: 'Flashcard Style', icon: '🃏' },
            { id: 'mixed', label: 'Mixed Learning', icon: '🌈' }
          ].map((s) => (
            <button
              type="button"
              key={s.id}
              onClick={() => setStyle(s.id as BookStyle)}
              className={`p-3.5 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer ${
                style === s.id
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/90 text-indigo-950 dark:text-white font-extrabold shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="text-2xl block mb-1">{s.icon}</span>
              <span className="text-xs font-bold block">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Number of Pages */}
      <div className="space-y-3">
        <label className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center justify-between">
          <span>5. Number of Pages</span>
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
            Current: {pageCount} Pages
          </span>
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {[5, 10, 15, 20, 26].map((num) => (
            <button
              type="button"
              key={num}
              onClick={() => {
                setPageCount(num);
                setIsCustomPageCount(false);
              }}
              className={`px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all border cursor-pointer ${
                !isCustomPageCount && pageCount === num
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {num} Pages {num === 26 ? '(Full A–Z)' : ''}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setIsCustomPageCount(true)}
            className={`px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all border cursor-pointer ${
              isCustomPageCount
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Custom Count
          </button>
        </div>

        {isCustomPageCount && (
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Enter page count (1–50):</span>
            <input
              type="number"
              min={1}
              max={50}
              value={pageCount}
              onChange={(e) => setPageCount(parseInt(e.target.value) || 5)}
              className="w-24 px-3 py-2 border-2 border-indigo-300 dark:border-indigo-700 rounded-xl font-mono font-bold text-sm text-center text-slate-900 dark:text-white dark:bg-slate-900"
            />
          </div>
        )}
      </div>

      {/* 6. Page Options & Personalization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        {/* Checkboxes */}
        <div className="space-y-3">
          <label className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider block">
            Layout Inclusions
          </label>
          <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer select-none bg-white dark:bg-slate-800/50 transition-all">
            <input
              type="checkbox"
              checked={includeCover}
              onChange={(e) => setIncludeCover(e.target.checked)}
              className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white block">Include Cover Page</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Adds book title, child name badge &amp; hero graphic</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer select-none bg-white dark:bg-slate-800/50 transition-all">
            <input
              type="checkbox"
              checked={includeGuide}
              onChange={(e) => setIncludeGuide(e.target.checked)}
              className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white block">Include Parent/Teacher Guide</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Includes learning goals &amp; progress tracker sheet</span>
            </div>
          </label>
        </div>

        {/* Custom Text inputs */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider block mb-1">
              Custom Book Title (Optional)
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="e.g. My First Alphabet Book"
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white dark:bg-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider block mb-1">
              Child's Name (Optional)
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="e.g. Ali, Sarah, Bilal..."
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white dark:bg-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Generate CTA Button */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 hover:from-indigo-500 hover:to-indigo-800 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {isGenerating ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating Printable Workbook...</span>
            </>
          ) : (
            <>
              <BookOpen className="w-6 h-6 text-amber-300 shrink-0" />
              <span>Generate Printable Book Now</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
