import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import commonEn from "./en/common.json";
import validationEn from "./en/validation.json";
import commonRu from "./ru/common.json";
import validationRu from "./ru/validation.json";
import { CommonTranslationTypes } from "./types/common.types";
import { ValidationTranslationTypes } from "./types/validation.types";

// Если забудем добавить поле в один из языков,
// здесь появится TypeScript ошибка
const resources: Record<
  string,
  { common: CommonTranslationTypes; validation: ValidationTranslationTypes }
> = {
  en: { common: commonEn, validation: validationEn },
  ru: { common: commonRu, validation: validationRu },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["cookie", "localStorage", "navigator"],
      caches: ["cookie", "localStorage"],
      lookupLocalStorage: "language",
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
