import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones en español
import authES from './locales/es/auth.json';
import boletinesES from './locales/es/boletines.json';
import commonES from './locales/es/common.json';
import footerES from './locales/es/footer.json';
import homeES from './locales/es/home.json';
import navbarES from './locales/es/navbar.json';
import profileES from './locales/es/profile.json';
import adminES from './locales/es/admin.json';

// Traducciones en inglés
import authEN from './locales/en/auth.json';
import boletinesEN from './locales/en/boletines.json';
import commonEN from './locales/en/common.json';
import footerEN from './locales/en/footer.json';
import homeEN from './locales/en/home.json';
import navbarEN from './locales/en/navbar.json';
import profileEN from './locales/es/profile.json';
import adminEN from './locales/en/admin.json';

i18n
  .use(LanguageDetector) // Detecta idioma del navegador
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        auth: authES,
        boletines: boletinesES,
        common: commonES,
        footer: footerES,
        home: homeES,
        navbar: navbarES,
        profile: profileES,
        admin: adminES,
      },
      en: {
        auth: authEN,
        boletines: boletinesEN,
        common: commonEN,
        footer: footerEN,
        home: homeEN,
        navbar: navbarEN,
        profile: profileEN,
        admin: adminEN,
      },
    },
    fallbackLng: 'es', // Idioma por defecto si no se detecta
    debug: false,
    ns: ['common', 'auth', 'boletines', 'footer', 'home', 'navbar', 'profile', 'admin'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
