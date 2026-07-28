import React from 'react';
import { BookPage } from '../../types';
import { Award, Star, Sparkles } from 'lucide-react';

interface Props {
  page: BookPage;
}

export const CertificatePageRenderer: React.FC<Props> = ({ page }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 border-8 border-double border-amber-300 rounded-3xl bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 text-center relative overflow-hidden">
      {/* Decorative Corner Stars */}
      <div className="absolute top-3 left-3 text-amber-400 text-2xl">⭐</div>
      <div className="absolute top-3 right-3 text-amber-400 text-2xl">⭐</div>
      <div className="absolute bottom-3 left-3 text-amber-400 text-2xl">⭐</div>
      <div className="absolute bottom-3 right-3 text-amber-400 text-2xl">⭐</div>

      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-black uppercase rounded-full tracking-widest">
          <Sparkles className="w-3 h-3 text-amber-600" />
          <span>Official Certificate of Completion</span>
        </div>
        <h2 className="text-2xl font-black text-amber-900 tracking-tight font-serif pt-1">
          {page.title || 'STAR ACHIEVER AWARD'}
        </h2>
      </div>

      {/* Ribbon Icon */}
      <div className="my-2 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center shadow-lg border-2 border-white">
          <Award className="w-10 h-10 animate-pulse" />
        </div>
      </div>

      {/* Awardee Name Line */}
      <div className="space-y-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">This Certificate is Proudly Presented To</p>
        <div className="p-2 border-b-2 border-dashed border-amber-400 max-w-xs mx-auto">
          <p className="text-xl font-black text-slate-900 font-serif">
            {page.instructions?.replace('Awarded to ', '') || 'Little Superstar'}
          </p>
        </div>
      </div>

      {/* Description Citation */}
      <p className="text-xs font-medium text-slate-700 max-w-sm mx-auto leading-relaxed my-2">
        {page.description || 'For outstanding effort, curiosity, and completing all practice activities with flying colors!'}
      </p>

      {/* Signature Lines */}
      <div className="flex items-center justify-between pt-4 border-t border-amber-200 text-slate-600 text-[10px] font-extrabold px-4">
        <div>
          <div className="w-24 border-b border-slate-400 mb-1" />
          <span>Parent / Teacher</span>
        </div>
        <div className="flex items-center gap-1 text-amber-600 font-black">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>KidsBook AI</span>
        </div>
        <div>
          <div className="w-24 border-b border-slate-400 mb-1" />
          <span>Date</span>
        </div>
      </div>
    </div>
  );
};
