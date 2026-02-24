import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import commonEn from './en/common.json';
import formEn from './en/form.json';
import validationEn from './en/validation.json';
import commonRu from './ru/common.json';
import formRu from './ru/form.json';
import validationRu from './ru/validation.json';

// import { CommonTranslationTypes } from './types/common.types';
// import { ValidationTranslationTypes } from './types/validation.types';

const resources: Record<
	string,
	{
		common: typeof commonEn;
		form: typeof formEn;
		validation: typeof validationEn;
	}
> = {
	en: {
		common: commonEn,
		form: formEn,
		validation: validationEn,
	},
	ru: {
		common: commonRu,
		form: formRu,
		validation: validationRu,
	},
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		detection: {
			order: [
				'cookie',
				'localStorage',
				'navigator',
			],
			caches: [
				'cookie',
				'localStorage',
			],
			lookupLocalStorage: 'language',
		},
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
