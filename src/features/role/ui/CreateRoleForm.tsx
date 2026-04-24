import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRoleStore } from '@/entities/role';
import { FieldFormError, FieldGroup, FieldLegend } from '@/shared/ui/field';
import { Input } from '@/widgets';
import { CreateRoleFormType, getCreateRoleSchema } from '../model/role.schema';
import { CreateRoleFormProps } from '../model/role.types';

export const CreateRoleForm: FC<CreateRoleFormProps> = ({ formId, onLoading, onSuccess }) => {
	const { t: tValidation } = useTranslation('validation');
	const { t: tForm } = useTranslation('form');
	const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
	const { create } = useRoleStore();

	const { handleSubmit, control } = useForm<CreateRoleFormType>({
		resolver: zodResolver(getCreateRoleSchema(tValidation)),
		defaultValues: {
			type: '',
			translations: [
				{
					locale: 'ru',
					name: '',
					description: '',
				},
				{
					locale: 'en',
					name: '',
					description: '',
				},
			],
		},
	});
	const clearFormError = () => setFormErrorMessage((prev) => (prev ? null : prev));

	const onSubmit: SubmitHandler<CreateRoleFormType> = async (data) => {
		onLoading?.(true);
		await create(data);
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
							placeholder={tForm('role.type.placeholder')}
							description={tForm('role.type.example')}
							error={fieldState.error?.message}
						/>
					)}
				/>
			</FieldGroup>
			<FieldGroup className="flex flex-row gap-5 pt-5">
				<FieldGroup className="w-1/2">
					<FieldLegend>{tForm('legendRu')}</FieldLegend>
					<Controller
						name="translations.0.name"
						control={control}
						render={({ field, fieldState }) => (
							<Input
								{...field}
								onChange={(event) => {
									field.onChange(event);
									clearFormError();
								}}
								label={tForm('role.name.label')}
								placeholder={tForm('role.name.placeholder')}
								description={tForm('role.name.example')}
								error={fieldState.error?.message}
							/>
						)}
					/>
					<Controller
						name="translations.0.description"
						control={control}
						render={({ field, fieldState }) => (
							<Input
								{...field}
								onChange={(event) => {
									field.onChange(event);
									clearFormError();
								}}
								label={tForm('role.description.label')}
								placeholder={tForm('role.description.placeholder')}
								description={tForm('role.description.example')}
								error={fieldState.error?.message}
							/>
						)}
					/>
				</FieldGroup>
				<FieldGroup className="w-1/2">
					<FieldLegend>{tForm('legendEn')}</FieldLegend>
					<Controller
						name="translations.1.name"
						control={control}
						render={({ field, fieldState }) => (
							<Input
								{...field}
								onChange={(event) => {
									field.onChange(event);
									clearFormError();
								}}
								label={tForm('role.name.label')}
								placeholder={tForm('role.name.placeholder')}
								description={tForm('role.name.example')}
								error={fieldState.error?.message}
							/>
						)}
					/>
					<Controller
						name="translations.1.description"
						control={control}
						render={({ field, fieldState }) => (
							<Input
								{...field}
								onChange={(event) => {
									field.onChange(event);
									clearFormError();
								}}
								label={tForm('role.description.label')}
								placeholder={tForm('role.description.placeholder')}
								description={tForm('role.description.example')}
								error={fieldState.error?.message}
							/>
						)}
					/>
				</FieldGroup>
			</FieldGroup>
			<div className="mt-4">
				<FieldFormError message={formErrorMessage} />
			</div>
		</form>
	);
};
