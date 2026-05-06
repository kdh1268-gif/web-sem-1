'use client';
import { useStore, Language } from '@/store/useStore';

export default function LanguageSwitcher() {
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ko', label: 'KR' },
    { code: 'de', label: 'DE' },
  ];

  return (
    <div className="fixed top-8 right-8 z-[100] flex gap-4">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`font-sans text-xs tracking-widest transition-all duration-300 ${
            language === lang.code 
              ? 'text-gold-dark border-b border-gold-dark' 
              : 'text-foreground/50 hover:text-foreground'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
