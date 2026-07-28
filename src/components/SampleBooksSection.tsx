import React from 'react';
import { BookConfig } from '../types';
import { Sparkles, Printer, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  onSelectSample: (config: BookConfig) => void;
}

export const SampleBooksSection: React.FC<Props> = ({ onSelectSample }) => {
  const samples: {
    title: string;
    subtitle: string;
    icon: string;
    badge: string;
    badgeColor: string;
    config: BookConfig;
  }[] = [
    {
      title: "English Alphabet A–Z",
      subtitle: "Full 26-letter tracing workbook with phonetics & vocabulary words.",
      icon: "🔤",
      badge: "Popular (Ages 3–5)",
      badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/80 dark:text-indigo-300",
      config: {
        category: 'alphabet',
        language: 'english',
        ageGroup: '3-4',
        style: 'tracing',
        pageCount: 10,
        includeCover: true,
        includeGuide: true,
        customTitle: 'My English Alphabet Book',
        childName: ''
      }
    },
    {
      title: "Urdu Haroof-e-Tahajji (اردو حروفِ تہجی)",
      subtitle: "Complete Urdu alphabet قاعدہ with Nastaliq font & RTL alignment.",
      icon: "🇵🇰",
      badge: "Urdu Qaida (آ–ے)",
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-300",
      config: {
        category: 'urdu-alphabet',
        language: 'urdu',
        ageGroup: '3-4',
        style: 'learning',
        pageCount: 10,
        includeCover: true,
        includeGuide: true,
        customTitle: 'آسان اردو قاعدہ',
        childName: ''
      }
    },
    {
      title: "Numbers 1–10 Counting",
      subtitle: "Dot counting, digit tracing, and quantity recognition for toddlers.",
      icon: "🔢",
      badge: "Math Practice",
      badgeColor: "bg-amber-100 text-amber-900 dark:bg-amber-900/80 dark:text-amber-300",
      config: {
        category: 'numbers1-10',
        language: 'english',
        ageGroup: '2-3',
        style: 'learning',
        pageCount: 10,
        includeCover: true,
        includeGuide: false,
        customTitle: 'My First Numbers 1 to 10',
        childName: ''
      }
    },
    {
      title: "Animals & Jungle Friends",
      subtitle: "Fun animal facts, tracing, coloring, and vocabulary worksheets.",
      icon: "🦁",
      badge: "Coloring & Tracing",
      badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/80 dark:text-rose-300",
      config: {
        category: 'animals',
        language: 'english',
        ageGroup: '4-5',
        style: 'coloring',
        pageCount: 8,
        includeCover: true,
        includeGuide: false,
        customTitle: 'Wild Animals Activity Book',
        childName: ''
      }
    },
    {
      title: "Healthy Fruits & Vegetables",
      subtitle: "Bilingual English & Urdu fruit names with fun learning activities.",
      icon: "🍎",
      badge: "Bilingual (English + Urdu)",
      badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/80 dark:text-purple-300",
      config: {
        category: 'fruits',
        language: 'bilingual',
        ageGroup: '3-4',
        style: 'mixed',
        pageCount: 8,
        includeCover: true,
        includeGuide: false,
        customTitle: 'Fruits & Veggies Learning Book',
        childName: ''
      }
    },
    {
      title: "Space & Planets AI Special",
      subtitle: "Custom AI-generated astronomy workbook for young curious minds.",
      icon: "🚀",
      badge: "AI Powered",
      badgeColor: "bg-sky-100 text-sky-800 dark:bg-sky-900/80 dark:text-sky-300",
      config: {
        category: 'custom',
        customTopic: 'Space & Planets',
        language: 'english',
        ageGroup: '5-6',
        style: 'learning',
        pageCount: 8,
        includeCover: true,
        includeGuide: true,
        customTitle: 'Little Astronaut Space Explorer',
        childName: ''
      }
    }
  ];

  return (
    <section className="py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-extrabold rounded-full border border-amber-200 dark:border-amber-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Pre-Made Sample Workbooks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Popular Learning Templates
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Click any template below to generate and preview a ready-to-print book immediately.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {samples.map((sample, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{sample.icon}</span>
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${sample.badgeColor}`}>
                  {sample.badge}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {sample.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {sample.subtitle}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Printer className="w-3.5 h-3.5 text-emerald-500" />
                <span>A4 Ready</span>
              </span>
              <button
                onClick={() => onSelectSample(sample.config)}
                className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-600 hover:text-white text-indigo-700 dark:text-indigo-300 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>Generate & Preview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
