import React, { useState } from 'react';
import { BookConfig, Category, Language, AgeGroup, BookStyle } from '../types';
import { Sparkles, BookOpen, Layers, Globe, User, Type, Check, HelpCircle } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-100 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-extrabold rounded-full border border-indigo-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Easy 6-Step Book Generator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Create a Learning Book
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Customize options below to generate a printable PDF-ready book for your child or classroom.
        </p>
      </div>

      {/* 1. Select Category */}
      <div className="space-y-3">
        <label className="block text-sm font-extrabold text-slate-900 tracking-wide uppercase text-indigo-950">
          1. Select Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { id: 'alphabet', label: 'English Alphabet', icon: '🔤', desc: 'A to Z' },
            { id: 'numbers1-10', label: 'Numbers 1–10', icon: '🔢', desc: 'Early Counting' },
            { id: 'numbers1-20', label: 'Numbers 1–20', icon: '🔟', desc: 'Extended Practice' },
            { id: 'urdu-alphabet', label: 'Urdu Alphabet', icon: '🇵🇰', desc: 'ا سے ی قاعدہ' },
            { id: 'animals', label: 'Animals', icon: '🦁', desc: 'Wild & Farm' },
            { id: 'fruits', label: 'Fruits', icon: '🍎', desc: 'Healthy Treats' },
            { id: 'vegetables', label: 'Vegetables', icon: '🥕', desc: 'Fresh Veggies' },
            { id: 'colors', label: 'Colors', icon: '🎨', desc: 'Vibrant World' },
            { id: 'shapes', label: 'Shapes', icon: '⭐', desc: 'Geometry' },
            { id: 'custom', label: 'Custom Topic', icon: '✨', desc: 'AI Custom' }
          ].map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id as Category)}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between h-28 relative overflow-hidden ${
                category === cat.id
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-xs ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-indigo-300 bg-white text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-2xl">{cat.icon}</span>
                {category === cat.id && (
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>
              <div>
                <span className="font-extrabold text-xs block leading-tight text-slate-900">{cat.label}</span>
                <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{cat.desc}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Topic Input */}
        {category === 'custom' && (
          <div className="mt-3 p-4 bg-indigo-50/80 rounded-2xl border border-indigo-200">
            <label className="block text-xs font-bold text-indigo-900 mb-1">
              Enter Custom Topic Name (e.g. Space, Dinosaurs, Vehicles, Pakistan)
            </label>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g. Vehicles, Space Exploration, Dinosaurs..."
              className="w-full px-4 py-2.5 bg-white border border-indigo-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
              required
            />
            <p className="text-[11px] text-indigo-700 font-medium mt-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Custom topic uses Gemini AI or built-in templates when offline.</span>
            </p>
          </div>
        )}
      </div>

      {/* 2. Select Language */}
      <div className="space-y-3">
        <label className="block text-sm font-extrabold text-slate-900 tracking-wide uppercase text-indigo-950 flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-600" />
          <span>2. Select Language</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'english', label: 'English', desc: 'English titles & instructions' },
            { id: 'urdu', label: 'Urdu (اردو)', desc: 'RTL layout with Urdu text' },
            { id: 'bilingual', label: 'Bilingual (English + Urdu)', desc: 'Side-by-side translation' }
          ].map((lang) => (
            <button
              type="button"
              key={lang.id}
              onClick={() => setLanguage(lang.id as Language)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                language === lang.id
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <span className="font-extrabold text-sm block">{lang.label}</span>
              <span className="text-xs text-slate-500 font-medium">{lang.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Select Age Group */}
      <div className="space-y-3">
        <label className="block text-sm font-extrabold text-slate-900 tracking-wide uppercase text-indigo-950 flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-600" />
          <span>3. Select Age Group</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { id: '2-3', label: '2–3 Years', note: 'Extra large letters, simple picture' },
            { id: '3-4', label: '3–4 Years', note: 'Large tracing & easy words' },
            { id: '4-5', label: '4–5 Years', note: 'Balanced tracing & counting' },
            { id: '5-6', label: '5–6 Years', note: 'Writing & matching activities' },
            { id: '6-7', label: '6–7 Years', note: 'Full sentences & math games' }
          ].map((age) => (
            <button
              type="button"
              key={age.id}
              onClick={() => setAgeGroup(age.id as AgeGroup)}
              className={`p-3 rounded-2xl border-2 text-center transition-all ${
                ageGroup === age.id
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-extrabold shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <span className="text-sm font-black block">{age.label}</span>
              <span className="text-[10px] text-slate-500 font-medium block mt-1 leading-tight">
                {age.note}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Select Book Style */}
      <div className="space-y-3">
        <label className="block text-sm font-extrabold text-slate-900 tracking-wide uppercase text-indigo-950 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
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
              className={`p-3 rounded-2xl border-2 text-center transition-all ${
                style === s.id
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-extrabold shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
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
        <label className="block text-sm font-extrabold text-slate-900 tracking-wide uppercase text-indigo-950">
          5. Number of Pages
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
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                !isCustomPageCount && pageCount === num
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {num} Pages {num === 26 ? '(Full A–Z)' : ''}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setIsCustomPageCount(true)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
              isCustomPageCount
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Custom Number
          </button>
        </div>

        {isCustomPageCount && (
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-bold text-slate-600">Enter custom pages (1–50):</span>
            <input
              type="number"
              min={1}
              max={50}
              value={pageCount}
              onChange={(e) => setPageCount(parseInt(e.target.value) || 5)}
              className="w-24 px-3 py-1.5 border-2 border-indigo-300 rounded-xl font-mono font-bold text-sm text-center text-slate-900"
            />
          </div>
        )}
      </div>

      {/* 6. Page Inclusions & Custom Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
        {/* Checkboxes */}
        <div className="space-y-3">
          <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Page Options
          </label>
          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeCover}
              onChange={(e) => setIncludeCover(e.target.checked)}
              className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 block">Add Cover Page</span>
              <span className="text-xs text-slate-500">Includes title, child name badge & decorative border</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeGuide}
              onChange={(e) => setIncludeGuide(e.target.checked)}
              className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 block">Add Parent/Teacher Guide</span>
              <span className="text-xs text-slate-500">Includes learning objectives & practice chart</span>
            </div>
          </label>
        </div>

        {/* Custom Text inputs */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
              Custom Book Title (Optional)
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="e.g. My First Alphabet Book"
              className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
              Child's Name (Optional)
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="e.g. Ali, Sarah, Bilal..."
              className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Generate CTA Button */}
      <div className="pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-black text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating Printable Book...</span>
            </>
          ) : (
            <>
              <BookOpen className="w-6 h-6 text-amber-300" />
              <span>Generate Book</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
