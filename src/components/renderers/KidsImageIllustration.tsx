import React, { useState, useEffect } from 'react';

interface KidsImageProps {
  emoji: string;
  word?: string; // Word used to search for real HD photography
  className?: string;
  style?: React.CSSProperties;
  size?: number; // Size in pixels
  usePhoto?: boolean; // Force high-definition real life photograph from Unsplash
}

// 📸 CURATED, REDIRECT-FREE ULTRA-HD STATIC PHOTOGRAPHS FOR ALL CORE WORDS (Unsplash Source Direct)
// This completely bypasses any iframe sandbox redirects and loads instantly!
const STATIC_PHOTO_MAP: Record<string, string> = {
  // Alphabet & Fruits
  apple: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=300&h=300&q=80',
  banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&h=300&q=80',
  orange: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=300&h=300&q=80',
  mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&h=300&q=80',
  strawberry: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=300&h=300&q=80',
  grapes: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=300&h=300&q=80',
  watermelon: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=300&h=300&q=80',
  pineapple: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=300&h=300&q=80',
  cherry: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=300&h=300&q=80',
  peach: 'https://images.unsplash.com/photo-1603052875302-d376b7c0638a?auto=format&fit=crop&w=300&h=300&q=80',
  pomegranate: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&h=300&q=80',
  lemon: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=300&h=300&q=80',

  // Animals
  cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&h=300&q=80',
  dog: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&h=300&q=80',
  elephant: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=300&h=300&q=80',
  fish: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=300&h=300&q=80',
  goat: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=300&h=300&q=80',
  lion: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=300&h=300&q=80',
  monkey: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=300&h=300&q=80',
  penguin: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60?auto=format&fit=crop&w=300&h=300&q=80',
  rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=300&h=300&q=80',
  tiger: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&w=300&h=300&q=80',
  zebra: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&w=300&h=300&q=80',
  giraffe: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=300&h=300&q=80',
  kangaroo: 'https://images.unsplash.com/photo-1531043322228-e126f28e33be?auto=format&fit=crop&w=300&h=300&q=80',
  panda: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=300&h=300&q=80',
  koala: 'https://images.unsplash.com/photo-1591824438708-ce405f36bc32?auto=format&fit=crop&w=300&h=300&q=80',
  duck: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=300&h=300&q=80',
  butterfly: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?auto=format&fit=crop&w=300&h=300&q=80',

  // Alphabet Objects
  ball: 'https://images.unsplash.com/photo-1589801258579-18e0ae1d7ad7?auto=format&fit=crop&w=300&h=300&q=80',
  hat: 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?auto=format&fit=crop&w=300&h=300&q=80',
  igloo: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=300&h=300&q=80',
  jelly: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=300&h=300&q=80',
  kite: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=300&h=300&q=80',
  nest: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=300&h=300&q=80',
  queen: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=300&h=300&q=80',
  sun: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=300&h=300&q=80',
  umbrella: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=300&h=300&q=80',
  violin: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=300&h=300&q=80',
  watch: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=300&h=300&q=80',
  xylophone: 'https://images.unsplash.com/photo-1555169062-013468b47731?auto=format&fit=crop&w=300&h=300&q=80',
  yacht: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=300&h=300&q=80',

  // Vegetables
  carrot: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=300&h=300&q=80',
  potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&h=300&q=80',
  tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&h=300&q=80',
  broccoli: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=300&h=300&q=80',
  cucumber: 'https://images.unsplash.com/photo-1604974653724-aa924f0c436d?auto=format&fit=crop&w=300&h=300&q=80',
  onion: 'https://images.unsplash.com/photo-1508747703725-719ae257c14a?auto=format&fit=crop&w=300&h=300&q=80',
  garlic: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=300&h=300&q=80',
  spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&h=300&q=80',
  pea: 'https://images.unsplash.com/photo-1587049352851-8d4e89134292?auto=format&fit=crop&w=300&h=300&q=80',
  corn: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=300&h=300&q=80',

  // Shapes
  circle: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&h=300&q=80',
  square: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=300&h=300&q=80',
  triangle: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=300&h=300&q=80',
  star: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=300&h=300&q=80',
  heart: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&h=300&q=80',

  // Other Kids Words
  balloon: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=300&h=300&q=80',
  toy: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=300&h=300&q=80',
  car: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&h=300&q=80',
  airplane: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&h=300&q=80',
  train: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=300&h=300&q=80',
  flower: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=300&h=300&q=80',
  tree: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=300&h=300&q=80'
};

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

  // RESET error states when search parameters change!
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

    // First, check if we have a direct, pre-curated redirect-free static URL
    const curatedUrl = STATIC_PHOTO_MAP[cleanWord];
    const unsplashUrl = curatedUrl || `https://images.unsplash.com/featured/300x300/?${encodeURIComponent(cleanWord)},isolated,kids`;

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
