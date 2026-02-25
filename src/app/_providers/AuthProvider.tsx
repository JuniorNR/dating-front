'use client';

import { type FC, type ReactNode, useEffect } from 'react';
import { useUserStore } from '@/entities/user';
import { AuthLoadingFallback } from './ui/AuthLoadingFallback';

export const AuthProvider: FC<{
	children: ReactNode;
}> = ({ children }) => {
	const checkAuth = useUserStore((store) => store.checkAuth);
	const checking = useUserStore((store) => store.isLoading);

	useEffect(() => {
		checkAuth();
	}, [
		checkAuth,
	]);

	if (checking) {
		return <AuthLoadingFallback />;
	}

	return children;
};
