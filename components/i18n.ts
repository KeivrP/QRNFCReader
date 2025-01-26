import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import esTranslations from '../locales/es.json';
import enTranslations from '../locales/en.json';


// Import translation resources


const resources = {
  es: { translation: esTranslations },
  en: { translation: enTranslations }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale.split('-')[0], // Detect device language
    fallbackLng: 'es', // Fallback to Spanish if language not found
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;