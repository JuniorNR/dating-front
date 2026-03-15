import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRoleStore } from '@/entities/role';
import { FieldFormError, FieldGroup } from '@/shared/ui/field';
import { Input } from '@/widgets';
import { getUpdateRoleSchema, UpdateRoleFormType } from '../model/role.schema';
import { UpdateRoleFormProps } from '../model/role.types';

export const UpdateRoleForm: FC<UpdateRoleFormProps> = ({ formId, roleId, onLoading, onSuccess }) => {
	const { t: tValidation } = useTranslation('validation');
	const { t: tForm } = useTranslation('form');
	const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
	const { update, getFromStoreById } = useRoleStore();

	const currentRole = getFromStoreById(roleId);

	const { handleSubmit, control } = useForm<UpdateRoleFormType>({
		resolver: zodResolver(getUpdateRoleSchema(tValidation)),
		defaultValues: {
			name: currentRole?.name,
			type: currentRole?.type,
			description: currentRole?.description,
		},
	});
	const clearFormError = () => setFormErrorMessage((prev) => (prev ? null : prev));

	const onSubmit: SubmitHandler<UpdateRoleFormType> = async (data) => {
		onLoading?.(true);
		await update(roleId, data);
		onLoading?.(false);
		onSuccess?.();
	};

	return (
		<form
			id={formId}
			onSubmit={handleSubmit(onSubmit)}
		>
			<FieldGroup>
				<Controller
					name="name"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							onChange={(event) => {
								field.onChange(event);
								clearFormError();
							}}
							label={tForm('role.name.label')}
							autoComplete="name"
							placeholder={tForm('role.name.placeholder')}
							description={tForm('role.name.example')}
							error={fieldState.error?.message}
						/>
					)}
				/>
				<Controller
					name="type"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							onChange={(event) => {
								field.onChange(event);
								clearFormError();
							}}
							label={tForm('role.type.label')}
							autoComplete="current-password"
							placeholder={tForm('role.type.placeholder')}
							description={tForm('role.type.example')}
							error={fieldState.error?.message}
						/>
					)}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							onChange={(event) => {
								field.onChange(event);
								clearFormError();
							}}
							label={tForm('role.description.label')}
							autoComplete="current-password"
							placeholder={tForm('role.description.placeholder')}
							description={tForm('role.description.example')}
							error={fieldState.error?.message}
						/>
					)}
				/>
				<FieldFormError message={formErrorMessage} />
			</FieldGroup>
		</form>
	);
};
