import React, { useEffect } from 'react';
import { Book } from '../types';
import { triggerBrowserPrint, downloadPrintableHtml } from '../services/printService';
import { Printer, Download, CheckCircle, HelpCircle, X, Sparkles, FileText } from 'lucide-react';

interface Props {
  book: Book;
  onClose: () => void;
}

export const PrintModal: React.FC<Props> = ({ book, onClose }) => {
  const isUrdu = book.language === 'urdu';

  useEffect(() => {
    // Automatically trigger print on modal open
    triggerBrowserPrint();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {isUrdu ? 'کتاب پرنٹ یا پی ڈی ایف محفوظ کریں' : 'Print or Save as PDF'}
              </h3>
              <p className="text-xs text-indigo-200 mt-0.5">
                {book.title} ({book.pages.length} {isUrdu ? 'صفحات' : 'Pages'})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Main Quick Action Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => triggerBrowserPrint()}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 text-base cursor-pointer"
            >
              <Printer className="w-5 h-5" />
              <span>{isUrdu ? 'پرنٹ ونڈو کھولیں (Direct Print)' : 'Open Print Window Again'}</span>
            </button>

            <button
              onClick={() => downloadPrintableHtml(book)}
              className="w-full py-3 px-4 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-sky-600" />
              <span>{isUrdu ? 'قابلِ پرنٹ فائل ڈاؤن لوڈ کریں (.html / PDF)' : 'Download Printable File (.html)'}</span>
            </button>
          </div>

          {/* Recommended Print Settings Card */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2.5">
            <div className="flex items-center gap-1.5 text-indigo-900 font-bold text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{isUrdu ? 'بہترین پرنٹنگ کے لیے ضروری ترتیبات:' : 'Recommended Print Dialog Settings:'}</span>
            </div>

            <ul className="space-y-1.5 text-slate-600 pl-1">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-800">1. Destination:</span>
                <span>Select <strong>Save as PDF</strong> or your color printer.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-800">2. Paper Size:</span>
                <span>Choose <strong>A4</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-800">3. Margins:</span>
                <span>Select <strong>None</strong> or <strong>Default</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-800">4. Options:</span>
                <span>Enable <strong>Background Graphics</strong> for full colors.</span>
              </li>
            </ul>
          </div>

          {/* Fallback Help Banner */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200/70 text-amber-900 text-xs">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">
                {isUrdu ? 'اگر پرنٹ ونڈو نہ کھلے:' : "If the print dialog didn't pop up:"}
              </p>
              <p className="text-amber-800/90 mt-0.5">
                {isUrdu
                  ? 'اوپر دیے گئے "قابلِ پرنٹ فائل ڈاؤن لوڈ کریں" بٹن پر کلک کریں اور ڈاؤن لوڈ کردہ فائل کھول کر Ctrl+P دبائیں۔'
                  : 'Click "Download Printable File (.html)" above, open the file in your browser, and press Ctrl+P / Cmd+P to save as PDF!'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            {isUrdu ? 'بند کریں' : 'Done / Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
