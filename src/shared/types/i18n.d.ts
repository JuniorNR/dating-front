import 'i18next';
import commonEn from '../i18n/en/common.json';
import formEn from '../i18n/en/form.json';
import roleEn from '../i18n/en/role.json';
import validationEn from '../i18n/en/validation.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		resources: {
			common: typeof commonEn;
			form: typeof formEn;
			role: typeof roleEn;
			validation: typeof validationEn;
		};
	}
}
