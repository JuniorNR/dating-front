import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import announcementEn from './en/announcement.json';
import commonEn from './en/common.json';
import formEn from './en/form.json';
import roleEn from './en/role.json';
import validationEn from './en/validation.json';
import announcementRu from './ru/announcement.json';
import commonRu from './ru/common.json';
import formRu from './ru/form.json';
import roleRu from './ru/role.json';
import validationRu from './ru/validation.json';

const resources: Record<
	string,
	{
		announcement: typeof announcementEn;
		common: typeof commonEn;
		form: typeof formEn;
		role: typeof roleEn;
		validation: typeof validationEn;
	}
> = {
	en: {
		announcement: announcementEn,
		common: commonEn,
		form: formEn,
		role: roleEn,
		validation: validationEn,
	},
	ru: {
		announcement: announcementRu,
		common: commonRu,
		form: formRu,
		role: roleRu,
		validation: validationRu,
	},
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		detection: {
			lookupCookie: 'locale',
			order: [
				'cookie',
				'localStorage',
				'navigator',
			],
			caches: [
				'cookie',
				'localStorage',
			],
		},
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
