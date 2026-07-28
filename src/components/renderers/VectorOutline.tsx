import React from 'react';

interface Props {
  shapeKey?: string;
  word?: string;
  emoji?: string;
}

export const VectorOutline: React.FC<Props> = ({ shapeKey = 'default', word = '', emoji = '🎨' }) => {
  const key = (shapeKey || word || '').toLowerCase().trim();

  // Helper stroke style for thick, crisp printable black line-art
  const strokeProps = {
    stroke: '#0f172a',
    strokeWidth: '3.5',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: '#ffffff',
  };

  // 1. APPLE
  if (key.includes('apple') || key === 'a') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        {/* Main Apple Body */}
        <path d="M60 38 C45 20 20 30 20 60 C20 90 48 108 60 108 C72 108 100 90 100 60 C100 30 75 20 60 38 Z" />
        {/* Stem */}
        <path d="M60 38 Q65 22 72 14" strokeWidth="4" />
        {/* Leaf with vein */}
        <path d="M62 26 C75 16 88 22 84 32 C72 38 64 30 62 26 Z" fill="#ffffff" />
        <path d="M64 27 L78 27" strokeWidth="2" />
        {/* Shine highlight curve */}
        <path d="M32 45 C28 55 28 68 32 76" strokeWidth="2.5" strokeDasharray="3 3" fill="none" />
      </svg>
    );
  }

  // 2. LION
  if (key.includes('lion') || key === 'l') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        {/* Big Fluffy Mane */}
        <path d="M60 12 Q72 15 78 24 Q88 20 94 30 Q104 36 102 48 Q110 58 104 68 Q108 80 98 88 Q92 98 80 98 Q70 106 60 104 Q50 106 40 98 Q28 98 22 88 Q12 80 16 68 Q10 58 18 48 Q16 36 26 30 Q32 20 42 24 Q48 15 60 12 Z" />
        {/* Face */}
        <circle cx="60" cy="58" r="28" fill="#ffffff" />
        {/* Ears */}
        <circle cx="40" cy="38" r="8" />
        <circle cx="80" cy="38" r="8" />
        {/* Eyes */}
        <circle cx="48" cy="52" r="3.5" fill="#0f172a" />
        <circle cx="72" cy="52" r="3.5" fill="#0f172a" />
        {/* Nose & Smile */}
        <path d="M54 62 L66 62 L60 69 Z" fill="#0f172a" />
        <path d="M60 69 L60 74 M54 74 Q60 80 66 74" fill="none" strokeWidth="3" />
        {/* Whiskers */}
        <path d="M36 60 L24 58 M36 65 L22 66" strokeWidth="2" />
        <path d="M84 60 L96 58 M84 65 L98 66" strokeWidth="2" />
      </svg>
    );
  }

  // 3. CAT
  if (key.includes('cat') || key === 'c') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        {/* Pointy Ears */}
        <polygon points="30,45 22,18 48,32" />
        <polygon points="90,45 98,18 72,32" />
        <polygon points="32,40 27,24 44,32" fill="none" strokeWidth="2" />
        <polygon points="88,40 93,24 76,32" fill="none" strokeWidth="2" />
        {/* Head */}
        <circle cx="60" cy="55" r="32" fill="#ffffff" />
        {/* Eyes */}
        <ellipse cx="46" cy="50" rx="4" ry="6" fill="#0f172a" />
        <ellipse cx="74" cy="50" rx="4" ry="6" fill="#0f172a" />
        <circle cx="44" cy="48" r="1.5" fill="#ffffff" />
        <circle cx="72" cy="48" r="1.5" fill="#ffffff" />
        {/* Nose & Mouth */}
        <polygon points="56,60 64,60 60,65" fill="#0f172a" />
        <path d="M60 65 Q54 72 48 68 M60 65 Q66 72 72 68" fill="none" strokeWidth="3" />
        {/* Whiskers */}
        <line x1="28" y1="55" x2="12" y2="52" strokeWidth="2.5" />
        <line x1="28" y1="62" x2="10" y2="64" strokeWidth="2.5" />
        <line x1="92" y1="55" x2="108" y2="52" strokeWidth="2.5" />
        <line x1="92" y1="62" x2="110" y2="64" strokeWidth="2.5" />
        {/* Body & Paws */}
        <path d="M40 82 Q30 110 60 110 Q90 110 80 82" fill="#ffffff" />
        <path d="M48 95 Q52 110 52 110 M68 95 Q68 110 68 110" strokeWidth="2.5" />
      </svg>
    );
  }

  // 4. BUS
  if (key.includes('bus') || key === 'b') {
    return (
      <svg className="w-60 h-48" viewBox="0 0 140 100" {...strokeProps}>
        {/* Bus Body */}
        <rect x="12" y="20" width="116" height="56" rx="10" fill="#ffffff" strokeWidth="4" />
        {/* Bumper / Grill */}
        <rect x="8" y="62" width="124" height="8" rx="3" strokeWidth="3" />
        {/* Windows */}
        <rect x="22" y="28" width="22" height="20" rx="3" strokeWidth="3" />
        <rect x="50" y="28" width="22" height="20" rx="3" strokeWidth="3" />
        <rect x="78" y="28" width="22" height="20" rx="3" strokeWidth="3" />
        <rect x="106" y="28" width="14" height="20" rx="3" strokeWidth="3" />
        {/* Wheels */}
        <circle cx="38" cy="76" r="12" fill="#ffffff" strokeWidth="4" />
        <circle cx="38" cy="76" r="5" fill="#0f172a" />
        <circle cx="102" cy="76" r="12" fill="#ffffff" strokeWidth="4" />
        <circle cx="102" cy="76" r="5" fill="#0f172a" />
        {/* Headlights */}
        <circle cx="18" cy="56" r="4" fill="#0f172a" />
        <circle cx="122" cy="56" r="4" fill="#0f172a" />
        {/* Stripe */}
        <line x1="12" y1="52" x2="128" y2="52" strokeWidth="2.5" strokeDasharray="6 3" />
      </svg>
    );
  }

  // 5. ELEPHANT
  if (key.includes('elephant') || key === 'e') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        {/* Body */}
        <ellipse cx="65" cy="65" rx="35" ry="28" fill="#ffffff" />
        {/* Big Ear */}
        <path d="M48 38 C25 25 15 50 25 72 C35 88 52 75 48 52 Z" fill="#ffffff" strokeWidth="3.5" />
        <path d="M42 45 C30 35 24 55 32 68" strokeWidth="2" fill="none" />
        {/* Head */}
        <circle cx="58" cy="48" r="22" fill="#ffffff" />
        {/* Eye */}
        <circle cx="62" cy="42" r="3.5" fill="#0f172a" />
        {/* Trunk */}
        <path d="M72 52 C90 54 95 38 88 28 C84 22 75 28 82 34 Q82 46 72 48" fill="#ffffff" strokeWidth="3.5" />
        {/* Legs */}
        <rect x="42" y="85" width="12" height="22" rx="4" />
        <rect x="58" y="85" width="12" height="22" rx="4" />
        <rect x="74" y="85" width="12" height="22" rx="4" />
        <rect x="88" y="82" width="10" height="22" rx="4" />
        {/* Tail */}
        <path d="M98 62 Q108 68 106 80" fill="none" strokeWidth="3" />
      </svg>
    );
  }

  // 6. CAR
  if (key.includes('car') || key.includes('gari') || key === 'c') {
    return (
      <svg className="w-60 h-48" viewBox="0 0 140 100" {...strokeProps}>
        {/* Roof & Hood Body */}
        <path d="M15 60 L30 60 L45 35 L95 35 L115 60 L128 60 C134 60 138 65 138 72 L138 78 L8 78 L8 72 C8 65 12 60 15 60 Z" fill="#ffffff" strokeWidth="4" />
        {/* Windows */}
        <path d="M48 40 L68 40 L68 56 L35 56 Z" strokeWidth="3" />
        <path d="M74 40 L92 40 L108 56 L74 56 Z" strokeWidth="3" />
        {/* Door handle */}
        <line x1="72" y1="62" x2="82" y2="62" strokeWidth="3" />
        {/* Wheels */}
        <circle cx="38" cy="78" r="14" fill="#ffffff" strokeWidth="4" />
        <circle cx="38" cy="78" r="6" fill="#0f172a" />
        <circle cx="102" cy="78" r="14" fill="#ffffff" strokeWidth="4" />
        <circle cx="102" cy="78" r="6" fill="#0f172a" />
        {/* Lights */}
        <circle cx="13" cy="66" r="4" fill="#0f172a" />
      </svg>
    );
  }

  // 7. DUCK / BIRD
  if (key.includes('duck') || key.includes('bird') || key === 'd') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        {/* Duck Body */}
        <path d="M30 65 C20 85 45 102 75 100 C98 98 108 80 100 65 C92 50 78 60 65 62 C50 64 35 55 30 65 Z" />
        {/* Head */}
        <circle cx="42" cy="40" r="18" fill="#ffffff" />
        {/* Eye */}
        <circle cx="38" cy="36" r="3" fill="#0f172a" />
        {/* Beak */}
        <path d="M25 40 Q10 42 22 48 Z" fill="#ffffff" strokeWidth="3" />
        {/* Wing */}
        <path d="M55 72 C65 65 85 70 80 85 C70 92 58 82 55 72 Z" fill="#ffffff" strokeWidth="3" />
        {/* Water Ripples */}
        <path d="M15 108 Q30 104 45 108 T75 108 T105 108" fill="none" strokeWidth="3" />
      </svg>
    );
  }

  // 8. FISH
  if (key.includes('fish') || key.includes('machli') || key === 'f') {
    return (
      <svg className="w-60 h-48" viewBox="0 0 130 90" {...strokeProps}>
        {/* Fish Body */}
        <path d="M30 45 C45 15 90 15 100 45 C90 75 45 75 30 45 Z" fill="#ffffff" strokeWidth="4" />
        {/* Tail Fin */}
        <path d="M30 45 L10 20 L18 45 L10 70 Z" fill="#ffffff" strokeWidth="3.5" />
        {/* Top & Bottom Fins */}
        <path d="M60 22 Q75 10 80 20" strokeWidth="3" fill="none" />
        <path d="M60 68 Q75 80 80 70" strokeWidth="3" fill="none" />
        {/* Eye */}
        <circle cx="82" cy="38" r="4" fill="#0f172a" />
        <circle cx="80" cy="36" r="1.5" fill="#ffffff" />
        {/* Gills */}
        <path d="M68 28 Q75 45 68 62" fill="none" strokeWidth="3" />
        {/* Scales Pattern */}
        <path d="M50 35 Q55 42 50 50 M40 40 Q45 47 40 55" fill="none" strokeWidth="2.5" strokeDasharray="3 2" />
        {/* Bubbles */}
        <circle cx="112" cy="30" r="4" fill="none" strokeWidth="2" />
        <circle cx="120" cy="18" r="2.5" fill="none" strokeWidth="2" />
      </svg>
    );
  }

  // 9. MANGO / FRUIT
  if (key.includes('mango') || key.includes('aam') || key === 'm') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        {/* Mango Shape */}
        <path d="M55 25 C30 25 18 50 25 80 C32 105 65 108 85 92 C102 75 95 40 70 25 C62 20 58 25 55 25 Z" fill="#ffffff" strokeWidth="4" />
        {/* Stem & Leaf */}
        <path d="M58 24 L58 12" strokeWidth="4" />
        <path d="M58 18 C70 8 85 14 80 24 C70 28 62 22 58 18 Z" fill="#ffffff" strokeWidth="3" />
        {/* Curve Texture Lines */}
        <path d="M38 45 C32 60 38 80 48 88" fill="none" strokeWidth="2.5" strokeDasharray="4 3" />
      </svg>
    );
  }

  // 10. BANANA
  if (key.includes('banana') || key.includes('kela') || key === 'b') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        {/* Banana Curved Body */}
        <path d="M25 30 C30 75 75 100 102 82 C108 78 100 68 90 75 C68 90 38 72 32 35 C30 25 22 24 25 30 Z" fill="#ffffff" strokeWidth="4" />
        {/* Top Stem */}
        <rect x="22" y="18" width="8" height="12" rx="2" fill="#0f172a" />
        {/* Ridge Line */}
        <path d="M26 28 C34 62 72 84 96 78" fill="none" strokeWidth="2.5" />
      </svg>
    );
  }

  // 11. GRAPES
  if (key.includes('grape') || key === 'g') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        {/* Stem & Vine */}
        <path d="M60 12 L60 28 M48 18 Q60 10 72 18" strokeWidth="4" fill="none" />
        <path d="M60 22 C75 12 88 22 80 32 Z" fill="#ffffff" strokeWidth="3" />
        {/* Grapes Cluster Circles */}
        <circle cx="46" cy="38" r="12" />
        <circle cx="74" cy="38" r="12" />
        <circle cx="60" cy="48" r="12" />
        <circle cx="38" cy="58" r="12" />
        <circle cx="60" cy="68" r="12" />
        <circle cx="82" cy="58" r="12" />
        <circle cx="48" cy="80" r="12" />
        <circle cx="72" cy="80" r="12" />
        <circle cx="60" cy="96" r="11" />
      </svg>
    );
  }

  // 12. FLOWER
  if (key.includes('flower') || key.includes('phool')) {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        {/* Stem */}
        <path d="M60 65 L60 112" strokeWidth="5" />
        {/* Leaf */}
        <path d="M60 90 C80 82 85 98 60 102 Z" fill="#ffffff" strokeWidth="3" />
        {/* Center */}
        <circle cx="60" cy="45" r="16" fill="#ffffff" strokeWidth="4" />
        {/* Petals */}
        <circle cx="60" cy="18" r="12" />
        <circle cx="60" cy="72" r="12" />
        <circle cx="33" cy="45" r="12" />
        <circle cx="87" cy="45" r="12" />
        <circle cx="41" cy="26" r="12" />
        <circle cx="79" cy="26" r="12" />
        <circle cx="41" cy="64" r="12" />
        <circle cx="79" cy="64" r="12" />
        {/* Re-draw Center on top */}
        <circle cx="60" cy="45" r="15" fill="#ffffff" strokeWidth="3.5" />
      </svg>
    );
  }

  // 13. ROCKET / SPACE
  if (key.includes('rocket') || key.includes('space') || key.includes('r')) {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        {/* Rocket Body */}
        <path d="M60 12 C40 30 40 75 40 85 L80 85 C80 75 80 30 60 12 Z" fill="#ffffff" strokeWidth="4" />
        {/* Window */}
        <circle cx="60" cy="48" r="12" fill="#ffffff" strokeWidth="3.5" />
        <circle cx="60" cy="48" r="6" fill="#0f172a" />
        {/* Nose Cone Tip */}
        <path d="M60 12 C52 24 68 24 60 12 Z" fill="#0f172a" />
        {/* Fins */}
        <path d="M40 65 L18 88 L40 85 Z" fill="#ffffff" strokeWidth="3" />
        <path d="M80 65 L102 88 L80 85 Z" fill="#ffffff" strokeWidth="3" />
        {/* Flame Thrusters */}
        <path d="M48 85 Q60 112 72 85 Q60 100 48 85 Z" fill="#ffffff" strokeWidth="3" />
      </svg>
    );
  }

  // 14. STAR
  if (key.includes('star') || key === 's') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        <polygon points="60,10 74,42 108,44 82,68 90,102 60,84 30,102 38,68 12,44 46,42" fill="#ffffff" strokeWidth="4" />
        {/* Cute Face inside Star */}
        <circle cx="48" cy="52" r="3" fill="#0f172a" />
        <circle cx="72" cy="52" r="3" fill="#0f172a" />
        <path d="M52 62 Q60 68 68 62" fill="none" strokeWidth="3" />
      </svg>
    );
  }

  // 15. HEART
  if (key.includes('heart') || key === 'h') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        <path d="M60 102 C25 72 8 48 24 24 C40 4 60 28 60 28 C60 28 80 4 96 24 C112 48 95 72 60 102 Z" fill="#ffffff" strokeWidth="4" />
        {/* Inner Decorative Heart Outline for double coloring */}
        <path d="M60 88 C32 62 18 42 30 24 C42 8 60 28 60 28 C60 28 78 8 90 24 C102 42 88 62 60 88 Z" fill="none" strokeWidth="2" strokeDasharray="4 3" />
      </svg>
    );
  }

  // 16. SUN
  if (key.includes('sun') || key.includes('sooraj')) {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        <circle cx="60" cy="60" r="28" fill="#ffffff" strokeWidth="4" />
        {/* Sun Rays */}
        <line x1="60" y1="12" x2="60" y2="24" strokeWidth="4" />
        <line x1="60" y1="96" x2="60" y2="108" strokeWidth="4" />
        <line x1="12" y1="60" x2="24" y2="60" strokeWidth="4" />
        <line x1="96" y1="60" x2="108" y2="60" strokeWidth="4" />
        <line x1="26" y1="26" x2="35" y2="35" strokeWidth="4" />
        <line x1="85" y1="85" x2="94" y2="94" strokeWidth="4" />
        <line x1="26" y1="94" x2="35" y2="85" strokeWidth="4" />
        <line x1="85" y1="35" x2="94" y2="26" strokeWidth="4" />
        {/* Face */}
        <circle cx="50" cy="54" r="3" fill="#0f172a" />
        <circle cx="70" cy="54" r="3" fill="#0f172a" />
        <path d="M52 64 Q60 72 68 64" fill="none" strokeWidth="3" />
      </svg>
    );
  }

  // 17. GEOMETRIC SHAPES
  if (key === 'circle') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        <circle cx="60" cy="60" r="48" fill="#ffffff" strokeWidth="4" />
        <circle cx="60" cy="60" r="32" fill="none" strokeWidth="2" strokeDasharray="5 4" />
      </svg>
    );
  }

  if (key === 'square') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        <rect x="16" y="16" width="88" height="88" rx="8" fill="#ffffff" strokeWidth="4" />
        <rect x="30" y="30" width="60" height="60" rx="4" fill="none" strokeWidth="2" strokeDasharray="5 4" />
      </svg>
    );
  }

  if (key === 'triangle') {
    return (
      <svg className="w-56 h-56" viewBox="0 0 120 120" {...strokeProps}>
        <polygon points="60,14 108,98 12,98" fill="#ffffff" strokeWidth="4" />
        <polygon points="60,34 92,88 28,88" fill="none" strokeWidth="2" strokeDasharray="5 4" />
      </svg>
    );
  }

  // FALLBACK GENERAL COLORING CARD WITH BIG OUTLINE LETTER & WORD
  return (
    <div className="w-64 h-64 border-4 border-slate-900 rounded-3xl flex flex-col items-center justify-center p-6 text-center bg-white shadow-xs">
      <div className="text-7xl font-black text-slate-900 font-outline-dotted tracking-widest my-1 select-none">
        {word ? word.slice(0, 3).toUpperCase() : 'A B C'}
      </div>
      <span className="text-7xl my-2 grayscale contrast-200">{emoji || '🎨'}</span>
      <span className="text-xl font-black text-slate-900 tracking-wider uppercase border-t-2 border-slate-200 pt-2 w-full">
        {word || 'Color Me'}
      </span>
    </div>
  );
};
