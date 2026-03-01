import { FC } from 'react';

export const Profile: FC = () => {
	return (
		<section className="flex h-full min-h-[320px] items-center justify-center rounded-3xl border border-border bg-card p-6 text-card-foreground">
			<div className="text-center">
				<p className="text-3xl font-bold tracking-[0.18em] sm:text-4xl">COMING SOON</p>
				<p className="mt-2 text-sm font-medium text-muted-foreground">(WIP)</p>
			</div>
		</section>
	);
};
