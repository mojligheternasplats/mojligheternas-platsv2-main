'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import i18n from '@/lib/i18n';

type Language = 'en' | 'sv';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('sv');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && ['en', 'sv'].includes(storedLanguage)) {
      setLanguageState(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    } else {
      i18n.changeLanguage('sv');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };
  
  const t = (key: string) => i18n.t(key);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
