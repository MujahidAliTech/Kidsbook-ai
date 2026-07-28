import React from 'react';
import { BookOpen, Sparkles, Printer, Globe, ShieldCheck, Heart, Layers, CheckCircle2 } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "English & Urdu Support",
      description: "Complete English Alphabets (A–Z) and Urdu Haroof-e-Tahajji (آ–ے) with proper RTL layout, Nastaliq font, and phonetic guides."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: "Custom AI Topic Generator",
      description: "Type any custom topic like Space, Dinosaurs, or Good Habits, and Gemini AI creates tailored multi-page worksheets instantly."
    },
    {
      icon: <Printer className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Pure A4 Print & PDF Ready",
      description: "Designed specifically for standard A4 printer paper with exact margins, cutlines, and crisp high-resolution typography."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
      title: "Early Learning Categories",
      description: "Numbers (1–10 & 1–20), Animals, Fruits, Vegetables, Colors, and Shapes with tracing lines and coloring objects."
    },
    {
      icon: <Layers className="w-6 h-6 text-rose-500" />,
      title: "6 Unique Learning Styles",
      description: "Choose between Learning, Tracing, Coloring, Activity, Flashcard, or Mixed workbooks tailored to age 2–7 years."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "100% Free & Browser Saved",
      description: "No account registration or paid subscriptions. All your created books save automatically in your browser's local library."
    }
  ];

  return (
    <section className="py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold rounded-full border border-indigo-200 dark:border-indigo-800 mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Built for Parents, Teachers & Educators</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Everything You Need for Early Childhood Learning
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
          Create engaging, structured printable workbooks for home practice, preschools, primary schools, or tuition centers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 flex items-center justify-center mb-4">
              {feat.icon}
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
              {feat.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {feat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
