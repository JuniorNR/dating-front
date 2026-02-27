import { create } from 'zustand';
import {
	CreateRoleDto,
	roleControllerCreate,
	roleControllerFindAll,
	roleControllerRemove,
	roleControllerUpdate,
	UpdateRoleDto,
} from '@/shared/api/ApiGenerated';
import { apiError } from '@/shared/api/apiFetch';
import { RoleState } from './role.types';

export const useRoleStore = create<RoleState>()((set) => ({
	roles: null,
	isLoading: true,
	isInitialized: false,
	error: null,
	getRoles: async () => {
		set({
			isLoading: true,
		});
		try {
			const result = await roleControllerFindAll();
			set({
				roles: result.data,
				isLoading: false,
				isInitialized: true,
			});
		} catch (error) {
			set({
				isLoading: false,
				isInitialized: true,
				error: apiError(error, '[role][get]: unknown error'),
			});
		}
	},
	addRole: async (dto: CreateRoleDto) => {
		set({
			isLoading: true,
		});
		try {
			const result = await roleControllerCreate(dto);

			set((state) => ({
				roles: [
					...(state.roles || []),
					result.data,
				],
				isLoading: false,
			}));
		} catch (error) {
			set({
				isLoading: false,
				error: apiError(error, '[role][create]: unknown error'),
			});
		}
	},
	updateRole: async (id: number, dto: UpdateRoleDto) => {
		set({
			isLoading: true,
		});

		try {
			const result = await roleControllerUpdate(String(id), dto);
			set((state) => ({
				isLoading: false,
				roles: (state.roles || []).map((role) => (role.id === id ? result.data : role)),
			}));
		} catch (error) {
			set({
				isLoading: false,
				error: apiError(error, '[role][update]: unknown error'),
			});
		}
	},
	deleteRole: async (id) => {
		set({
			isLoading: true,
		});

		try {
			await roleControllerRemove(String(id));

			set((state) => ({
				roles: (state.roles || []).filter((role) => role.id !== id),
				isLoading: false,
			}));
		} catch (error) {
			set({
				isLoading: false,
				error: apiError(error, '[role][delete] unknown error'),
			});
		}
	},
	reset: () =>
		set({
			roles: [],
			isLoading: false,
			isInitialized: false,
			error: null,
		}),
	resetError: () =>
		set({
			error: null,
		}),
}));
