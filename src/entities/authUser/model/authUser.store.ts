import { create } from 'zustand';
import { authControllerLogout, userControllerGetAuth } from '@/shared/api/ApiGenerated';
import { apiError } from '@/shared/api/apiFetch';
import { disconnectSocket } from '@/shared/api/socket';
import { AuthUserState } from './authUser.types';

export const useAuthUserStore = create<AuthUserState>()((set) => ({
	authUser: null,
	roles: [
		'user',
	],
	isAuth: false,
	isLoading: true,
	isInitialized: true,
	error: null,
	setAuthUser: (authUser) =>
		set({
			authUser,
			isAuth: true,
			isLoading: false,
		}),
	checkAuth: async () => {
		try {
			const response = await userControllerGetAuth();
			const authUser = response.data;
			const userRoles = response.data.roles.map((role) => role.type);

			set({
				authUser,
				roles: userRoles,
				isAuth: true,
				isLoading: false,
			});
		} catch {
			set({
				authUser: null,
				roles: [
					'user',
				],
				isAuth: false,
				isLoading: false,
			});
		}
	},
	logout: async () => {
		set({
			isLoading: true,
			error: null,
		});
		try {
			await authControllerLogout();
		} catch (error) {
			set({
				error: apiError(error, 'Logout request failed'),
			});
		} finally {
			disconnectSocket();
			set({
				authUser: null,
				roles: [
					'user',
				],
				isAuth: false,
				isLoading: false,
				isInitialized: true,
			});
		}
	},
	reset: () =>
		set({
			authUser: null,
			roles: [
				'user',
			],
			isAuth: false,
			isLoading: false,
		}),
	resetError: () =>
		set({
			error: null,
		}),
}));
