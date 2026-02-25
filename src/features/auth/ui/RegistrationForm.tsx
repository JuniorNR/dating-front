import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/entities/user';
import { useAuthControllerRegistration } from '@/shared/api/ApiGenerated';
import { ApiError } from '@/shared/api/apiFetch';
import { publicRoutes } from '@/shared/constants';
import { FieldFormError, FieldGroup } from '@/shared/ui/field';
import { Input } from '@/widgets';
import { getRegistrationSchema, RegistrationFormType } from '../model/auth.schema';
import { RegistrationFormProps } from '../model/auth.types';

export const RegistrationForm: FC<RegistrationFormProps> = ({ formId, onSuccess, onLoading }) => {
	const pathname = usePathname();
	const { t: tValidation } = useTranslation('validation');
	const { t: tForm } = useTranslation('form');
	const router = useRouter();
	const { checkAuth } = useUserStore();
	const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

	const { handleSubmit, control, watch } = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
		resolver: zodResolver(getRegistrationSchema(tValidation)),
	});

	useEffect(() => {
		const subscription = watch(() => {
			setFormErrorMessage(null);
		});

		return () => subscription.unsubscribe();
	}, [
		watch,
	]);

	const { mutate } = useAuthControllerRegistration<ApiError, RegistrationFormType>({
		mutation: {
			onError: (error) => {
				setFormErrorMessage(error.message);
				onLoading(false);
			},
			onSuccess: () => {
				onSuccess();
				onLoading(false);
				checkAuth();
				if (publicRoutes.includes(pathname)) {
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
