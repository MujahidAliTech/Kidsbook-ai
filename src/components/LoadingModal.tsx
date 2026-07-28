import React, { useEffect, useState } from 'react';
import { Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface LoadingModalProps {
  isOpen: boolean;
  categoryName?: string;
}

const STEPS = [
  { message: 'Preparing pages & learning themes...', icon: Sparkles },
  { message: 'Creating fun learning activities...', icon: BookOpen },
  { message: 'Generating educational tracing & guides...', icon: Layers },
  { message: 'Building high-resolution A4 printable workbook...', icon: CheckCircle2 },
  { message: 'Almost done! Finalizing book layout...', icon: Sparkles },
];

export const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, categoryName }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(10);
      return;
    }

    // Step cycle
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1200);

    // Smooth progress bar fill
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return 92;
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 250);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const ActiveIcon = STEPS[currentStep].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-slate-100 dark:border-slate-800 shadow-2xl text-center relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Animated Icon Avatar */}
        <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping opacity-75" />
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-sky-400 text-white flex items-center justify-center shadow-xl relative z-10">
            <ActiveIcon className="w-10 h-10 animate-pulse" />
          </div>
        </div>

        {/* Main Status Heading */}
        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Generating Your Book
        </h3>
        {categoryName && (
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1 uppercase tracking-wider">
            {categoryName}
          </p>
        )}

        {/* Step Message */}
        <div className="mt-4 min-h-[40px] flex items-center justify-center">
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300 transition-all">
            {STEPS[currentStep].message}
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 dark:text-slate-400">
            <span>Progress</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-black">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
            <div
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-400 h-full rounded-full transition-all duration-300 ease-out shadow-xs"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Reassuring Footnote */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-6 font-medium">
          ✨ Powered by KidsBook AI • Crafting high-quality printable vector layouts
        </p>
      </div>
    </div>
  );
};
