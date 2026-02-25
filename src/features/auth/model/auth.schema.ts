import { TFunction } from 'i18next';
import z from 'zod';

const minUsername = 3;
const minPassword = 10;

export const getLoginSchema = (tValidation: TFunction<'validation'>) => {
	return z.object({
		username: z.string().min(
			minUsername,
			tValidation('minSymbols', {
				count: minUsername,
			}),
		),
		password: z
			.string()
			.regex(/[A-Z]/, tValidation('passwordUppercase'))
			.regex(/[a-z]/, tValidation('passwordLowercase'))
			.regex(/\d/, tValidation('passwordNumber'))
			.regex(/[^A-Za-z0-9]/, tValidation('passwordSpecial'))
			.min(
				minPassword,
				tValidation('minSymbols', {
					count: minPassword,
				}),
			),
	});
};

export const getRegistrationSchema = (tValidation: TFunction<'validation'>) => {
	return z.object({
		username: z.string().min(
			minUsername,
			tValidation('minSymbols', {
				count: minUsername,
			}),
		),
		email: z.email(tValidation('emailIncorrect')),
		password: z.string().min(
			minPassword,
			tValidation('minSymbols', {
				count: minPassword,
			}),
		),
	});
};

export type LoginFormType = z.infer<ReturnType<typeof getLoginSchema>>;
export type RegistrationFormType = z.infer<ReturnType<typeof getRegistrationSchema>>;
