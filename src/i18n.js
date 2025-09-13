import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationRU from "./locales/ru.json";
import translationKY from "./locales/ky.json";

const resources = {
  ru: { translation: translationRU },
  ky: { translation: translationKY },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru", // Язык по умолчанию
  interpolation: { escapeValue: false },
});

export default i18n;
