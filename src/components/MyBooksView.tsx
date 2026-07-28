import React from 'react';
import { Book } from '../types';
import { Bookmark, Printer, BookOpen, Trash2, Calendar, PlusCircle } from 'lucide-react';

interface Props {
  books: Book[];
  onOpenBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
  onCreateNew: () => void;
  onPrintBook: (book: Book) => void;
}

export const MyBooksView: React.FC<Props> = ({
  books,
  onOpenBook,
  onDeleteBook,
  onCreateNew,
  onPrintBook
}) => {
  if (books.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-xl mx-auto my-8">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto text-3xl">
          <Bookmark className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">No Saved Books Yet</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Your saved books will appear here. Create your first learning book and click "Save to Library"!
        </p>
        <button
          onClick={onCreateNew}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create a Book Now</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            My Saved Books ({books.length})
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Access your previously generated educational books stored in browser storage.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all inline-flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Book</span>
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((b) => (
          <div
            key={b.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-bold rounded-full border border-indigo-200 dark:border-indigo-800">
                  {b.category}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{b.createdAt}</span>
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">{b.title}</h3>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-md">
                  Age {b.ageGroup}
                </span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-md capitalize">
                  {b.style}
                </span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-md">
                  {b.pages.length} Pages
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => onOpenBook(b)}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Preview</span>
              </button>

              <button
                onClick={() => onPrintBook(b)}
                className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                title="Print Book"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                onClick={() => onDeleteBook(b.id)}
                className="p-2 bg-red-50 dark:bg-red-950/80 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-xl transition-all"
                title="Delete Book"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
