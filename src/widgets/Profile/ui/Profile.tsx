'use client';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Profile: FC = () => {
	const { t: tCommon } = useTranslation('common');

	return (
		<section className="flex h-full min-h-[320px] items-center justify-center rounded-3xl border border-border bg-card p-6 text-card-foreground">
			<div className="text-center">
				<p className="text-3xl font-bold tracking-[0.18em] sm:text-4xl">{tCommon('profile.comingSoon.title')}</p>
				<p className="mt-2 text-sm font-medium text-muted-foreground">{tCommon('profile.comingSoon.subtitle')}</p>
			</div>
		</section>
	);
};
