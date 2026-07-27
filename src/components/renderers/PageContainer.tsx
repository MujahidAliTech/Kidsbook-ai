import React from 'react';
import { Book, BookPage } from '../../types';
import { CoverPageRenderer } from './CoverPageRenderer';
import { LearningPageRenderer } from './LearningPageRenderer';
import { TracingPageRenderer } from './TracingPageRenderer';
import { ColoringPageRenderer } from './ColoringPageRenderer';
import { ActivityPageRenderer } from './ActivityPageRenderer';
import { GuidePageRenderer } from './GuidePageRenderer';

interface Props {
  book: Book;
  page: BookPage;
  isSelected?: boolean;
  onClick?: () => void;
  showPageNumber?: boolean;
}

export const PageContainer: React.FC<Props> = ({
  book,
  page,
  isSelected,
  onClick,
  showPageNumber = true
}) => {
  return (
    <div
      onClick={onClick}
      className={`print-page relative w-full aspect-[1/1.414] bg-white rounded-xl shadow-md border transition-all duration-200 overflow-hidden flex flex-col justify-between p-6 ${
        isSelected ? 'ring-4 ring-indigo-500 border-indigo-500 shadow-xl' : 'border-slate-200 hover:border-slate-300'
      }`}
      style={{
        boxSizing: 'border-box'
      }}
    >
      {/* Page Body Content */}
      <div className="w-full h-full flex-1 flex flex-col">
        {page.type === 'cover' && <CoverPageRenderer book={book} />}
        {page.type === 'learning' && <LearningPageRenderer page={page} ageGroup={book.ageGroup} />}
        {page.type === 'tracing' && <TracingPageRenderer page={page} ageGroup={book.ageGroup} />}
        {page.type === 'coloring' && <ColoringPageRenderer page={page} />}
        {page.type === 'activity' && <ActivityPageRenderer page={page} />}
        {page.type === 'guide' && <GuidePageRenderer page={page} ageGroup={book.ageGroup} />}
      </div>

      {/* Page Footer Header details for non-cover pages */}
      {page.type !== 'cover' && showPageNumber && (
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400 select-none">
          <span>{book.title}</span>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-bold font-mono text-xs">
            Page {page.pageNumber} of {book.pages.length}
          </span>
          <span>KidsBook AI</span>
        </div>
      )}
    </div>
  );
};
