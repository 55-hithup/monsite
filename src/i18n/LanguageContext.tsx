import { createContext, useContext, useEffect, type ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isEn: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  setLanguage: () => {},
  isEn: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'fr';
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language: 'fr',
        setLanguage: () => {},
        isEn: false,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

