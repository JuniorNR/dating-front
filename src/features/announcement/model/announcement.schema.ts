import { TFunction } from 'i18next';
import { z } from 'zod';

export const getCreateAnnouncementSchema = (tValidation: TFunction<'validation'>) => {
	return z.object({
		categoryId: z.number(tValidation('requiredField')),
		authorId: z.number().int(tValidation('mustBeInteger')).positive(tValidation('mustBePositive')),
		translations: z
			.array(
				z.object({
					locale: z
						.string()
						.length(
							2,
							tValidation('exactSymbols', {
								count: 2,
							}),
						)
						.regex(/^(ru|en)$/i, tValidation('unsupportedLocale')),
					title: z
						.string()
						.trim()
						.min(
							3,
							tValidation('minSymbols', {
								count: 3,
							}),
						)
						.max(
							120,
							tValidation('maxSymbols', {
								count: 120,
							}),
						),
					content: z
						.string()
						.trim()
						.min(
							10,
							tValidation('minSymbols', {
								count: 10,
							}),
						)
						.max(
							2000,
							tValidation('maxSymbols', {
								count: 2000,
							}),
						),
				}),
			)
			.min(
				1,
				tValidation('minItems', {
					count: 2,
				}),
			)
			.superRefine((translations, ctx) => {
				const locales = translations.map((translation) => translation.locale.toLowerCase());

				locales.forEach((locale, index) => {
					if (locales.indexOf(locale) !== index) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							path: [
								index,
								'locale',
							],
							message: tValidation('duplicateLocale'),
						});
					}
				});
			}),
	});
};

export const getUpdateAnnouncementSchema = (tValidation: TFunction<'validation'>) => {
	return z.object({
		categoryId: z.number(tValidation('requiredField')),
		authorId: z.number().int(tValidation('mustBeInteger')).positive(tValidation('mustBePositive')),
		translations: z
			.array(
				z.object({
					locale: z
						.string()
						.length(
							2,
							tValidation('exactSymbols', {
								count: 2,
							}),
						)
						.regex(/^(ru|en)$/i, tValidation('unsupportedLocale')),
					title: z
						.string()
						.trim()
						.min(
							3,
							tValidation('minSymbols', {
								count: 3,
							}),
						)
						.max(
							120,
							tValidation('maxSymbols', {
								count: 120,
							}),
						),
					content: z
						.string()
						.trim()
						.min(
							10,
							tValidation('minSymbols', {
								count: 10,
							}),
						)
						.max(
							2000,
							tValidation('maxSymbols', {
								count: 2000,
							}),
						),
				}),
			)
			.min(
				1,
				tValidation('minItems', {
					count: 2,
				}),
			)
			.superRefine((translations, ctx) => {
				const locales = translations.map((translation) => translation.locale.toLowerCase());

				locales.forEach((locale, index) => {
					if (locales.indexOf(locale) !== index) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							path: [
								index,
								'locale',
							],
							message: tValidation('duplicateLocale'),
						});
					}
				});
			}),
	});
};

export type CreateAnnouncementFormType = z.infer<ReturnType<typeof getCreateAnnouncementSchema>>;
export type UpdateAnnouncementFormType = z.infer<ReturnType<typeof getUpdateAnnouncementSchema>>;
