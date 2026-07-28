import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { triggerBrowserPrint, downloadPrintableHtml } from '../services/printService';
import { generateProfessionalPdf } from '../services/pdfGenerator';
import { Printer, Download, CheckCircle, HelpCircle, X, Sparkles, FileText, Loader2, BookOpen, Layers } from 'lucide-react';

interface Props {
  book: Book;
  onClose: () => void;
}

export const PrintModal: React.FC<Props> = ({ book, onClose }) => {
  const isUrdu = book.language === 'urdu';

  const [includeCover, setIncludeCover] = useState(true);
  const [includeToc, setIncludeToc] = useState(true);
  const [includePageNumbers, setIncludePageNumbers] = useState(true);
  const [pdfQuality, setPdfQuality] = useState<'standard' | 'high' | 'ultra'>('high');

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState<string>('');

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    setPdfProgress('Initializing Professional PDF Generator...');

    try {
      const pdfBlob = await generateProfessionalPdf(book, {
        includeCover,
        includeToc,
        includePageNumbers,
        quality: pdfQuality,
        onProgress: (p) => {
          setPdfProgress(p.message);
        },
      });

      // Trigger direct browser download of .pdf file
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${book.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_kidsbook.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('PDF generation encountered an issue. Falling back to browser print.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-xl leading-tight">
                {isUrdu ? 'پیشہ ورانہ پی ڈی ایف جنریٹر' : 'Professional PDF Generator'}
              </h3>
              <p className="text-xs text-indigo-200 mt-0.5 font-medium">
                {book.title} • {book.pages.length} {isUrdu ? 'صفحات' : 'Worksheets'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* PDF Options Customization Section */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>PDF Options &amp; Document Layout:</span>
            </h4>

            <div className="space-y-2.5 pt-1">
              {/* Include Cover Checkbox */}
              <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-all">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeCover}
                    onChange={(e) => setIncludeCover(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-extrabold text-slate-800 block">Include Professional Cover Page</span>
                    <span className="text-[11px] text-slate-500 block">Adds book title, age group badge, and hero graphics.</span>
                  </div>
                </div>
                <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
              </label>

              {/* Include TOC Checkbox */}
              <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-all">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeToc}
                    onChange={(e) => setIncludeToc(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-extrabold text-slate-800 block">Table of Contents (فہرست)</span>
                    <span className="text-[11px] text-slate-500 block">Generates structured worksheet page directory.</span>
                  </div>
                </div>
                <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
              </label>

              {/* Include Page Numbers Checkbox */}
              <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-all">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includePageNumbers}
                    onChange={(e) => setIncludePageNumbers(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-extrabold text-slate-800 block">Running Page Numbers</span>
                    <span className="text-[11px] text-slate-500 block">Prints &quot;Page 1 of N&quot; with clean headers and footers.</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">P.1/N</span>
              </label>
            </div>

            {/* Print Quality Selector */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-slate-700">PDF Resolution:</span>
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setPdfQuality('standard')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    pdfQuality === 'standard' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Standard (150 DPI)
                </button>
                <button
                  onClick={() => setPdfQuality('high')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    pdfQuality === 'high' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  High (300 DPI)
                </button>
                <button
                  onClick={() => setPdfQuality('ultra')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    pdfQuality === 'ultra' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Ultra (Print Ready)
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Primary Action 1: Download Direct PDF */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-base rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="truncate">{pdfProgress || 'Generating PDF Document...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 text-amber-300" />
                  <span>Download High-Quality .PDF File</span>
                </>
              )}
            </button>

            {/* Action 2: Standard Browser Print */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => triggerBrowserPrint()}
                className="py-3 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-xs"
              >
                <Printer className="w-4 h-4" />
                <span>{isUrdu ? 'برائوزر پرنٹ ونڈو' : 'Browser Print Dialog'}</span>
              </button>

              <button
                onClick={() => downloadPrintableHtml(book)}
                className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs border border-slate-200"
              >
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Download .HTML Sheet</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {isUrdu ? 'بند کریں' : 'Done / Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

