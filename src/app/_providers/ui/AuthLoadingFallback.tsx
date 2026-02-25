import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const AuthLoadingFallback: FC = () => {
	const { t: tCommon } = useTranslation('common');
	return (
		<div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden">
			<div className="bg-primary/10 absolute inset-0 -z-10 blur-3xl" />
			<div className="flex flex-col items-center gap-4">
				<div className="border-muted border-t-primary h-10 w-10 animate-spin rounded-full border-4" />
				<div className="space-y-1 text-center">
					<p className="text-foreground text-sm font-semibold">{tCommon('AuthLoadingFallback.titleOne')}</p>
					<p className="text-muted-foreground text-xs">{tCommon('AuthLoadingFallback.titleTwo')}...</p>
				</div>
			</div>
		</div>
	);
};
