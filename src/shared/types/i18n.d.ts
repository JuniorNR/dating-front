import 'i18next';
import announcementEn from '../i18n/en/announcement.json';
import commonEn from '../i18n/en/common.json';
import formEn from '../i18n/en/form.json';
import roleEn from '../i18n/en/role.json';
import validationEn from '../i18n/en/validation.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		resources: {
			announcement: typeof announcementEn;
			common: typeof commonEn;
			form: typeof formEn;
			role: typeof roleEn;
			validation: typeof validationEn;
		};
	}
}
