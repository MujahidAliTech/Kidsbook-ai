import React from 'react';
import { Book } from '../types';
import { CheckCircle2, Printer, Eye, X, Sparkles, BookOpen } from 'lucide-react';

interface SuccessDialogProps {
  isOpen: boolean;
  book: Book | null;
  onClose: () => void;
  onPreview: () => void;
  onPrint: () => void;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  isOpen,
  book,
  onClose,
  onPreview,
  onPrint,
}) => {
  if (!isOpen || !book) return null;

  const isUrdu = book.language === 'urdu';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden relative">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-white text-emerald-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-black tracking-tight">
            Book Generated Successfully!
          </h3>
          <p className="text-xs text-emerald-100 font-semibold mt-1">
            Your printable educational workbook is ready for preview &amp; printing.
          </p>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700">
              <span className="font-extrabold text-slate-500 dark:text-slate-400 uppercase">Book Title:</span>
              <span className="font-black text-slate-900 dark:text-white text-sm">{book.title}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700">
              <span className="font-extrabold text-slate-500 dark:text-slate-400 uppercase">Total Pages:</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
                {book.pages.length} Worksheets
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700">
              <span className="font-extrabold text-slate-500 dark:text-slate-400 uppercase">Language:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">{book.language}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-extrabold text-slate-500 dark:text-slate-400 uppercase">Book Style:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">{book.style}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onPreview();
              }}
              className="py-3 px-4 bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs rounded-xl border border-indigo-200 dark:border-indigo-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Pages</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onPrint();
              }}
              className="py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isUrdu ? 'پرنٹ یا پی ڈی ایف' : 'Print / Save PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
