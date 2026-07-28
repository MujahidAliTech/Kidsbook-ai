import React, { useState } from 'react';
import { Sparkles, Printer, Download, Plus, Loader2, AlertCircle, RefreshCw, Palette, CheckCircle2 } from 'lucide-react';
import { Book, BookPage } from '../types';

interface Props {
  activeBook: Book | null;
  onAddPageToBook?: (page: BookPage) => void;
  onPrintSinglePage?: (page: BookPage) => void;
}

export const AiOutlineGenerator: React.FC<Props> = ({
  activeBook,
  onAddPageToBook,
  onPrintSinglePage,
}) => {
  const [prompt, setPrompt] = useState('Create a coloring page of a cute rabbit.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedTitle, setGeneratedTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const samplePrompts = [
    'Create a coloring page of a cute rabbit.',
    'Create a coloring page of a friendly lion wearing a crown.',
    'Create a coloring page of a cartoon school bus.',
    'Create a coloring page of a cute dinosaur with balloons.',
    'Create a coloring page of a space rocket landing on the moon.',
  ];

  const handleGenerate = async (targetPrompt?: string) => {
    const promptToUse = (targetPrompt || prompt).trim();
    if (!promptToUse) return;

    setIsGenerating(true);
    setErrorMessage(null);
    setAddedSuccess(false);

    try {
      const response = await fetch('/api/generate-coloring-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToUse }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to generate coloring page image.');
      }

      setGeneratedImage(data.imageUrl);

      // Clean title from prompt (e.g. "Create a coloring page of a cute rabbit." -> "CUTE RABBIT")
      const cleanTitle = promptToUse
        .replace(/create a coloring page of/i, '')
        .replace(/a coloring page of/i, '')
        .replace(/color page of/i, '')
        .replace(/draw/i, '')
        .trim()
        .replace(/\.$/, '')
        .toUpperCase();

      setGeneratedTitle(cleanTitle || 'CUSTOM OUTLINE');
    } catch (err: any) {
      console.error('Error generating AI coloring page:', err);
      setErrorMessage(
        err.message || 'Unable to contact AI image generator. Please check your connection or API key.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddPage = () => {
    if (!generatedImage || !onAddPageToBook) return;

    const newPage: BookPage = {
      id: `ai-outline-${Date.now()}`,
      pageNumber: (activeBook?.pages.length || 0) + 1,
      type: 'coloring',
      title: `Coloring: ${generatedTitle}`,
      word: generatedTitle,
      mainCharacter: generatedTitle.charAt(0),
      imageUrl: generatedImage,
      description: `Printable AI outline coloring page for ${generatedTitle}.`,
      instructions: 'Color inside the lines with crayons or markers.',
    };

    onAddPageToBook(newPage);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const handlePrint = () => {
    if (!generatedImage) return;

    const singlePage: BookPage = {
      id: `print-single-${Date.now()}`,
      pageNumber: 1,
      type: 'coloring',
      title: generatedTitle,
      word: generatedTitle,
      imageUrl: generatedImage,
      instructions: 'Color inside the lines with your favorite colors.',
    };

    if (onPrintSinglePage) {
      onPrintSinglePage(singlePage);
    } else {
      // Trigger simple print window for generated image
      const printWin = window.open('', '_blank');
      if (printWin) {
        printWin.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Coloring Sheet - ${generatedTitle}</title>
              <style>
                @page { size: A4 portrait; margin: 10mm; }
                body { font-family: sans-serif; text-align: center; margin: 0; padding: 20px; }
                .title { font-size: 28px; font-weight: 900; margin-bottom: 8px; text-transform: uppercase; }
                .sub { font-size: 14px; color: #64748b; margin-bottom: 20px; }
                img { max-width: 90%; max-height: 220mm; border: 3px solid #0f172a; border-radius: 16px; padding: 12px; }
              </style>
            </head>
            <body>
              <div class="title">Coloring Page: ${generatedTitle}</div>
              <div class="sub">Printable Worksheet • KidsBook AI</div>
              <img src="${generatedImage}" />
              <script>window.onload = function() { window.print(); }</script>
            </body>
          </html>
        `);
        printWin.document.close();
      }
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = `coloring-${generatedTitle.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-700/50 my-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-800/80 pb-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-500 text-white flex items-center justify-center shadow-lg text-2xl font-black">
            <Palette className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                AI Outline & Coloring Generator
              </h2>
              <span className="px-2.5 py-0.5 bg-amber-400 text-amber-950 text-xs font-black rounded-full uppercase tracking-wider">
                Instant AI
              </span>
            </div>
            <p className="text-sm text-indigo-200 mt-1 font-medium">
              Enter any prompt to generate a printable black & white line-art illustration for kids.
            </p>
          </div>
        </div>
      </div>

      {/* Input Box & Prompt Controls */}
      <div className="space-y-4">
        <div className="relative flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Create a coloring page of a cute rabbit."
            className="flex-1 px-5 py-4 bg-slate-800/90 border-2 border-indigo-500/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 font-medium text-base shadow-inner transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating || !prompt.trim()}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-slate-950 font-black text-base rounded-2xl shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap active:scale-98"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating AI Image...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-slate-950 fill-current" />
                <span>Generate Outline</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Sample Prompt Chips */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-2">
            💡 Quick Prompt Ideas (Click to try):
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(p);
                  handleGenerate(p);
                }}
                disabled={isGenerating}
                className="px-3 py-1.5 bg-indigo-950/80 hover:bg-indigo-800/90 text-indigo-200 hover:text-white border border-indigo-700/60 rounded-xl text-xs font-semibold transition-all text-left flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{p}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message display */}
      {errorMessage && (
        <div className="mt-6 p-4 bg-rose-950/80 border border-rose-600/80 rounded-2xl text-rose-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-rose-100">Generation Notice</h4>
            <p className="text-xs text-rose-200/90 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Generated Result Display Area */}
      {isGenerating && (
        <div className="mt-8 p-12 bg-indigo-950/60 border border-indigo-700/40 rounded-3xl text-center space-y-4 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-indigo-800/60 flex items-center justify-center mx-auto text-amber-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-white">Creating Your Printable Coloring Page...</h3>
          <p className="text-sm text-indigo-200 max-w-md mx-auto">
            Gemini AI is crafting a high-contrast black & white line-art illustration for kids coloring.
          </p>
        </div>
      )}

      {generatedImage && !isGenerating && (
        <div className="mt-8 p-6 bg-slate-950/80 border border-indigo-600/40 rounded-3xl space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-indigo-900/80 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                AI Printable Outline Result
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">{generatedTitle}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Sheet</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-600 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>

              {activeBook && onAddPageToBook && (
                <button
                  onClick={handleAddPage}
                  disabled={addedSuccess}
                  className={`px-4 py-2.5 font-bold text-sm rounded-xl transition-all flex items-center gap-2 ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Added to Book!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Current Book</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* High Contrast Outline Preview */}
          <div className="flex justify-center bg-slate-900/80 p-6 rounded-2xl border border-indigo-900/60">
            <div className="bg-white p-6 rounded-2xl border-4 border-slate-900 max-w-md w-full text-center shadow-2xl">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-2">
                Coloring Page • {generatedTitle}
              </div>
              <div className="relative group my-2 flex justify-center">
                <img
                  src={generatedImage}
                  alt={generatedTitle}
                  referrerPolicy="no-referrer"
                  className="max-h-80 max-w-full object-contain filter contrast-150 border-2 border-slate-900 rounded-xl bg-white p-2 shadow-xs"
                />
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100">
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">{generatedTitle}</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Color inside the lines with crayons!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
