import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAnnouncementStore } from '@/entities/announcement';
import { useAnnouncementCategoryStore } from '@/entities/announcementCategory';
import { FieldFormError, FieldGroup, FieldLegend } from '@/shared/ui/field';
import { Input } from '@/widgets';
import { Select } from '@/widgets/Select';
import { getCreateAnnouncementSchema, UpdateAnnouncementFormType } from '../model/announcement.schema';
import { UpdateAnnouncementFormProps } from '../model/announcement.types';

export const UpdateAnnouncementForm: FC<UpdateAnnouncementFormProps> = ({ announcement, formId, onLoading, onSuccess }) => {
	const { i18n, t: tValidation } = useTranslation('validation');
	const { t: tForm } = useTranslation('form');
	const { t: tAnnouncement } = useTranslation('announcement');
	const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

	const { update } = useAnnouncementStore();
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

	const { handleSubmit, control } = useForm<UpdateAnnouncementFormType>({
		resolver: zodResolver(getCreateAnnouncementSchema(tValidation)),
		defaultValues: {
			authorId: announcement?.authorId,
			categoryId: announcement?.categoryId,
			translations: [
				{
					locale: 'ru',
					content: announcement?.translations[0].content,
					title: announcement?.translations[0].title,
				},
				{
					locale: 'en',
					content: announcement?.translations[1].content,
					title: announcement?.translations[1].title,
				},
			],
		},
	});
	const clearFormError = () => setFormErrorMessage((prev) => (prev ? null : prev));

	const onSubmit: SubmitHandler<UpdateAnnouncementFormType> = async (data) => {
		onLoading?.(true);
		await update(announcement?.id ?? 0, data);
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
					<FieldLegend>{tAnnouncement('UpdateAnnouncementForm.translations.legendRu')}</FieldLegend>
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
					<FieldLegend>{tAnnouncement('UpdateAnnouncementForm.translations.legendEn')}</FieldLegend>
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
