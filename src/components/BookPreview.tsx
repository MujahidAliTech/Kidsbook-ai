import React, { useState } from 'react';
import { Book, BookPage } from '../types';
import { PageContainer } from './renderers/PageContainer';
import {
  Printer,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Trash2,
  ArrowUp,
  ArrowDown,
  Plus,
  Grid,
  FileText,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';

interface Props {
  book: Book;
  onUpdateBook: (updated: Book) => void;
  onSaveToLibrary: (book: Book) => void;
  onPrintBook: () => void;
}

export const BookPreview: React.FC<Props> = ({
  book,
  onUpdateBook,
  onSaveToLibrary,
  onPrintBook
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'scroll' | 'grid'>('single');
  const [isSaved, setIsSaved] = useState(false);

  const currentPage = book.pages[selectedIndex] || book.pages[0];

  const handleSave = () => {
    onSaveToLibrary(book);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleDeletePage = (indexToDelete: number) => {
    if (book.pages.length <= 1) {
      alert('A book must have at least 1 page.');
      return;
    }
    const newPages = book.pages.filter((_, idx) => idx !== indexToDelete);
    // Renumber remaining pages
    const renumbered = newPages.map((pg, idx) => ({ ...pg, pageNumber: idx + 1 }));
    onUpdateBook({ ...book, pages: renumbered });
    if (selectedIndex >= renumbered.length) {
      setSelectedIndex(renumbered.length - 1);
    }
  };

  const handleMovePage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= book.pages.length) return;

    const newPages = [...book.pages];
    const temp = newPages[index];
    newPages[index] = newPages[targetIndex];
    newPages[targetIndex] = temp;

    const renumbered = newPages.map((pg, idx) => ({ ...pg, pageNumber: idx + 1 }));
    onUpdateBook({ ...book, pages: renumbered });
    setSelectedIndex(targetIndex);
  };

  const handleAddPage = () => {
    const newNum = book.pages.length + 1;
    const newPage: BookPage = {
      id: `pg-${newNum}-${Math.random().toString(36).substring(2, 6)}`,
      pageNumber: newNum,
      type: 'tracing',
      title: `Extra Practice Page ${newNum}`,
      mainCharacter: 'A',
      word: 'Practice',
      imageEmoji: '✏️',
      description: 'Extra writing practice sheet.',
      tracingText: 'PRACTICE PRACTICE',
      activity: 'Trace the words smoothly along guidelines.',
      instructions: 'Trace on dotted lines.'
    };
    const newPages = [...book.pages, newPage];
    onUpdateBook({ ...book, pages: newPages });
    setSelectedIndex(newPages.length - 1);
  };

  return (
    <div className="space-y-6 no-print">
      {/* Top Header Control Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 font-extrabold text-xs rounded-full">
              {book.category}
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-full">
              Age {book.ageGroup}
            </span>
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-bold text-xs rounded-full">
              {book.pages.length} Pages
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{book.title}</h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={handleSave}
            className={`px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all flex items-center gap-2 shadow-xs ${
              isSaved
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? 'Saved!' : 'Save to Library'}</span>
          </button>

          <button
            onClick={onPrintBook}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* View Mode & Page Reordering Controls Bar */}
      <div className="bg-slate-100/80 p-2 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* View Mode Switches */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setViewMode('single')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'single' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Single Page</span>
          </button>

          <button
            onClick={() => setViewMode('scroll')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'scroll' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Pages</span>
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Grid Thumbnails</span>
          </button>
        </div>

        {/* Selected Page Management Controls */}
        {viewMode === 'single' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleMovePage(selectedIndex, 'up')}
              disabled={selectedIndex === 0}
              className="p-1.5 bg-white text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30"
              title="Move Page Left/Up"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleMovePage(selectedIndex, 'down')}
              disabled={selectedIndex === book.pages.length - 1}
              className="p-1.5 bg-white text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30"
              title="Move Page Right/Down"
            >
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleDeletePage(selectedIndex)}
              className="p-1.5 bg-red-50 text-red-600 rounded-lg border border-red-200 hover:bg-red-100"
              title="Delete Page"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleAddPage}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200 text-xs font-bold hover:bg-indigo-100 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Page</span>
            </button>
          </div>
        )}
      </div>

      {/* Viewport Render Area */}
      {viewMode === 'single' && (
        <div className="flex flex-col items-center space-y-6">
          {/* Navigation Prev / Next */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedIndex((prev) => Math.max(0, prev - 1))}
              disabled={selectedIndex === 0}
              className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700" />
            </button>

            <span className="font-mono font-bold text-sm text-slate-700 bg-white px-4 py-2 rounded-xl border border-slate-200">
              Page {selectedIndex + 1} of {book.pages.length}
            </span>

            <button
              onClick={() => setSelectedIndex((prev) => Math.min(book.pages.length - 1, prev + 1))}
              disabled={selectedIndex === book.pages.length - 1}
              className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          {/* Single Page A4 Render */}
          <div className="w-full max-w-2xl">
            <PageContainer book={book} page={currentPage} isSelected={true} />
          </div>
        </div>
      )}

      {viewMode === 'scroll' && (
        <div className="flex flex-col items-center space-y-8 max-w-3xl mx-auto">
          {book.pages.map((pg, idx) => (
            <div key={pg.id} className="w-full">
              <PageContainer book={book} page={pg} />
            </div>
          ))}
        </div>
      )}

      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {book.pages.map((pg, idx) => (
            <div
              key={pg.id}
              onClick={() => {
                setSelectedIndex(idx);
                setViewMode('single');
              }}
              className="cursor-pointer group"
            >
              <PageContainer
                book={book}
                page={pg}
                isSelected={selectedIndex === idx}
                showPageNumber={false}
              />
              <p className="text-center text-xs font-bold text-slate-600 mt-2">
                Page {idx + 1}: {pg.title}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Horizontal Page Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
          Quick Page Switcher
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {book.pages.map((pg, idx) => (
            <button
              key={pg.id}
              onClick={() => setSelectedIndex(idx)}
              className={`flex-shrink-0 w-20 p-2 rounded-xl border text-center transition-all ${
                selectedIndex === idx
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-extrabold shadow-2xs'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <span className="text-2xl block">{pg.imageEmoji || '📄'}</span>
              <span className="text-[10px] block mt-1 truncate">P.{idx + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
