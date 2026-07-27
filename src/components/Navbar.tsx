import React, { useState } from 'react';
import { BookOpen, Sparkles, Printer, Bookmark, Menu, X, PlusCircle } from 'lucide-react';

interface Props {
  activeTab: 'create' | 'templates' | 'my-books' | 'preview';
  setActiveTab: (tab: 'create' | 'templates' | 'my-books' | 'preview') => void;
  savedCount: number;
  hasActiveBook: boolean;
  onPrintActiveBook?: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  savedCount,
  hasActiveBook,
  onPrintActiveBook
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => setActiveTab('create')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-slate-900 tracking-tight">KidsBook</span>
              <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 font-extrabold text-xs rounded-md border border-indigo-200">
                AI
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 tracking-wide">
              Create. Learn. Print.
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'create'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Book</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'templates'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Templates</span>
          </button>

          <button
            onClick={() => setActiveTab('my-books')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 relative ${
              activeTab === 'my-books'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>My Books</span>
            {savedCount > 0 && (
              <span className="ml-1 px-2 py-0.2 bg-amber-400 text-amber-950 font-black text-xs rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {hasActiveBook && (
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'preview'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Preview Book</span>
            </button>
          )}
        </nav>

        {/* Action Button: Direct Print */}
        <div className="hidden md:flex items-center gap-3">
          {hasActiveBook && onPrintActiveBook && (
            <button
              onClick={onPrintActiveBook}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {hasActiveBook && onPrintActiveBook && (
            <button
              onClick={onPrintActiveBook}
              className="p-2 bg-amber-500 text-white rounded-lg shadow-xs"
              title="Print Book"
            >
              <Printer className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => {
              setActiveTab('create');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-slate-800 hover:bg-indigo-50 flex items-center gap-3"
          >
            <PlusCircle className="w-5 h-5 text-indigo-600" />
            <span>Create Book</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('templates');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-slate-800 hover:bg-indigo-50 flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Pre-Made Templates</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('my-books');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-slate-800 hover:bg-indigo-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Bookmark className="w-5 h-5 text-indigo-600" />
              <span>My Saved Books</span>
            </div>
            {savedCount > 0 && (
              <span className="px-2.5 py-0.5 bg-amber-400 text-amber-950 font-black text-xs rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {hasActiveBook && (
            <button
              onClick={() => {
                setActiveTab('preview');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Preview Active Book</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
