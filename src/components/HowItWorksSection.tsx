import React from 'react';
import { Grid, Sliders, Sparkles, Printer, ArrowRight } from 'lucide-react';

interface Props {
  onCreateClick?: () => void;
}

export const HowItWorksSection: React.FC<Props> = ({ onCreateClick }) => {
  const steps = [
    {
      step: "Step 1",
      icon: <Grid className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Choose Category",
      description: "Select from English Alphabet, Urdu (قاعدہ), Numbers 1–20, Animals, Fruits, Vegetables, or Custom AI topics."
    },
    {
      step: "Step 2",
      icon: <Sliders className="w-6 h-6 text-amber-500" />,
      title: "Customize Book",
      description: "Choose language, age group (2–7 yrs), book style (Tracing, Coloring, Learning), custom title, and child's name."
    },
    {
      step: "Step 3",
      icon: <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: "Generate",
      description: "KidsBook AI automatically creates educational tracing exercises, word associations, and A4 print-ready worksheets."
    },
    {
      step: "Step 4",
      icon: <Printer className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Print",
      description: "Directly print or download crisp vector PDF files to share with children at home or students in class."
    }
  ];

  return (
    <section className="py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <span className="text-xs font-black tracking-wider uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Easy 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-3 text-white tracking-tight">
            How KidsBook AI Works
          </h2>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Create high-resolution educational workbooks for home or classroom in less than 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 relative z-10">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl flex flex-col justify-between hover:bg-white/15 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-slate-900 flex items-center justify-center font-bold shadow-md">
                    {s.icon}
                  </div>
                  <span className="text-xs font-black text-amber-300 bg-white/10 px-2 py-0.5 rounded-md uppercase font-mono">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-base font-black text-white mb-1.5">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {onCreateClick && (
          <div className="mt-8 text-center relative z-10">
            <button
              onClick={onCreateClick}
              className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-sm rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Start Creating Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
