'use client';

import '@/shared/i18n/i18n.config';
import { type FC, type ReactNode, useSyncExternalStore } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/shared/i18n/i18n.config';

export const I18nProvider: FC<{
	children: ReactNode;
}> = ({ children }) => {
	// TODO: разобраться с hydration error
	const isHydrated = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

	if (!isHydrated) return null;

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
