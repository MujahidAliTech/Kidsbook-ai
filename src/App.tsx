import React, { useState, useEffect } from 'react';
import { Book, BookConfig } from './types';
import { generateBook } from './services/bookGenerator';
import { getSavedBooks, saveBook, deleteSavedBook } from './services/storageService';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { BookForm } from './components/BookForm';
import { BookPreview } from './components/BookPreview';
import { TemplatesView } from './components/TemplatesView';
import { MyBooksView } from './components/MyBooksView';
import { PrintLayout } from './components/PrintLayout';
import { PrintModal } from './components/PrintModal';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { SampleBooksSection } from './components/SampleBooksSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AiOutlineGenerator } from './components/AiOutlineGenerator';
import { BookPage } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'templates' | 'my-books' | 'preview' | 'ai-outline'>('create');
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('kidsbook_theme') === 'dark';
  });

  // Sync dark mode class on HTML document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('kidsbook_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('kidsbook_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Initialize saved books and default initial book
  useEffect(() => {
    const loaded = getSavedBooks();
    setSavedBooks(loaded);

    // Default initial book generation on first open so preview works out of the box
    const initialConfig: BookConfig = {
      category: 'alphabet',
      language: 'english',
      ageGroup: '3-4',
      style: 'learning',
      pageCount: 10,
      includeCover: true,
      includeGuide: false,
      customTitle: 'My First Alphabet Book',
      childName: ''
    };

    generateBook(initialConfig).then((defaultBook) => {
      setActiveBook(defaultBook);
    });
  }, []);

  const handleGenerate = async (config: BookConfig) => {
    setIsGenerating(true);
    try {
      const newBook = await generateBook(config);
      setActiveBook(newBook);
      saveBook(newBook);
      setSavedBooks(getSavedBooks());
      setActiveTab('preview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error('Failed to generate book', e);
      alert('An error occurred while generating the book. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectTemplate = async (config: BookConfig) => {
    setIsGenerating(true);
    try {
      const tplBook = await generateBook(config);
      setActiveBook(tplBook);
      saveBook(tplBook);
      setSavedBooks(getSavedBooks());
      setActiveTab('preview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error('Failed to load template', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToLibrary = (bookToSave: Book) => {
    saveBook(bookToSave);
    setSavedBooks(getSavedBooks());
  };

  const handleDeleteBook = (id: string) => {
    const updated = deleteSavedBook(id);
    setSavedBooks(updated);
    if (activeBook && activeBook.id === id) {
      setActiveBook(updated[0] || null);
    }
  };

  const handlePrint = (bookToPrint?: Book) => {
    if (bookToPrint) {
      setActiveBook(bookToPrint);
    }
    setShowPrintModal(true);
  };

  const handleAddPageToActiveBook = (newPage: BookPage) => {
    if (!activeBook) return;
    const updatedPages = [...activeBook.pages, newPage];
    const updatedBook: Book = {
      ...activeBook,
      pages: updatedPages,
    };
    setActiveBook(updatedBook);
    saveBook(updatedBook);
    setSavedBooks(getSavedBooks());
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900 flex flex-col justify-between transition-colors">
      {/* Printable A4 Layout for window.print() */}
      {activeBook && <PrintLayout book={activeBook} />}

      {/* Interactive Print Dialog Modal */}
      {showPrintModal && activeBook && (
        <PrintModal
          book={activeBook}
          onClose={() => setShowPrintModal(false)}
        />
      )}

      {/* Main Web UI (Hidden during window.print via .no-print) */}
      <div className="no-print flex-1 flex flex-col">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCount={savedBooks.length}
          hasActiveBook={!!activeBook}
          onPrintActiveBook={activeBook ? () => handlePrint() : undefined}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {activeTab === 'create' && (
            <div className="space-y-12">
              <HeroBanner
                onCreateClick={() => {
                  const formElem = document.getElementById('generator-form');
                  if (formElem) {
                    formElem.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                onExploreTemplates={() => setActiveTab('templates')}
              />

              <BookForm onGenerate={handleGenerate} isGenerating={isGenerating} />

              {/* AI Coloring Outline Generator Tool */}
              <AiOutlineGenerator
                activeBook={activeBook}
                onAddPageToBook={handleAddPageToActiveBook}
              />

              <SampleBooksSection onSelectSample={handleSelectTemplate} />

              <HowItWorksSection
                onCreateClick={() => {
                  const formElem = document.getElementById('generator-form');
                  if (formElem) {
                    formElem.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />

              <FeaturesSection />

              <FAQSection />
            </div>
          )}

          {activeTab === 'preview' && activeBook && (
            <BookPreview
              book={activeBook}
              onUpdateBook={(updated) => {
                setActiveBook(updated);
                saveBook(updated);
                setSavedBooks(getSavedBooks());
              }}
              onSaveToLibrary={handleSaveToLibrary}
              onPrintBook={() => handlePrint()}
            />
          )}

          {activeTab === 'templates' && (
            <TemplatesView onSelectTemplate={handleSelectTemplate} />
          )}

          {activeTab === 'ai-outline' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs text-center max-w-3xl mx-auto">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-extrabold text-xs rounded-full uppercase tracking-wider">
                  ✨ Instant Printable Coloring Page
                </span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2">
                  AI Line-Art & Coloring Sheet Generator
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                  Type any child prompt (e.g. &quot;Create a coloring page of a cute rabbit.&quot;) and AI will generate a crisp black &amp; white printable outline illustration.
                </p>
              </div>

              <AiOutlineGenerator
                activeBook={activeBook}
                onAddPageToBook={handleAddPageToActiveBook}
              />
            </div>
          )}

          {activeTab === 'my-books' && (
            <MyBooksView
              books={savedBooks}
              onOpenBook={(b) => {
                setActiveBook(b);
                setActiveTab('preview');
              }}
              onDeleteBook={handleDeleteBook}
              onCreateNew={() => setActiveTab('create')}
              onPrintBook={(b) => handlePrint(b)}
            />
          )}
        </main>

        {/* Professional Footer */}
        <Footer
          onSelectCategory={(cat) => {
            setActiveTab('create');
            setTimeout(() => {
              const formElem = document.getElementById('generator-form');
              if (formElem) {
                formElem.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
    </div>
  );
}
