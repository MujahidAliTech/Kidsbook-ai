import React from 'react';
import { Book } from '../types';
import { CoverPageRenderer } from './renderers/CoverPageRenderer';
import { LearningPageRenderer } from './renderers/LearningPageRenderer';
import { TracingPageRenderer } from './renderers/TracingPageRenderer';
import { ColoringPageRenderer } from './renderers/ColoringPageRenderer';
import { ActivityPageRenderer } from './renderers/ActivityPageRenderer';
import { GuidePageRenderer } from './renderers/GuidePageRenderer';

interface Props {
  book: Book;
}

export const PrintLayout: React.FC<Props> = ({ book }) => {
  return (
    <div className="print-only">
      {book.pages.map((page) => (
        <div key={page.id} className="print-page bg-white p-6 relative flex flex-col justify-between">
          <div className="w-full h-full flex-1 flex flex-col">
            {page.type === 'cover' && <CoverPageRenderer book={book} />}
            {page.type === 'learning' && <LearningPageRenderer page={page} ageGroup={book.ageGroup} />}
            {page.type === 'tracing' && <TracingPageRenderer page={page} ageGroup={book.ageGroup} />}
            {page.type === 'coloring' && <ColoringPageRenderer page={page} />}
            {page.type === 'activity' && <ActivityPageRenderer page={page} />}
            {page.type === 'guide' && <GuidePageRenderer page={page} ageGroup={book.ageGroup} />}
          </div>

          {page.type !== 'cover' && (
            <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-medium text-slate-400">
              <span>{book.title}</span>
              <span>
                Page {page.pageNumber} of {book.pages.length}
              </span>
              <span>KidsBook AI</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
