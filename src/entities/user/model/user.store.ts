import { create } from 'zustand';
import { authControllerLogout, userControllerGetAuth } from '@/shared/api/ApiGenerated';
import { apiError } from '@/shared/api/apiFetch';
import { UserState } from './user.types';

export const useUserStore = create<UserState>()((set) => ({
	user: null,
	roles: [
		'user',
	],
	isAuth: false,
	isLoading: true,
	isInitialized: true,
	error: null,
	setUser: (user) =>
		set({
			user,
			isAuth: true,
			isLoading: false,
		}),
	checkAuth: async () => {
		try {
			const response = await userControllerGetAuth();
			const authUser = response.data;
			const userRoles = response.data.roles.map((role) => role.type);

			set({
				user: authUser,
				roles: userRoles,
				isAuth: true,
				isLoading: false,
			});
		} catch {
			set({
				user: null,
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
			set({
				user: null,
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
			user: null,
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
