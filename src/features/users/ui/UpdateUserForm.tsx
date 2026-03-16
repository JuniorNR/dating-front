import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useUsersStore } from '@/entities/users';
import { FieldFormError, FieldGroup } from '@/shared/ui/field';
import { Input } from '@/widgets';
import { getUpdateUserSchema, UpdateUserFormType } from '../model/users.schema';
import { UpdateUserFormProps } from '../model/users.types';

export const UpdateUserForm: FC<UpdateUserFormProps> = ({ user, formId, onLoading, onSuccess }) => {
	const { t: tValidation } = useTranslation('validation');
	const { t: tForm } = useTranslation('form');
	const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

	const { update } = useUsersStore();

	const { handleSubmit, control } = useForm<UpdateUserFormType>({
		resolver: zodResolver(getUpdateUserSchema(tValidation)),
		defaultValues: {
			username: user.username,
			email: user.email,
		},
	});
	const clearFormError = () => setFormErrorMessage((prev) => (prev ? null : prev));

	const onSubmit: SubmitHandler<UpdateUserFormType> = async (data) => {
		onLoading?.(true);
		await update(user.id, data);
		const apiError = useUsersStore.getState().error;
		if (apiError) {
			setFormErrorMessage(apiError.message);
			onLoading?.(false);
			return;
		}
		onSuccess?.();
		onLoading?.(false);
	};

	return (
		<form
			id={formId}
			onSubmit={handleSubmit(onSubmit)}
		>
			<FieldGroup className="mb-5">
				<Controller
					name="username"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							onChange={(e) => {
								field.onChange(e);
								clearFormError();
							}}
							label={tForm('username.label')}
							placeholder={tForm('username.placeholder')}
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
							onChange={(e) => {
								field.onChange(e);
								clearFormError();
							}}
							label={tForm('email.label')}
							placeholder={tForm('email.placeholder')}
							error={fieldState.error?.message}
						/>
					)}
				/>
			</FieldGroup>
			<div className="mt-4">
				<FieldFormError message={formErrorMessage} />
			</div>
		</form>
	);
};
