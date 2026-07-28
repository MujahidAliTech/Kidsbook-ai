import React from 'react';
import { MousePointerClick, Sliders, Printer, ArrowRight } from 'lucide-react';

interface Props {
  onCreateClick?: () => void;
}

export const HowItWorksSection: React.FC<Props> = ({ onCreateClick }) => {
  const steps = [
    {
      number: "01",
      icon: <MousePointerClick className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Select Category & Age",
      description: "Choose from English Alphabet, Urdu Haroof, Numbers 1–20, Animals, Fruits, or type any Custom AI topic."
    },
    {
      number: "02",
      icon: <Sliders className="w-6 h-6 text-amber-500" />,
      title: "Customize Worksheets",
      description: "Pick language, style (Tracing, Coloring, Learning), page count, and add your child's or student's name."
    },
    {
      number: "03",
      icon: <Printer className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Print or Save as PDF",
      description: "Instantly view your generated A4 workbook and click Print or Save PDF to start learning immediately!"
    }
  ];

  return (
    <section className="py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <span className="text-xs font-black tracking-wider uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-3 text-white tracking-tight">
            How KidsBook AI Works
          </h2>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            No design skills needed. In less than 30 seconds, get professional, high-resolution learning workbooks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 relative z-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white text-slate-900 flex items-center justify-center font-bold">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-indigo-300/60 font-mono">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {onCreateClick && (
          <div className="mt-8 text-center relative z-10">
            <button
              onClick={onCreateClick}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 group"
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
