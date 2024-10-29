//i18n
import i18n from 'i18next';

//React-i18next
import { initReactI18next } from 'react-i18next';

//enstranslate
import { entranslate } from './entranslate';

//frtranslate
import { frtranslate } from './frtranslate';

const resources = {
  en: {
    translation: entranslate,
  },
  fr: {
    translation: frtranslate,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
