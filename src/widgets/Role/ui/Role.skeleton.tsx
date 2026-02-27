'use client';
import { FC } from 'react';

export const RoleSkeleton: FC = () => {
	return (
		<section className="overflow-hidden rounded-3xl border bg-card p-4 sm:p-6">
			<div className="mb-5 space-y-2">
				<div className="h-8 w-52 animate-pulse rounded-md bg-muted" />
				<div className="h-4 w-full max-w-xl animate-pulse rounded-md bg-muted" />
			</div>

			<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
				<div className="h-9 animate-pulse rounded-xl bg-muted" />
				<div className="h-9 animate-pulse rounded-xl bg-muted" />
				<div className="h-9 animate-pulse rounded-xl bg-muted" />
			</div>

			<div className="mt-4 space-y-3">
				<div className="h-12 animate-pulse rounded-xl bg-muted" />
				<div className="h-12 animate-pulse rounded-xl bg-muted" />
				<div className="h-12 animate-pulse rounded-xl bg-muted" />
				<div className="h-12 animate-pulse rounded-xl bg-muted" />
			</div>
		</section>
	);
};
