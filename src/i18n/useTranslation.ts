import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from './translations';
import type { Translations, Language } from './translations';

export function useTranslation(): { t: Translations; language: Language; toggleLanguage: () => void } {
  const { language, toggleLanguage } = useContext(LanguageContext);
  return { t: translations[language], language, toggleLanguage };
}
