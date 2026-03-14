'use client';

import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UpdateAnnouncementForm } from '@/features/announcement';
import { formatDate } from '@/shared/lib/formatDate';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/widgets/Modal';
import { SimpleModal } from '@/widgets/SimpleModal';
import { AnnouncementsItemProps } from '../model/announcements.types';
import { categoryStripeClass, categoryTextClass } from '../model/announcements.utils';

export const AnnouncementsItem: FC<AnnouncementsItemProps> = ({ announcement, canEdit, onDelete }) => {
	const { i18n, t: tAnnouncement } = useTranslation('announcement');

	const categoryType = announcement.category?.type?.toLowerCase() ?? 'info';
	const stripeClass = categoryStripeClass[categoryType] ?? categoryStripeClass.info;
	const textClass = categoryTextClass[categoryType] ?? categoryTextClass.info;

	const createdAtLabel = formatDate(announcement.createdAt, 'dd.MM.yyyy HH:mm');
	const { author } = announcement;

	const currentAnnouncement = announcement.translations.find((translation) => translation.locale === i18n.language);
	const currentCategoryLocale = announcement.category.translations.find((translation) => translation.locale === i18n.language);

	const [isOpenUpdateAnnouncementForm, setIsOpenUpdateAnnouncementForm] = useState<boolean>(false);
	const [isLoadingUpdateAnnouncementForm, setIsLoadingUpdateAnnouncementForm] = useState<boolean>(false);
	const [isLoadingDeleteAnnouncement, setIsLoadingDeleteAnnouncement] = useState<boolean>(false);

	return (
		<article className="group relative overflow-hidden rounded-xl border border-border bg-card">
			<div className={`h-1 w-full ${stripeClass}`} />
			{canEdit && (
				<>
					<div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-transparent via-black/60 to-black/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100" />
					<div className="absolute right-3 top-3 z-20 flex flex-col items-end gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
						<Modal
							formId={`update-announcement-form-${announcement.id}`}
							openText={tAnnouncement('AnnouncementsItem.editButton')}
							title={tAnnouncement('UpdateAnnouncementForm.modal.title', {
								title: currentAnnouncement?.title ?? '',
							})}
							isOpen={isOpenUpdateAnnouncementForm}
							setIsOpen={setIsOpenUpdateAnnouncementForm}
							isLoading={isLoadingUpdateAnnouncementForm}
							renderTrigger={
								<Button
									type="button"
									variant="outline"
									size="xs"
								>
									{tAnnouncement('AnnouncementsItem.editButton')}
								</Button>
							}
						>
							<UpdateAnnouncementForm
								announcement={announcement}
								formId={`update-announcement-form-${announcement.id}`}
								onLoading={(isLoading) => setIsLoadingUpdateAnnouncementForm(isLoading)}
								onSuccess={() => setIsOpenUpdateAnnouncementForm(false)}
							/>
						</Modal>
						<SimpleModal
							title={tAnnouncement('AnnouncementsItem.deleteModal.title')}
							description={tAnnouncement('AnnouncementsItem.deleteModal.description', {
								title: currentAnnouncement?.title ?? '',
							})}
							isLoading={isLoadingDeleteAnnouncement}
							onSuccess={() => {
								setIsLoadingDeleteAnnouncement(true);
								onDelete(announcement.id);
								setIsLoadingDeleteAnnouncement(false);
							}}
							renderTrigger={
								<Button
									type="button"
									variant="destructive"
									size="xs"
								>
									{tAnnouncement('AnnouncementsItem.deleteButton')}
								</Button>
							}
						/>
						<Button
							type="button"
							variant="outline"
							size="xs"
						>
							Contact with author
						</Button>
					</div>
				</>
			)}
			<div className="p-4">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<h3 className="text-base font-semibold">
						#{announcement.id} {currentAnnouncement?.title}
					</h3>
					<span className="text-xs text-muted-foreground">{createdAtLabel}</span>
				</div>
				<p className="mt-2 text-sm text-muted-foreground">{currentAnnouncement?.content}</p>
				<div className="mt-3 flex flex-wrap items-center justify-between gap-2">
					<p className="text-sm font-semibold tracking-wide text-foreground">@{author.username}</p>
					<p className={`text-sm font-semibold uppercase tracking-wide ${textClass}`}>{currentCategoryLocale?.title}</p>
				</div>
			</div>
		</article>
	);
};
