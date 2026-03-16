import { TFunction } from 'i18next';
import { z } from 'zod';

export const getUpdateUserSchema = (tValidation: TFunction<'validation'>) => {
	return z.object({
		username: z
			.string()
			.trim()
			.min(
				3,
				tValidation('minSymbols', {
					count: 3,
				}),
			)
			.max(20, tValidation('maxSymbols', { count: 20 })),
		email: z.email(tValidation('emailIncorrect')),
	});
};

export type UpdateUserFormType = z.infer<ReturnType<typeof getUpdateUserSchema>>;
