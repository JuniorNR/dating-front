import { create } from 'zustand';
import { userControllerGetAuth } from '@/shared/api/ApiGenerated';
import { ROLES } from '@/shared/constants';
import { Role } from '@/shared/types';
import { UserState } from './user.types';

export const useUserStore = create<UserState>()((set) => ({
	user: null,
	roles: [
		'user',
	],
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
			roles: [
				'user',
			],
			isAuth: false,
			isLoading: false,
		}),
	checkAuth: async () => {
		try {
			const response = await userControllerGetAuth();
			const authUser = response.data;

			const isRoleFilter = (role: string): role is Role => {
				return Object.values(ROLES).includes(role as Role);
			};

			const userRoles: Role[] = authUser.roles.map((role) => role.type).filter(isRoleFilter);

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
}));
