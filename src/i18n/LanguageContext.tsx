import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isEnglishPath, getAlternatePath } from './urlMapping';

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
  const location = useLocation();
  const navigate = useNavigate();

  const isEn = isEnglishPath(location.pathname);
  const language: Language = isEn ? 'en' : 'fr';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (targetLang: Language) => {
    if (targetLang === language) return;
    const targetPath = getAlternatePath(location.pathname + location.hash, targetLang);
    navigate(targetPath);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isEn,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

