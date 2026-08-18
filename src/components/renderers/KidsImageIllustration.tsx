import React, { useState, useEffect } from 'react';

interface KidsImageProps {
  emoji: string;
  word?: string; // Word used to search for real HD photography
  className?: string;
  style?: React.CSSProperties;
  size?: number; // Size in pixels
  usePhoto?: boolean; // Force high-definition real life photograph from Unsplash
}

export const KidsImageIllustration: React.FC<KidsImageProps> = ({ 
  emoji, 
  word,
  className = '', 
  style,
  size = 130,
  usePhoto = false
}) => {
  const [photoError, setPhotoError] = useState(false);
  const [svgError, setSvgError] = useState(false);

  // RESET error states when search parameters change! (CRITICAL FIX FOR TOGGLING)
  useEffect(() => {
    setPhotoError(false);
    setSvgError(false);
  }, [usePhoto, word, emoji]);

  if (!emoji && !word) return null;

  // 1. Layer 1: Try Real HD Photograph (if usePhoto is enabled and word is provided)
  if (usePhoto && word && !photoError) {
    // Strip punctuation and split by spaces/slashes to get the single core keyword
    const cleanWord = word
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
      .trim()
      .split(' ')[0]
      .toLowerCase();

    // Use a curated query parameter for isolated, white background kids-friendly images
    // Removing referrerPolicy="no-referrer" to allow Unsplash's CDN to verify referrer and avoid 403 blocks
    const unsplashUrl = `https://images.unsplash.com/featured/300x300/?${encodeURIComponent(cleanWord)},isolated,kids`;

    return (
      <img
        src={unsplashUrl}
        alt={word}
        className={`${className} object-cover select-none rounded-2xl border-4 border-slate-100 shadow-md transition-transform duration-300 hover:scale-105`}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          maxWidth: '100%',
          maxHeight: '100%',
          aspectRatio: '1/1',
          ...style 
        }}
        onError={() => {
          console.warn(`Unsplash photo load failed for [${cleanWord}]. Falling back to vector illustration.`);
          setPhotoError(true);
        }}
      />
    );
  }

  // Convert emoji to uppercase hex string (e.g. "🍎" -> "1F34E")
  const getUnicodeHex = (str: string): string => {
    try {
      const codePoints = Array.from(str).map(char => char.codePointAt(0));
      // Filter out variant selectors (like FE0F) to ensure matching with standard OpenMoji files
      const cleanCodePoints = codePoints.filter(cp => cp && cp !== 0xFE0F);
      return cleanCodePoints
        .map(cp => cp!.toString(16).toUpperCase())
        .join('-');
    } catch (e) {
      return '';
    }
  };

  const hex = emoji ? getUnicodeHex(emoji) : '';
  
  // 2. Layer 2: Load gorgeous, hand-drawn vector SVG artwork from OpenMoji
  const openMojiUrl = hex 
    ? `https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/svg/${hex}.svg`
    : '';

  if (openMojiUrl && !svgError) {
    return (
      <img
        src={openMojiUrl}
        alt={emoji}
        className={`${className} object-contain select-none transition-transform duration-300 hover:scale-110 active:scale-95`}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          maxWidth: '100%',
          maxHeight: '100%',
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.08))',
          ...style 
        }}
        referrerPolicy="no-referrer"
        onError={() => setSvgError(true)}
      />
    );
  }

  // 3. Layer 3: Text emoji fallback
  return (
    <span 
      className={`select-none inline-block ${className}`} 
      style={{ 
        fontSize: `${size * 0.8}px`, 
        lineHeight: 1,
        ...style 
      }}
    >
      {emoji || '⭐'}
    </span>
  );
};
