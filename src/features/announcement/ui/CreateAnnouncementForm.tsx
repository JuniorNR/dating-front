import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAnnouncementStore } from '@/entities/announcement';
import { useAnnouncementCategoryStore } from '@/entities/announcementCategory';
import { useUserStore } from '@/entities/user';
import { FieldFormError, FieldGroup, FieldLegend } from '@/shared/ui/field';
import { Input } from '@/widgets';
import { Select } from '@/widgets/Select';
import { CreateAnnouncementFormType, getCreateAnnouncementSchema } from '../model/announcement.schema';
import { CreateAnnouncementFormProps } from '../model/announcement.types';

export const CreateAnnouncementForm: FC<CreateAnnouncementFormProps> = ({ formId, onLoading, onSuccess }) => {
	const { i18n, t: tValidation } = useTranslation('validation');
	const { t: tForm } = useTranslation('form');
	const { t: tAnnouncement } = useTranslation('announcement');
	const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

	const { user } = useUserStore();
	const { create } = useAnnouncementStore();
	const {
		items: announcementCategories,
		getAll: getAllAnnouncementCategories,
		isInitialized: isAnnouncementCategoriesInitialized,
	} = useAnnouncementCategoryStore();

	useEffect(() => {
		if (!isAnnouncementCategoriesInitialized) {
			getAllAnnouncementCategories();
		}
	}, [getAllAnnouncementCategories, isAnnouncementCategoriesInitialized]);

	const { handleSubmit, control } = useForm<CreateAnnouncementFormType>({
		resolver: zodResolver(getCreateAnnouncementSchema(tValidation)),
		defaultValues: {
			authorId: user?.id,
			categoryId: undefined,
			translations: [
				{
					locale: 'ru',
					content: '',
					title: '',
				},
				{
					locale: 'en',
					content: '',
					title: '',
				},
			],
		},
	});
	const clearFormError = () => setFormErrorMessage((prev) => (prev ? null : prev));

	const onSubmit: SubmitHandler<CreateAnnouncementFormType> = async (data) => {
		onLoading?.(true);
		await create(data);
		const apiError = useAnnouncementStore.getState().error;
		if (apiError) {
			setFormErrorMessage(apiError.message);
			onLoading?.(false);
			return;
		}
		onSuccess?.();
		onLoading?.(false);
	};

	const prepareAnnouncementCategoryToSelectInput = () => {
		return announcementCategories.map((category) => ({
			label: category.translations.find((translation) => translation.locale === i18n.language)?.title ?? '',
			value: category.id,
		}));
	};

	const preparedCategories = prepareAnnouncementCategoryToSelectInput();

	return (
		<form
			id={formId}
			onSubmit={handleSubmit(onSubmit)}
		>
			<FieldGroup className="mb-5">
				<Controller
					name="categoryId"
					control={control}
					render={({ field, fieldState }) => (
						<Select
							{...field}
							onChange={(value) => {
								field.onChange(value);
								clearFormError();
							}}
							label={tForm('announcement.category.label')}
							placeholder={tForm('announcement.category.placeholder')}
							description={tForm('announcement.category.example')}
							error={fieldState.error?.message}
							items={preparedCategories}
						/>
					)}
				/>
			</FieldGroup>
			<FieldGroup className="flex flex-row gap-5">
				<FieldGroup className="w-1/2">
					<FieldLegend>{tAnnouncement('CreateAnnouncementForm.translations.legendRu')}</FieldLegend>
					<Controller
						name="translations.0.title"
						control={control}
						render={({ field, fieldState }) => (
							<Input
								{...field}
							onChange={(event) => {
								field.onChange(event);
								clearFormError();
							}}
								label={tForm('announcement.title.label')}
								placeholder={tForm('announcement.title.placeholder')}
								description={tForm('announcement.title.example')}
								error={fieldState.error?.message}
							/>
						)}
					/>
					<Controller
						name="translations.0.content"
						control={control}
						render={({ field, fieldState }) => (
							<Input
								{...field}
							onChange={(event) => {
								field.onChange(event);
								clearFormError();
							}}
								label={tForm('announcement.content.label')}
								placeholder={tForm('announcement.content.placeholder')}
								description={tForm('announcement.content.example')}
								error={fieldState.error?.message}
							/>
						)}
					/>
				</FieldGroup>
				<FieldGroup className="w-1/2">
					<FieldLegend>{tAnnouncement('CreateAnnouncementForm.translations.legendEn')}</FieldLegend>
					<Controller
						name="translations.1.title"
						control={control}
						render={({ field, fieldState }) => (
							<Input
								{...field}
							onChange={(event) => {
								field.onChange(event);
								clearFormError();
							}}
								label={tForm('announcement.title.label')}
								placeholder={tForm('announcement.title.placeholder')}
								description={tForm('announcement.title.example')}
								error={fieldState.error?.message}
							/>
						)}
					/>
					<Controller
						name="translations.1.content"
						control={control}
						render={({ field, fieldState }) => (
							<Input
								{...field}
							onChange={(event) => {
								field.onChange(event);
								clearFormError();
							}}
								label={tForm('announcement.content.label')}
								placeholder={tForm('announcement.content.placeholder')}
								description={tForm('announcement.content.example')}
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
