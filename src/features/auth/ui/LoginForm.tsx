'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { type FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/entities/user';
import { useAuthControllerLogin } from '@/shared/api/ApiGenerated';
import { ApiError } from '@/shared/api/apiFetch';
import { publicRoutes } from '@/shared/constants';
import { FieldFormError, FieldGroup } from '@/shared/ui/field';
import { Input } from '@/widgets';
import { getLoginSchema, LoginFormType } from '../model/auth.schema';
import { LoginFormProps } from '../model/auth.types';

export const LoginForm: FC<LoginFormProps> = ({ formId, onSuccess, onLoading }) => {
	const pathname = usePathname();
	const { t: tValidation } = useTranslation('validation');
	const { t: tForm } = useTranslation('form');
	const router = useRouter();
	const { checkAuth } = useUserStore();
	const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

	const { handleSubmit, control, watch } = useForm<LoginFormType>({
		resolver: zodResolver(getLoginSchema(tValidation)),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	useEffect(() => {
		const subscription = watch(() => {
			setFormErrorMessage(null);
		});

		return () => subscription.unsubscribe();
	}, [
		watch,
	]);

	const { mutate } = useAuthControllerLogin<ApiError>({
		mutation: {
			onError: (error) => {
				setFormErrorMessage(error.message);
				onLoading?.(false);
			},
			onSuccess: () => {
				onSuccess?.();
				onLoading?.(false);
				checkAuth();
				if (publicRoutes.includes(pathname)) {
					router.push(pathname);
				} else {
					router.push('/');
				}
			},
		},
	});

	const onSubmit: SubmitHandler<LoginFormType> = (data) => {
		onLoading?.(true);
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
