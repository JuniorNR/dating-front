'use client';

import { AlertCircle } from 'lucide-react';
import { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import { ErrorComponentProps } from '../model/error.types';

export const ErrorComponent: FC<ErrorComponentProps> = ({ error, className, isGlobal }) => {
	if (!error) {
		return null;
	}

	const title = error.statusCode ? `Error ${error.statusCode}` : 'Error';
	const description = error.message ?? 'Unknown error';

	const errorNode = (
		<div
			role="alert"
			data-slot="error"
			className={cn(
				'text-destructive bg-destructive/10 border-destructive/20 flex flex-col gap-2 rounded-md border p-3 text-sm pointer-events-auto',
				isGlobal && 'w-full max-w-xl',
				className,
			)}
		>
			<div className="flex items-center gap-2 font-medium">
				<AlertCircle className="size-4 shrink-0" />
				<span>{title}</span>
			</div>
			<p>{description}</p>
			{error.error && <code className="bg-background/70 text-xs rounded px-2 py-1">{error.error}</code>}
		</div>
	);

	if (isGlobal) {
		return <div className="fixed pointer-events-none inset-0 z-50 flex items-center justify-center p-4">{errorNode}</div>;
	}

	return errorNode;
};
