import React from 'react';

interface Props {
  shapeKey?: string;
  word?: string;
  emoji?: string;
}

export const VectorOutline: React.FC<Props> = ({ shapeKey = 'default', word = '', emoji = '🎨' }) => {
  const key = shapeKey.toLowerCase();

  if (key === 'circle') {
    return (
      <svg className="w-48 h-48 stroke-slate-900 fill-none stroke-[6]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" />
      </svg>
    );
  }

  if (key === 'square') {
    return (
      <svg className="w-48 h-48 stroke-slate-900 fill-none stroke-[6]" viewBox="0 0 100 100">
        <rect x="15" y="15" width="70" height="70" rx="4" />
      </svg>
    );
  }

  if (key === 'triangle') {
    return (
      <svg className="w-48 h-48 stroke-slate-900 fill-none stroke-[6]" viewBox="0 0 100 100">
        <polygon points="50,15 90,80 10,80" />
      </svg>
    );
  }

  if (key === 'rectangle') {
    return (
      <svg className="w-56 h-36 stroke-slate-900 fill-none stroke-[6]" viewBox="0 0 120 80">
        <rect x="10" y="10" width="100" height="60" rx="4" />
      </svg>
    );
  }

  if (key === 'star') {
    return (
      <svg className="w-48 h-48 stroke-slate-900 fill-none stroke-[5]" viewBox="0 0 100 100">
        <polygon points="50,10 61,35 88,35 66,52 75,78 50,62 25,78 34,52 12,35 39,35" />
      </svg>
    );
  }

  if (key === 'heart') {
    return (
      <svg className="w-48 h-48 stroke-slate-900 fill-none stroke-[5]" viewBox="0 0 100 100">
        <path d="M50 85 C20 60 5 40 20 20 C35 5 50 25 50 25 C50 25 65 5 80 20 C95 40 80 60 50 85 Z" />
      </svg>
    );
  }

  if (key === 'apple') {
    return (
      <svg className="w-48 h-48 stroke-slate-900 fill-none stroke-[5]" viewBox="0 0 100 100">
        <path d="M50,30 C30,10 10,35 20,65 C30,90 50,90 50,90 C50,90 70,90 80,65 C90,35 70,10 50,30 Z" />
        <path d="M50,30 C55,20 65,15 65,15" />
        <path d="M50,28 C45,18 35,20 35,20" />
      </svg>
    );
  }

  if (key === 'cat' || key === 'dog' || key === 'lion') {
    return (
      <svg className="w-48 h-48 stroke-slate-900 fill-none stroke-[5]" viewBox="0 0 100 100">
        {/* Cute Animal Outline */}
        <circle cx="50" cy="50" r="30" />
        <polygon points="25,30 15,10 35,25" />
        <polygon points="75,30 85,10 65,25" />
        <circle cx="40" cy="45" r="3" fill="black" />
        <circle cx="60" cy="45" r="3" fill="black" />
        <polygon points="50,53 45,58 55,58" fill="black" />
        <path d="M45,62 Q50,67 55,62" />
      </svg>
    );
  }

  if (key === 'fish') {
    return (
      <svg className="w-52 h-40 stroke-slate-900 fill-none stroke-[5]" viewBox="0 0 100 80">
        <path d="M20,40 C35,15 75,15 80,40 C75,65 35,65 20,40 Z" />
        <polygon points="20,40 5,20 5,60" />
        <circle cx="65" cy="35" r="3" fill="black" />
        <path d="M45,25 Q55,40 45,55" />
      </svg>
    );
  }

  if (key === 'sun') {
    return (
      <svg className="w-48 h-48 stroke-slate-900 fill-none stroke-[5]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="22" />
        <line x1="50" y1="10" x2="50" y2="20" />
        <line x1="50" y1="80" x2="50" y2="90" />
        <line x1="10" y1="50" x2="20" y2="50" />
        <line x1="80" y1="50" x2="90" y2="50" />
        <line x1="22" y1="22" x2="29" y2="29" />
        <line x1="71" y1="71" x2="78" y2="78" />
        <line x1="22" y1="78" x2="29" y2="71" />
        <line x1="71" y1="29" x2="78" y2="22" />
      </svg>
    );
  }

  // Fallback: Large outline card with emoji and bold outline text
  return (
    <div className="w-52 h-52 border-8 border-dashed border-slate-900 rounded-3xl flex flex-col items-center justify-center p-4 text-center bg-white">
      <span className="text-8xl grayscale contrast-200 opacity-90">{emoji}</span>
      <span className="mt-2 text-2xl font-black text-slate-900 uppercase tracking-widest">
        {word}
      </span>
    </div>
  );
};
