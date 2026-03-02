'use client';
import { FC, useEffect } from 'react';
import { useAnnouncementStore } from '@/entities/announcement';
import { AnnouncementsItem } from './AnnouncementsItem';

export const Announcements: FC = () => {
	const { items: announcements, getAll, isLoading } = useAnnouncementStore();

	useEffect(() => {
		getAll();
	}, [
		getAll,
	]);

	return (
		<section className="h-full overflow-hidden rounded-3xl border bg-card p-4 text-card-foreground sm:p-6">
			<div className="mb-4">
				<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Announcements</h1>
				<p className="mt-1 text-sm text-muted-foreground">Лента объявлений.</p>
			</div>

			<div className="overflow-auto rounded-2xl border border-border bg-background/40 p-4">
				<div className="space-y-3">
					{isLoading && <p className="text-sm text-muted-foreground">Загрузка объявлений...</p>}
					{!isLoading && announcements.length === 0 && <p className="text-sm text-muted-foreground">Объявления пока отсутствуют.</p>}
					{announcements.map((announcement) => (
						<AnnouncementsItem
							key={announcement.id}
							announcement={announcement}
						/>
					))}
				</div>
			</div>
		</section>
	);
};
