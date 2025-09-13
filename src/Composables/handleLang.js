import i18n from '../plugins/i18n';

export default function useHandleLang() {
  const handleLang = (lang) => {
    i18n.global.locale = lang;
    window.sessionStorage.setItem('app_lang', lang);
  };

  return {
    handleLang,
  };
}
