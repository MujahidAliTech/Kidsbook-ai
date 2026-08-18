import React, { useState } from 'react';
import {
  X,
  Type,
  Image as ImageIcon,
  Trash2,
  Copy,
  Plus,
  MoveUp,
  MoveDown,
  Upload,
  Sparkles,
  Loader2,
  Check,
  Edit3,
  GripVertical,
  RotateCcw,
  Palette,
  Link
} from 'lucide-react';
import { Book, BookPage, PageType } from '../types';

interface Props {
  book: Book;
  currentPageIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdateBook: (updatedBook: Book) => void;
  onSelectPage: (index: number) => void;
}

export const PageEditorModal: React.FC<Props> = ({
  book,
  currentPageIndex,
  isOpen,
  onClose,
  onUpdateBook,
  onSelectPage,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'organize'>('text');
  
  // Local state for image generation inside editor
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Custom image URL state & handlers
  const [customUrl, setCustomUrl] = useState('');

  const convertDriveUrlToDirectLink = (url: string): string => {
    const trimmed = url.trim();
    let fileId = '';
    const dMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (dMatch && dMatch[1]) {
      fileId = dMatch[1];
    } else if (idMatch && idMatch[1]) {
      fileId = idMatch[1];
    }
    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    return trimmed;
  };

  const handleApplyCustomUrl = () => {
    if (!customUrl.trim()) return;
    const directLink = convertDriveUrlToDirectLink(customUrl);
    updateCurrentPage({ imageUrl: directLink });
    setCustomUrl('');
  };

  // Drag and drop indices
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  if (!isOpen || !book.pages[currentPageIndex]) return null;

  const currentPage = book.pages[currentPageIndex];

  // Handler to update fields of the current page
  const updateCurrentPage = (fields: Partial<BookPage>) => {
    const newPages = [...book.pages];
    newPages[currentPageIndex] = {
      ...currentPage,
      ...fields,
    };
    onUpdateBook({ ...book, pages: newPages });
  };

  // 1. Text Edit Handlers
  const handleTextChange = (field: keyof BookPage, value: string) => {
    updateCurrentPage({ [field]: value });
  };

  // 2. Image Replace Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updateCurrentPage({ imageUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateAiImage = async () => {
    const promptToUse = aiPrompt.trim() || `Coloring page outline of ${currentPage.word || currentPage.title || 'cute character'}`;
    setIsGeneratingAi(true);
    setAiError(null);

    try {
      const res = await fetch('/api/generate-coloring-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToUse }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to generate image.');
      }
      updateCurrentPage({ imageUrl: data.imageUrl });
      setAiPrompt('');
    } catch (err: any) {
      setAiError(err.message || 'AI image generation failed.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleRemoveImage = () => {
    updateCurrentPage({ imageUrl: undefined });
  };

  // 3. Page Delete Handler
  const handleDeletePage = (indexToDelete: number) => {
    if (book.pages.length <= 1) {
      alert('A book must have at least 1 page.');
      return;
    }
    const newPages = book.pages.filter((_, idx) => idx !== indexToDelete);
    const renumbered = newPages.map((pg, idx) => ({ ...pg, pageNumber: idx + 1 }));
    onUpdateBook({ ...book, pages: renumbered });
    if (currentPageIndex >= renumbered.length) {
      onSelectPage(renumbered.length - 1);
    }
  };

  // 4. Page Duplicate Handler
  const handleDuplicatePage = (indexToDup: number) => {
    const source = book.pages[indexToDup];
    const newPage: BookPage = {
      ...source,
      id: `pg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: `${source.title} (Copy)`,
    };
    const newPages = [...book.pages];
    newPages.splice(indexToDup + 1, 0, newPage);
    const renumbered = newPages.map((pg, idx) => ({ ...pg, pageNumber: idx + 1 }));
    onUpdateBook({ ...book, pages: renumbered });
    onSelectPage(indexToDup + 1);
  };

  // 5. Add Blank Page Handler
  const handleAddBlankPage = (type: PageType = 'tracing') => {
    const nextNum = book.pages.length + 1;
    const blankPage: BookPage = {
      id: `blank-${Date.now()}`,
      pageNumber: nextNum,
      type: type,
      title: `Blank ${type.toUpperCase()} Page ${nextNum}`,
      mainCharacter: 'A',
      word: 'Practice',
      imageEmoji: '✏️',
      description: 'Custom practice worksheet page.',
      tracingText: 'PRACTICE PRACTICE',
      instructions: 'Trace carefully along the guidelines.',
    };
    const newPages = [...book.pages, blankPage];
    onUpdateBook({ ...book, pages: newPages });
    onSelectPage(newPages.length - 1);
  };

  // 6. Drag & Drop Reorder Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropTargetIdx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropTargetIdx) return;

    const newPages = [...book.pages];
    const [movedItem] = newPages.splice(draggedIdx, 1);
    newPages.splice(dropTargetIdx, 0, movedItem);

    const renumbered = newPages.map((pg, idx) => ({ ...pg, pageNumber: idx + 1 }));
    onUpdateBook({ ...book, pages: renumbered });
    onSelectPage(dropTargetIdx);
    setDraggedIdx(null);
  };

  const handleMovePage = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= book.pages.length) return;

    const newPages = [...book.pages];
    const temp = newPages[fromIndex];
    newPages[fromIndex] = newPages[toIndex];
    newPages[toIndex] = temp;

    const renumbered = newPages.map((pg, idx) => ({ ...pg, pageNumber: idx + 1 }));
    onUpdateBook({ ...book, pages: renumbered });
    onSelectPage(toIndex);
  };

  const presetOutlines = [
    { key: 'apple', label: 'Apple' },
    { key: 'lion', label: 'Lion' },
    { key: 'cat', label: 'Cat' },
    { key: 'bus', label: 'Bus' },
    { key: 'elephant', label: 'Elephant' },
    { key: 'car', label: 'Car' },
    { key: 'duck', label: 'Duck' },
    { key: 'fish', label: 'Fish' },
    { key: 'mango', label: 'Mango' },
    { key: 'banana', label: 'Banana' },
    { key: 'grapes', label: 'Grapes' },
    { key: 'flower', label: 'Flower' },
    { key: 'rocket', label: 'Rocket' },
    { key: 'star', label: 'Star' },
    { key: 'heart', label: 'Heart' },
    { key: 'sun', label: 'Sun' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight text-white">Book & Page Editor</h3>
              <p className="text-xs text-indigo-200">
                Page {currentPageIndex + 1} of {book.pages.length}: <span className="font-bold text-amber-300">{currentPage.title}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-2 gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'text'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>1. Edit Text Content</span>
          </button>

          <button
            onClick={() => setActiveTab('image')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'image'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>2. Replace Graphic / AI Outline</span>
          </button>

          <button
            onClick={() => setActiveTab('organize')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'organize'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <GripVertical className="w-4 h-4" />
            <span>3. Reorder & Manage Pages ({book.pages.length})</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: EDIT TEXT CONTENT */}
          {activeTab === 'text' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  value={currentPage.title || ''}
                  onChange={(e) => handleTextChange('title', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Main Character / Letter / Number
                </label>
                <input
                  type="text"
                  value={currentPage.mainCharacter || ''}
                  onChange={(e) => handleTextChange('mainCharacter', e.target.value)}
                  placeholder="e.g. A, 1, خ"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Word / Object Name
                </label>
                <input
                  type="text"
                  value={currentPage.word || ''}
                  onChange={(e) => handleTextChange('word', e.target.value)}
                  placeholder="e.g. Apple, Lion, Bus"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Urdu Word (Optional)
                </label>
                <input
                  type="text"
                  value={currentPage.urduWord || ''}
                  onChange={(e) => handleTextChange('urduWord', e.target.value)}
                  placeholder="e.g. سیب, شیر"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-sm font-urdu text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Urdu Transliteration (Optional)
                </label>
                <input
                  type="text"
                  value={currentPage.urduTransliteration || ''}
                  onChange={(e) => handleTextChange('urduTransliteration', e.target.value)}
                  placeholder="e.g. Alif se Seb"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Tracing Line Text (Repeated on practice lines)
                </label>
                <input
                  type="text"
                  value={currentPage.tracingText || ''}
                  onChange={(e) => handleTextChange('tracingText', e.target.value)}
                  placeholder="e.g. A A A Apple"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Instructions / Guidance for Kids
                </label>
                <input
                  type="text"
                  value={currentPage.instructions || ''}
                  onChange={(e) => handleTextChange('instructions', e.target.value)}
                  placeholder="e.g. Start at the green dot and trace carefully!"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Description / Phonetic Sound
                </label>
                <textarea
                  rows={2}
                  value={currentPage.description || ''}
                  onChange={(e) => handleTextChange('description', e.target.value)}
                  placeholder="e.g. 'A' says /æ/ as in Apple."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* TAB 2: REPLACE IMAGE */}
          {activeTab === 'image' && (
            <div className="space-y-6">
              {/* Current Graphic Preview */}
              <div className="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-32 h-32 bg-white rounded-xl border-2 border-slate-900 flex items-center justify-center overflow-hidden p-2 shadow-xs shrink-0">
                  {currentPage.imageUrl ? (
                    <img
                      src={currentPage.imageUrl}
                      alt="Current page graphic"
                      className="w-full h-full object-contain filter contrast-125"
                    />
                  ) : (
                    <span className="text-5xl">{currentPage.imageEmoji || '🎨'}</span>
                  )}
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                    Current Page Graphic
                  </span>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {currentPage.imageUrl ? 'Custom Upload / AI Outline Active' : `Preset Graphic: ${currentPage.svgShape || 'Default Vector'}`}
                  </p>
                  {currentPage.imageUrl && (
                    <button
                      onClick={handleRemoveImage}
                      className="px-3 py-1.5 bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 rounded-lg text-xs font-bold hover:bg-rose-200 flex items-center gap-1 mx-auto sm:mx-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Vector Graphic</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Option A: Upload Local Image */}
              <div className="p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-indigo-600" />
                  <span>Option 1: Upload Custom Local Image File</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select any PNG or JPG line art or coloring picture from your computer.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
              </div>

              {/* Option B: Generate AI Image */}
              <div className="p-5 bg-gradient-to-br from-indigo-900 to-purple-950 text-white rounded-2xl border border-indigo-700/60 space-y-3">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 fill-current" />
                  <span>Option 2: Generate New AI Printable Outline</span>
                </h4>
                <p className="text-xs text-indigo-200">
                  Gemini AI will render a black & white vector outline picture for kids coloring.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder={`e.g. Coloring page outline of a cute ${currentPage.word || 'rabbit'}`}
                    className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-indigo-500/50 rounded-xl text-white text-xs placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={handleGenerateAiImage}
                    disabled={isGeneratingAi}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {isGeneratingAi ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>{isGeneratingAi ? 'Generating...' : 'Generate AI'}</span>
                  </button>
                </div>
                {aiError && <p className="text-xs text-rose-300">{aiError}</p>}
              </div>

              {/* Option C: Select Built-in Vector Outline Preset */}
              <div className="p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-indigo-600" />
                  <span>Option 3: Choose Built-in Vector Shape</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {presetOutlines.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        updateCurrentPage({
                          svgShape: item.key,
                          imageUrl: undefined,
                        });
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 ${
                        currentPage.svgShape === item.key && !currentPage.imageUrl
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${currentPage.svgShape === item.key ? 'text-indigo-600' : 'opacity-0'}`} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option D: Paste Custom Image URL / Google Drive Link */}
              <div className="p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Link className="w-4 h-4 text-indigo-600" />
                  <span>Option 4: Use Custom Web Image URL / Google Drive Share Link</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Paste any direct image URL (from Imgur, Pinterest, etc.) or a Google Drive sharing link. We will automatically convert Drive links to work instantly!
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/... or any direct image link..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCustomUrl}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap"
                  >
                    Apply URL
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REORDER & MANAGE PAGES */}
          {activeTab === 'organize' && (
            <div className="space-y-6">
              {/* Add Blank Pages Controls */}
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl border border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-sm text-indigo-950 dark:text-indigo-200">
                    Add New Page to Book
                  </h4>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300">
                    Insert extra practice worksheets into your book layout.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAddBlankPage('tracing')}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Blank Tracing</span>
                  </button>
                  <button
                    onClick={() => handleAddBlankPage('coloring')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Blank Coloring</span>
                  </button>
                  <button
                    onClick={() => handleAddBlankPage('learning')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Blank Learning</span>
                  </button>
                </div>
              </div>

              {/* Drag & Drop Reorderable List */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                  Drag handles or use arrows to reorder pages:
                </span>

                {book.pages.map((pg, idx) => (
                  <div
                    key={pg.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, idx)}
                    onClick={() => onSelectPage(idx)}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      currentPageIndex === idx
                        ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Drag Handle Icon */}
                      <span className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-600">
                        <GripVertical className="w-5 h-5" />
                      </span>

                      <span className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 font-mono font-bold text-xs flex items-center justify-center text-slate-800 dark:text-slate-200">
                        {idx + 1}
                      </span>

                      <div>
                        <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{pg.title}</span>
                          {currentPageIndex === idx && (
                            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full">
                              Editing Now
                            </span>
                          )}
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Type: <span className="uppercase font-semibold">{pg.type}</span> • Word: {pg.word || pg.mainCharacter || 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Page Actions */}
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      {/* Move Up */}
                      <button
                        onClick={() => handleMovePage(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 disabled:opacity-30"
                        title="Move Up"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>

                      {/* Move Down */}
                      <button
                        onClick={() => handleMovePage(idx, 'down')}
                        disabled={idx === book.pages.length - 1}
                        className="p-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 disabled:opacity-30"
                        title="Move Down"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>

                      {/* Duplicate Page */}
                      <button
                        onClick={() => handleDuplicatePage(idx)}
                        className="p-1.5 bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-lg hover:bg-indigo-100"
                        title="Duplicate Page"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      {/* Delete Page */}
                      <button
                        onClick={() => handleDeletePage(idx)}
                        className="p-1.5 bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-300 rounded-lg hover:bg-rose-100"
                        title="Delete Page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm rounded-xl shadow-sm transition-all"
          >
            Done Editing
          </button>
        </div>

      </div>
    </div>
  );
};
