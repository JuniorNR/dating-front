import { TFunction } from 'i18next';
import { z } from 'zod';

export const getCreateRoleSchema = (tValidation: TFunction<'validation'>) => {
	return z.object({
		type: z
			.string()
			.min(
				3,
				tValidation('minSymbols', {
					count: 3,
				}),
			)
			.regex(/^[^\u0400-\u04FF]+$/, tValidation('noCyrillic')),
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
					name: z
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
					description: z
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
							path: [index, 'locale'],
							message: tValidation('duplicateLocale'),
						});
					}
				});
			}),
	});
	// return z.object({
	// 	name: z.string().min(
	// 		3,
	// 		tValidation('minSymbols', {
	// 			count: 3,
	// 		}),
	// 	),
	// 	description: z.string().min(
	// 		10,
	// 		tValidation('minSymbols', {
	// 			count: 10,
	// 		}),
	// 	),
	// });
};

export const getUpdateRoleSchema = (tValidation: TFunction<'validation'>) => {
	return z.object({
		name: z.string().min(
			3,
			tValidation('minSymbols', {
				count: 3,
			}),
		),
		type: z
			.string()
			.min(
				3,
				tValidation('minSymbols', {
					count: 3,
				}),
			)
			.regex(/^[^\u0400-\u04FF]+$/, tValidation('noCyrillic')),
		description: z.string().min(
			10,
			tValidation('minSymbols', {
				count: 10,
			}),
		),
	});
};

export type UpdateRoleFormType = z.infer<ReturnType<typeof getUpdateRoleSchema>>;
export type CreateRoleFormType = z.infer<ReturnType<typeof getCreateRoleSchema>>;
