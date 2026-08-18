import React, { useState, useEffect } from 'react';
import { BookConfig, Category, Language, AgeGroup, BookStyle } from '../types';
import { Sparkles, BookOpen, Layers, Globe, User, Check, Grid, Sliders, ArrowRight } from 'lucide-react';

interface Props {
  onGenerate: (config: BookConfig) => void;
  isGenerating: boolean;
}

const englishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const urduAlphabet = "ابپتٹثجچحخدڈذرڑزژسشصضطظعغفقکگلمنوہءی".split("");
const numbers10 = Array.from({ length: 10 }, (_, i) => String(i + 1));
const numbers20 = Array.from({ length: 20 }, (_, i) => String(i + 1));

export const BookForm: React.FC<Props> = ({ onGenerate, isGenerating }) => {
  const [style, setStyle] = useState<BookStyle>('learning');
  const [language, setLanguage] = useState<Language>('english');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('3-4');
  const [category, setCategory] = useState<Category>('alphabet');
  const [customTopic, setCustomTopic] = useState('');
  
  // Range states
  const [startRange, setStartRange] = useState('A');
  const [endRange, setEndRange] = useState('Z');
  const [pageCount, setPageCount] = useState<number>(26);
  const [isCustomPageCount, setIsCustomPageCount] = useState(false);

  // Inclusions & personalization
  const [includeCover, setIncludeCover] = useState(true);
  const [includeGuide, setIncludeGuide] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [childName, setChildName] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [learningGoal, setLearningGoal] = useState('');

  const getRangeOptions = (cat: Category) => {
    if (cat === 'alphabet') return englishAlphabet;
    if (cat === 'urdu-alphabet') return urduAlphabet;
    if (cat === 'numbers1-10') return numbers10;
    if (cat === 'numbers1-20') return numbers20;
    return [];
  };

  // Keep pageCount in sync when ranges change
  useEffect(() => {
    const opts = getRangeOptions(category);
    if (opts.length > 0) {
      const fromIdx = opts.indexOf(startRange);
      const toIdx = opts.indexOf(endRange);
      if (fromIdx !== -1 && toIdx !== -1) {
        const calculated = Math.max(1, toIdx - fromIdx + 1);
        setPageCount(calculated);
      }
    }
  }, [startRange, endRange, category]);

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    const opts = getRangeOptions(cat);
    if (opts.length > 0) {
      setStartRange(opts[0]);
      setEndRange(opts[opts.length - 1]);
    } else {
      setStartRange('');
      setEndRange('');
      setPageCount(10); // Default for non-range collections
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalPageCount = pageCount;
    const opts = getRangeOptions(category);
    
    if (opts.length > 0 && startRange && endRange) {
      const fromIdx = opts.indexOf(startRange);
      const toIdx = opts.indexOf(endRange);
      if (fromIdx !== -1 && toIdx !== -1) {
        // Safe check and swap if start is after end
        if (fromIdx > toIdx) {
          finalPageCount = 1;
        } else {
          finalPageCount = Math.max(1, toIdx - fromIdx + 1);
        }
      }
    }

    onGenerate({
      category,
      customTopic: category === 'custom' ? customTopic : undefined,
      language,
      ageGroup,
      style,
      pageCount: Math.min(Math.max(finalPageCount || 5, 1), 50),
      includeCover,
      includeGuide,
      customTitle,
      childName,
      difficulty,
      learningGoal: learningGoal.trim() || undefined,
      startRange: startRange || undefined,
      endRange: endRange || undefined,
    });
  };

  const rangeOptions = getRangeOptions(category);
  const hasRangeSelection = rangeOptions.length > 0;

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
            <span>Syllabus &amp; Workbook Builder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Configure Your Learning Workbook
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
            Customize educational style, range, language, and topics in a clean sequential flow.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-indigo-50/50 dark:bg-indigo-950/50 p-2.5 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 text-xs font-bold text-indigo-900 dark:text-indigo-200">
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>A4 High-Res PDF Ready</span>
        </div>
      </div>

      {/* STEP 1: Select Book Style */}
      <div className="space-y-3">
        <label className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>1. Select Book Style</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { id: 'learning', label: 'Learning Book', icon: '📖', desc: 'Read & Learn' },
            { id: 'tracing', label: 'Tracing Book', icon: '✏️', desc: 'Line & Word Tracing' },
            { id: 'coloring', label: 'Coloring Book', icon: '🎨', desc: 'Outline Coloring' },
            { id: 'activity', label: 'Activity Book', icon: '🧩', desc: 'Fun Quizzes & Matches' },
            { id: 'flashcard', label: 'Flashcard Style', icon: '🃏', desc: 'Pocket Card Sheets' },
            { id: 'mixed', label: 'Mixed Learning', icon: '🌈', desc: 'All Styles Combined' }
          ].map((s) => (
            <button
              type="button"
              key={s.id}
              onClick={() => setStyle(s.id as BookStyle)}
              className={`p-4 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between min-h-[110px] ${
                style === s.id
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/90 text-indigo-950 dark:text-white font-extrabold shadow-md ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="text-3xl block mb-1.5">{s.icon}</span>
              <div className="space-y-0.5">
                <span className="text-xs font-black block leading-tight">{s.label}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">{s.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 2: Select Language */}
      <div className="space-y-3">
        <label className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>2. Select Language</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'english', label: 'English Only', desc: 'English headings, tracing & phonics' },
            { id: 'urdu', label: 'Urdu Only (اردو قاعدہ)', desc: 'RTL layout with gorgeous Nastaliq text' },
            { id: 'bilingual', label: 'Bilingual (English + Urdu)', desc: 'Double language content and translations' }
          ].map((lang) => (
            <button
              type="button"
              key={lang.id}
              onClick={() => setLanguage(lang.id as Language)}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                language === lang.id
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/90 text-indigo-950 dark:text-white font-bold shadow-md'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="font-extrabold text-sm block">{lang.label}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{lang.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 3: Select Target Age Group */}
      <div className="space-y-3">
        <label className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>3. Select Target Age Group</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { id: '2-3', label: '2–3 Years', note: 'Extra large fonts, primary graphics' },
            { id: '3-4', label: '3–4 Years', note: 'Large tracing & easy word association' },
            { id: '4-5', label: '4–5 Years', note: 'Balanced tracing & basic counting' },
            { id: '5-6', label: '5–6 Years', note: 'Writing guides, quizzes & phonics' },
            { id: '6-7', label: '6–7 Years', note: 'Full sentences & mini math sheets' }
          ].map((age) => (
            <button
              type="button"
              key={age.id}
              onClick={() => setAgeGroup(age.id as AgeGroup)}
              className={`p-3 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer ${
                ageGroup === age.id
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/90 text-indigo-950 dark:text-white font-extrabold shadow-md'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="text-sm font-black block">{age.label}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block mt-1 leading-tight">
                {age.note}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 4: Choose Book Category */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Grid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>4. Choose Book Category</span>
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">10 Options Available</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { id: 'alphabet', label: 'English Alphabet', icon: '🔤', desc: 'A to Z Letters & Concepts' },
            { id: 'urdu-alphabet', label: 'Urdu Alphabet', icon: '🇵🇰', desc: 'ا سے ی حروفِ تہجی' },
            { id: 'numbers1-10', label: 'Numbers 1–10', icon: '🔢', desc: 'Primary Counting' },
            { id: 'numbers1-20', label: 'Numbers 1–20', icon: '🔟', desc: 'Extended Counting' },
            { id: 'animals', label: 'Animals', icon: '🦁', desc: 'Wild & domestic pets' },
            { id: 'fruits', label: 'Fruits', icon: '🍎', desc: 'Healthy fruits dictionary' },
            { id: 'vegetables', label: 'Vegetables', icon: '🥕', desc: 'Fresh veggies tracing' },
            { id: 'shapes', label: 'Shapes', icon: '⭐', desc: 'Basic geometric structures' },
            { id: 'colors', label: 'Colors', icon: '🎨', desc: 'Vibrant colors worksheets' },
            { id: 'custom', label: 'Custom AI Topic', icon: '✨', desc: 'Custom Space, Manners, etc.' }
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
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block mt-0.5 line-clamp-1">{cat.desc}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Topic Input */}
        {category === 'custom' && (
          <div className="mt-3 p-4 bg-indigo-50/80 dark:bg-indigo-950/60 rounded-2xl border border-indigo-200 dark:border-indigo-800 animate-in fade-in duration-150 space-y-3">
            <div>
              <label className="block text-xs font-extrabold text-indigo-900 dark:text-indigo-200 mb-1.5">
                Specify Custom Topic or Select Quick Idea Below
              </label>
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g. Dinosaurs, Solar System, Good Manners..."
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white shadow-xs"
                required
              />
            </div>

            {/* Topic Ideas */}
            <div>
              <span className="text-[11px] font-bold text-indigo-800 dark:text-indigo-300 block mb-1.5">
                Popular Educational Topics:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Dinosaurs 🦕',
                  'Vehicles 🚀',
                  'Solar System 🪐',
                  'Ocean Animals 🐬',
                  'Birds 🦜',
                  'Pakistan 🇵🇰',
                  'Islamic Manners 🌙',
                  'Healthy Food 🥦',
                  'Safety Rules 🚦',
                  'Weather & Seasons 🌧️',
                  'Community Helpers 🧑‍🚒',
                  'Professions 👩‍⚕️'
                ].map((idea) => {
                  const cleanTopic = idea.split(' ')[0];
                  return (
                    <button
                      type="button"
                      key={idea}
                      onClick={() => setCustomTopic(cleanTopic)}
                      className="px-2.5 py-1 bg-white dark:bg-slate-900 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-700 rounded-lg text-xs font-bold text-indigo-900 dark:text-indigo-200 transition-colors cursor-pointer"
                    >
                      {idea}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Gemini AI will craft a complete custom workbook tailored to this topic.</span>
            </p>
          </div>
        )}
      </div>

      {/* STEP 5: Content Range Selection (ABC, 123... kahan sy kahan tak print karna ha) */}
      <div className="space-y-4 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800/80">
        <label className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>5. Page &amp; Print Range Selection</span>
          </span>
          <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
            Total Pages: {pageCount} Sheets
          </span>
        </label>

        {hasRangeSelection ? (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Choose the custom start and end range for your curriculum. Only the specified range will be printed:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Dropdown */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Start Range From:</span>
                <select
                  value={startRange}
                  onChange={(e) => {
                    const newStart = e.target.value;
                    setStartRange(newStart);
                    // Ensure end range is after or equal to start range
                    const startIdx = rangeOptions.indexOf(newStart);
                    const endIdx = rangeOptions.indexOf(endRange);
                    if (startIdx > endIdx) {
                      setEndRange(newStart);
                    }
                  }}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {rangeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt} {category.includes('alphabet') ? `(Letter ${opt})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* End Dropdown */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">End Range To:</span>
                <select
                  value={endRange}
                  onChange={(e) => setEndRange(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {rangeOptions
                    .slice(rangeOptions.indexOf(startRange))
                    .map((opt) => (
                      <option key={opt} value={opt}>
                        {opt} {category.includes('alphabet') ? `(Letter ${opt})` : ''}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/40 text-xs font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
              <span className="text-sm">🎯</span>
              <span>
                Worksheets will cover sequence: <strong className="text-indigo-950 dark:text-indigo-100 font-black">{startRange}</strong> <ArrowRight className="w-3 h-3 inline-block" /> <strong className="text-indigo-950 dark:text-indigo-100 font-black">{endRange}</strong>
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Select or customize the number of worksheets/pages to generate for this topic:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {[5, 10, 15, 20, 30].map((num) => (
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
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {num} Pages
                </button>
              ))}

              <button
                type="button"
                onClick={() => setIsCustomPageCount(true)}
                className={`px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all border cursor-pointer ${
                  isCustomPageCount
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Custom Pages Count
              </button>
            </div>

            {isCustomPageCount && (
              <div className="flex items-center gap-3 pt-2 animate-in slide-in-from-top-1 duration-150">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Enter custom page count (1–50):</span>
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
        )}
      </div>

      {/* STEP 6: Layout Options & Personalization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
        {/* Inclusions Checkboxes */}
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
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Adds book title, child name badge &amp; cover illustration</span>
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
              <span className="text-sm font-extrabold text-slate-900 dark:text-white block">Include Parent Guide</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Includes curriculum objectives and progress trackers</span>
            </div>
          </label>
        </div>

        {/* Custom Text and Difficulty */}
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
              className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white dark:bg-slate-900 outline-none"
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
              className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white dark:bg-slate-900 outline-none"
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
              <span>Generating Printable Workbook (Pages: {pageCount})...</span>
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
