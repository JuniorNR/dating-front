import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRoleStore } from '@/entities/role';
import { FieldFormError, FieldGroup } from '@/shared/ui/field';
import { Input } from '@/widgets';
import { CreateRoleFormType, getCreateRoleSchema } from '../model/role.schema';
import { CreateRoleFormProps } from '../model/role.types';

export const CreateRoleForm: FC<CreateRoleFormProps> = ({ formId, onLoading, onSuccess }) => {
	const { t: tValidation } = useTranslation('validation');
	const { t: tForm } = useTranslation('form');
	const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
	const { addRole } = useRoleStore();

	const { handleSubmit, control, watch } = useForm<CreateRoleFormType>({
		resolver: zodResolver(getCreateRoleSchema(tValidation)),
		defaultValues: {
			name: '',
			type: '',
			description: '',
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

	const onSubmit: SubmitHandler<CreateRoleFormType> = async (data) => {
		onLoading?.(true);
		await addRole(data);
		onSuccess?.();
		onLoading?.(false);
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
