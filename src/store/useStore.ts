import { create } from 'zustand';

export type Language = 'ko' | 'en' | 'de';

interface AppState {
  isLoaded: boolean;
  setLoaded: (loaded: boolean) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  currentSection: number;
  setCurrentSection: (section: number) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  sequenceProgress: number;
  setSequenceProgress: (progress: number) => void;
}

export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  currentSection: 0,
  setCurrentSection: (section) => set({ currentSection: section }),
  language: 'ko',
  setLanguage: (lang) => set({ language: lang }),
  sequenceProgress: 0,
  setSequenceProgress: (progress) => set({ sequenceProgress: progress }),
}));
