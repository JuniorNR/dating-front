import { create } from 'zustand';
import { userControllerGetAuth } from '@/shared/api/ApiGenerated';
import { UserState } from './user.types';

export const useUserStore = create<UserState>()((set) => ({
	user: null,
	roles: null,
	isAuth: false,
	isLoading: true,
	setUser: (user) =>
		set({
			user,
			isAuth: true,
			isLoading: false,
		}),
	reset: () =>
		set({
			user: null,
			roles: null,
			isAuth: false,
			isLoading: false,
		}),
	checkAuth: async () => {
		try {
			const response = await userControllerGetAuth();
			const authUser = response.data;
			const userRoles = authUser.roles.map((role) => role.type);

			set({
				user: authUser,
				roles: userRoles,
				isAuth: true,
				isLoading: false,
			});
		} catch {
			set({
				user: null,
				roles: null,
				isAuth: false,
				isLoading: false,
			});
		}
	},
}));
