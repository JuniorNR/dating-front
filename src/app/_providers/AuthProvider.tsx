'use client';

import { type FC, type ReactNode, useEffect } from 'react';
import { useAuthUserStore } from '@/entities/authUser';
import { AuthLoadingFallback } from './ui/AuthLoadingFallback';

export const AuthProvider: FC<{
	children: ReactNode;
}> = ({ children }) => {
	const checkAuth = useAuthUserStore((store) => store.checkAuth);
	const checking = useAuthUserStore((store) => store.isLoading);

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
