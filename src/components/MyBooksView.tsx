import React, { useState } from 'react';
import { Book } from '../types';
import { Bookmark, Printer, BookOpen, Trash2, Calendar, PlusCircle, Star, Copy, Edit3, Search, Sparkles } from 'lucide-react';

interface Props {
  books: Book[];
  onOpenBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
  onCreateNew: () => void;
  onPrintBook: (book: Book) => void;
  onDuplicateBook?: (book: Book) => void;
  onRenameBook?: (id: string, newTitle: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export const MyBooksView: React.FC<Props> = ({
  books,
  onOpenBook,
  onDeleteBook,
  onCreateNew,
  onPrintBook,
  onDuplicateBook,
  onRenameBook,
  onToggleFavorite
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameTitle, setRenameTitle] = useState('');

  const filteredBooks = books.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFav = filterFavorite ? b.isFavorite : true;
    return matchesSearch && matchesFav;
  });

  const handleStartRename = (b: Book) => {
    setRenamingId(b.id);
    setRenameTitle(b.title);
  };

  const handleSaveRename = (id: string) => {
    if (onRenameBook && renameTitle.trim()) {
      onRenameBook(id, renameTitle.trim());
    }
    setRenamingId(null);
  };

  if (books.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-xs space-y-4 max-w-xl mx-auto my-8">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto text-3xl">
          <Bookmark className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">No Saved Books Yet</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Your saved educational books will appear here. Create your first learning book and save it to your library!
        </p>
        <button
          onClick={onCreateNew}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create a Book Now</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              My Saved Library ({books.length})
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Manage, search, favorite, duplicate, and print your educational workbooks.
            </p>
          </div>

          <button
            onClick={onCreateNew}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Book</span>
          </button>
        </div>

        {/* Search & Favorites Toggle Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books by title or topic..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterFavorite(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                !filterFavorite
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              All ({books.length})
            </button>
            <button
              onClick={() => setFilterFavorite(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1 cursor-pointer ${
                filterFavorite
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Favorites ({books.filter((b) => b.isFavorite).length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center text-slate-500 border border-slate-200 dark:border-slate-800">
          No books matching your search filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((b) => (
            <div
              key={b.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative group"
            >
              {/* Top Row: Category & Favorite */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-bold rounded-full border border-indigo-200 dark:border-indigo-800">
                    {b.category}
                  </span>

                  <button
                    onClick={() => onToggleFavorite && onToggleFavorite(b.id)}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      b.isFavorite
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/80'
                        : 'text-slate-300 hover:text-amber-400 dark:text-slate-600'
                    }`}
                    title={b.isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
                  >
                    <Star className={`w-4 h-4 ${b.isFavorite ? 'fill-amber-400' : ''}`} />
                  </button>
                </div>

                {/* Title or Inline Rename */}
                {renamingId === b.id ? (
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={renameTitle}
                      onChange={(e) => setRenameTitle(e.target.value)}
                      className="px-2 py-1 border border-indigo-500 rounded-lg text-sm font-bold text-slate-900 dark:text-white dark:bg-slate-800 w-full"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveRename(b.id)}
                      className="px-2 py-1 bg-indigo-600 text-white text-xs font-bold rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-2 group/title">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">{b.title}</h3>
                    <button
                      onClick={() => handleStartRename(b)}
                      className="opacity-0 group-hover/title:opacity-100 p-1 text-slate-400 hover:text-indigo-600 transition-opacity cursor-pointer"
                      title="Rename book"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-md">
                    Age {b.ageGroup}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-md capitalize">
                    {b.style}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-md">
                    {b.pages.length} Pages
                  </span>
                  {b.qualityScore && (
                    <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-black rounded-md border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Grade: {b.qualityScore.pedagogicalRating}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1.5">
                <button
                  onClick={() => onOpenBook(b)}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open</span>
                </button>

                <button
                  onClick={() => onPrintBook(b)}
                  className="px-2.5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  title="Print Book"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                {onDuplicateBook && (
                  <button
                    onClick={() => onDuplicateBook(b)}
                    className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
                    title="Duplicate Book"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => onDeleteBook(b.id)}
                  className="p-2 bg-red-50 dark:bg-red-950/80 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-xl transition-all cursor-pointer"
                  title="Delete Book"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
