'use client';

import { type FC, type ReactNode, useEffect } from 'react';
import { useUserStore } from '@/entities/user';

export const AuthProvider: FC<{
	children: ReactNode;
}> = ({ children }) => {
	const checkAuth = useUserStore((store) => store.checkAuth);

	useEffect(() => {
		checkAuth();
	}, [
		checkAuth,
	]);

	return children;
};
