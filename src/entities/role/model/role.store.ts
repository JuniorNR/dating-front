import { create } from 'zustand';
import { roleControllerCreate, roleControllerFindAll, roleControllerRemove, roleControllerUpdate } from '@/shared/api/ApiGenerated';
import { apiError } from '@/shared/api/apiFetch';
import { RoleState } from './role.types';

export const useRoleStore = create<RoleState>()((set, get) => ({
	items: [],
	isLoading: true,
	isInitialized: false,
	error: null,
	create: async (dto) => {
		set({
			isLoading: true,
		});
		try {
			const result = await roleControllerCreate(dto);

			set((state) => ({
				items: [
					...(state.items || []),
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
	getAll: async () => {
		set({
			isLoading: true,
		});
		try {
			const result = await roleControllerFindAll();
			set({
				items: result.data,
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
	getById: async () => {},
	update: async (id, dto) => {
		set({
			isLoading: true,
		});

		try {
			const result = await roleControllerUpdate(String(id), dto);
			set((state) => ({
				isLoading: false,
				items: (state.items || []).map((role) => (role.id === id ? result.data : role)),
			}));
		} catch (error) {
			set({
				isLoading: false,
				error: apiError(error, '[role][update]: unknown error'),
			});
		}
	},
	remove: async (id) => {
		set({
			isLoading: true,
		});

		try {
			await roleControllerRemove(String(id));

			set((state) => ({
				items: (state.items || []).filter((role) => role.id !== id),
				isLoading: false,
			}));
		} catch (error) {
			set({
				isLoading: false,
				error: apiError(error, '[role][delete] unknown error'),
			});
		}
	},
	getFromStoreById: (id) => {
		return get().items.find((role) => role.id === id);
	},
	reset: () =>
		set({
			items: [],
			isLoading: false,
			isInitialized: false,
			error: null,
		}),
	resetError: () =>
		set({
			error: null,
		}),
}));
