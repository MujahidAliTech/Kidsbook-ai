import React from 'react';
import { Sparkles, Printer, FileText, Type, Palette, Puzzle, Download, Globe, Heart } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: "AI Book Generator",
      description: "Generates structured multi-page learning books with word associations and tracing guidelines in under 10 seconds."
    },
    {
      icon: <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Printable Worksheets",
      description: "Optimized for standard A4 printer paper with exact margins, cutting guides, and high-contrast vector illustrations."
    },
    {
      icon: <Type className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Alphabet Books",
      description: "Full English A–Z and Urdu Haroof-e-Tahajji (ا سے ی) with phonetics, vocabulary words, and picture cards."
    },
    {
      icon: <Type className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      title: "Tracing Pages",
      description: "Dotted letter tracing lines, number path practice, and stroke direction indicators for early handwriting."
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: "Coloring Books",
      description: "Crisp black-and-white line illustrations for coloring animals, fruits, vegetables, shapes, and custom topics."
    },
    {
      icon: <Puzzle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Activity Sheets",
      description: "Interactive matching games, counting exercises, fill-in-the-blanks, and child-focused puzzle challenges."
    },
    {
      icon: <Download className="w-6 h-6 text-rose-500" />,
      title: "PDF Export",
      description: "One-click high-resolution PDF download with cover page, table of contents, and running page numbers."
    },
    {
      icon: <Globe className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
      title: "Urdu + English",
      description: "Seamless English, Urdu (قاعدہ) Nastaliq script, and Bilingual side-by-side mode for bilingual learners."
    }
  ];

  return (
    <section className="py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-black rounded-full border border-indigo-200 dark:border-indigo-800 mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Built for Parents, Teachers &amp; Schools</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Everything You Need for Early Childhood Learning
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed font-medium">
          Create engaging, structured printable workbooks for home practice, preschools, or primary tuition centers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 flex items-center justify-center mb-4 shadow-xs">
                {feat.icon}
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-1.5">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {feat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
