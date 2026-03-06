'use client';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnnouncementStore } from '@/entities/announcement';
import { useUserStore } from '@/entities/user';
import { CreateAnnouncementForm } from '@/features';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/widgets/Modal';
import { AnnouncementsItem } from './AnnouncementsItem';

export const Announcements: FC = () => {
	const allowedRoles = [
		'admin',
		'super-user',
	];
	const { t: tAnnouncement } = useTranslation('announcement');
	const { items: announcements, getAll, isLoading, isInitialized, remove } = useAnnouncementStore();
	const { user, roles } = useUserStore();

	const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false);
	const [isLoadingCreateForm, setIsLoadingCreateForm] = useState<boolean>(false);

	const canEditAnnouncementPermission = () => {
		return roles.some((role) => {
			return allowedRoles.includes(role);
		});
	};

	useEffect(() => {
		getAll();
	}, [
		getAll,
	]);

	return (
		<section className="h-full overflow-hidden rounded-3xl border bg-card p-4 text-card-foreground sm:p-6">
			<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{tAnnouncement('Announcements.title')}</h1>
					<p className="mt-1 text-sm text-muted-foreground">{tAnnouncement('Announcements.description')}</p>
				</div>
				<Modal
					formId="create-announcement"
					openText={tAnnouncement('Announcements.createButton')}
					title={tAnnouncement('CreateAnnouncementForm.modal.title')}
					isOpen={isOpenCreateForm}
					setIsOpen={setIsOpenCreateForm}
					isLoading={isLoadingCreateForm}
					renderTrigger={
						<Button
							type="button"
							variant="outline"
							size="sm"
						>
							{tAnnouncement('Announcements.createButton')}
						</Button>
					}
				>
					<CreateAnnouncementForm
						formId="create-announcement"
						onLoading={(isLoading) => setIsLoadingCreateForm(isLoading)}
						onSuccess={() => setIsOpenCreateForm(false)}
					/>
				</Modal>
			</div>

			<div className="overflow-auto rounded-2xl border border-border bg-background/40 p-4">
				<div className="space-y-3">
					{!isInitialized && <p className="text-sm text-muted-foreground">{tAnnouncement('Announcements.loading')}</p>}
					{!isLoading && announcements.length === 0 && <p className="text-sm text-muted-foreground">{tAnnouncement('Announcements.empty')}</p>}
					{announcements.map((announcement) => (
						<AnnouncementsItem
							canEdit={canEditAnnouncementPermission() || announcement.authorId === user?.id}
							key={announcement.id}
							announcement={announcement}
							onDelete={remove}
						/>
					))}
				</div>
			</div>
		</section>
	);
};
