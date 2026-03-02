'use client';

import { format } from 'date-fns';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AnnouncementsItemProps } from '../model/announcements.types';
import { categoryStripeClass, categoryTextClass } from '../model/announcements.utils';

export const AnnouncementsItem: FC<AnnouncementsItemProps> = ({ announcement }) => {
	const { i18n } = useTranslation();
	const categoryType = announcement.category?.type?.toLowerCase() ?? 'info';
	const stripeClass = categoryStripeClass[categoryType] ?? categoryStripeClass.info;
	const textClass = categoryTextClass[categoryType] ?? categoryTextClass.info;
	const createdAtLabel = format(new Date(announcement.createdAt), 'dd.MM.yyyy HH:mm');
	const authorUsername = announcement.author?.username ?? 'unknown';
	const currentAnnouncement = announcement.translations.find((translation) => translation.locale === i18n.language);
	const currentCategoryLocale = announcement.category.translations.find((translation) => translation.locale === i18n.language);

	return (
		<article className="overflow-hidden rounded-xl border border-border bg-card">
			<div className={`h-1 w-full ${stripeClass}`} />
			<div className="p-4">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<h3 className="text-base font-semibold">
						#{announcement.id} {currentAnnouncement?.title}
					</h3>
					<span className="text-xs text-muted-foreground">{createdAtLabel}</span>
				</div>
				<p className="mt-2 text-sm text-muted-foreground">{currentAnnouncement?.content}</p>
				<div className="mt-3 flex flex-wrap items-center justify-between gap-2">
					<p className="text-sm font-semibold tracking-wide text-foreground">@{authorUsername}</p>
					<p className={`text-sm font-semibold uppercase tracking-wide ${textClass}`}>{currentCategoryLocale?.title}</p>
				</div>
			</div>
		</article>
	);
};
