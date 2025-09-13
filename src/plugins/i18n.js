// src/i18n.js
import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import ur from '../locales/ur.json';

const i18n = createI18n({
  legacy: false,
  locale: window.sessionStorage.getItem('app_lang') || 'ar', // default locale
  fallbackLocale: 'ar', // fallback locale in case the chosen locale isn't available
  messages: {
    en,
    ar,
    ur,
  },
});

export default i18n;
