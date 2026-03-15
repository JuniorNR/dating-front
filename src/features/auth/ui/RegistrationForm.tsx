import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuthUserStore } from '@/entities/authUser';
import { useAuthControllerRegistration } from '@/shared/api/ApiGenerated';
import { ApiError } from '@/shared/api/apiFetch';
import { PUBLIC_ROUTES } from '@/shared/constants';
import { FieldFormError, FieldGroup } from '@/shared/ui/field';
import { Input } from '@/widgets';
import { getRegistrationSchema, RegistrationFormType } from '../model/auth.schema';
import { RegistrationFormProps } from '../model/auth.types';

export const RegistrationForm: FC<RegistrationFormProps> = ({ formId, onSuccess, onLoading }) => {
	const pathname = usePathname();
	const { t: tValidation } = useTranslation('validation');
	const { t: tForm } = useTranslation('form');
	const router = useRouter();
	const { checkAuth } = useAuthUserStore();
	const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

	const { handleSubmit, control } = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
		resolver: zodResolver(getRegistrationSchema(tValidation)),
	});
	const clearFormError = () => setFormErrorMessage((prev) => (prev ? null : prev));

	const { mutate } = useAuthControllerRegistration<ApiError, RegistrationFormType>({
		mutation: {
			onError: (error) => {
				setFormErrorMessage(error.message);
				onLoading(false);
			},
			onSuccess: () => {
				onSuccess?.();
				onLoading(false);
				checkAuth();
				if (PUBLIC_ROUTES.includes(pathname)) {
					router.push(pathname);
				} else {
					router.push('/');
				}
			},
		},
	});

	const onSubmit: SubmitHandler<RegistrationFormType> = (data) => {
		mutate({
			data,
		});
	};

	return (
		<form
			id={formId}
			onSubmit={handleSubmit(onSubmit)}
		>
			<FieldGroup>
				<Controller
					name="username"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							onChange={(event) => {
								field.onChange(event);
								clearFormError();
							}}
							label={tForm('username.label')}
							autoComplete="username"
							placeholder={tForm('username.placeholder')}
							description={tForm('username.example')}
							error={fieldState.error?.message}
						/>
					)}
				/>
				<Controller
					name="email"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							onChange={(event) => {
								field.onChange(event);
								clearFormError();
							}}
							label={tForm('email.label')}
							autoComplete="email"
							placeholder={tForm('email.placeholder')}
							description={tForm('email.example')}
							error={fieldState.error?.message}
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							onChange={(event) => {
								field.onChange(event);
								clearFormError();
							}}
							label={tForm('password.label')}
							autoComplete="current-password"
							placeholder={tForm('password.placeholder')}
							description={tForm('password.example')}
							error={fieldState.error?.message}
						/>
					)}
				/>
				<FieldFormError message={formErrorMessage} />
			</FieldGroup>
		</form>
	);
};
