import { TFunction } from 'i18next';
import { z } from 'zod';

export const getUpdateRoleSchema = (tValidation: TFunction<'validation'>) => {
	return z.object({
		name: z.string().min(
			3,
			tValidation('minSymbols', {
				count: 3,
			}),
		),
		type: z.string().min(
			3,
			tValidation('minSymbols', {
				count: 3,
			}),
		).regex(/^[^\u0400-\u04FF]+$/, tValidation('noCyrillic')),
		description: z.string().min(
			10,
			tValidation('minSymbols', {
				count: 10,
			}),
		),
	});
};

export const getCreateRoleSchema = (tValidation: TFunction<'validation'>) => {
	return z.object({
		name: z.string().min(
			3,
			tValidation('minSymbols', {
				count: 3,
			}),
		),
		type: z.string().min(
			3,
			tValidation('minSymbols', {
				count: 3,
			}),
		).regex(/^[^\u0400-\u04FF]+$/, tValidation('noCyrillic')),
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
