import React, { useState } from 'react';

interface KidsImageProps {
  emoji: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number; // Size in pixels
}

export const KidsImageIllustration: React.FC<KidsImageProps> = ({ 
  emoji, 
  className = '', 
  style,
  size = 130 
}) => {
  const [hasError, setHasError] = useState(false);

  if (!emoji) return null;

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

  const hex = getUnicodeHex(emoji);
  
  // Use jsDelivr CDN to load gorgeous, high-definition SVG artwork from OpenMoji
  const openMojiUrl = hex 
    ? `https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/svg/${hex}.svg`
    : '';

  if (openMojiUrl && !hasError) {
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
        onError={() => setHasError(true)}
      />
    );
  }

  // Graceful fallback to gorgeous system emoji if CDN has any connectivity issues
  return (
    <span 
      className={`select-none inline-block ${className}`} 
      style={{ 
        fontSize: `${size * 0.8}px`, 
        lineHeight: 1,
        ...style 
      }}
    >
      {emoji}
    </span>
  );
};
