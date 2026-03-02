import { create } from 'zustand';
import {
	announcementControllerCreate,
	announcementControllerFindAll,
	announcementControllerRemove,
	announcementControllerUpdate,
	CreateAnnouncementDto,
	UpdateAnnouncementDto,
} from '@/shared/api/ApiGenerated';
import { apiError } from '@/shared/api/apiFetch';
import { AnnouncementState } from './announcement.types';

export const useAnnouncementStore = create<AnnouncementState>()((set, get) => ({
	items: [],
	isLoading: true,
	isInitialized: false,
	error: null,
	create: async (dto: CreateAnnouncementDto) => {
		set({
			isLoading: true,
		});

		try {
			const result = await announcementControllerCreate(dto);

			set((state) => ({
				items: [
					result.data,
					...state.items,
				],
				isLoading: false,
				isInitialized: true,
				error: null,
			}));
		} catch (error) {
			set({
				isLoading: false,
				isInitialized: true,
				error: apiError(error, '[announcement][create]: unknown error'),
			});
		}
	},
	update: async (id: number, dto: UpdateAnnouncementDto) => {
		set({
			isLoading: true,
		});

		try {
			const result = await announcementControllerUpdate(String(id), dto);

			set((state) => ({
				items: state.items.map((announcement) => (announcement.id === result.data.id ? result.data : announcement)),
				isLoading: false,
				isInitialized: true,
				error: null,
			}));
		} catch (error) {
			set({
				isLoading: false,
				isInitialized: true,
				error: apiError(error, '[announcement][update]: unknown error'),
			});
		}
	},
	remove: async (id: number) => {
		set({
			isLoading: true,
		});

		try {
			const result = await announcementControllerRemove(String(id));

			set((state) => ({
				items: state.items.filter((announcement) => announcement.id !== result.data.id),
				isLoading: false,
				isInitialized: true,
				error: null,
			}));
		} catch (error) {
			set({
				isLoading: false,
				isInitialized: true,
				error: apiError(error, '[announcement][delete]: unknown error'),
			});
		}
	},
	getAll: async () => {
		set({
			isLoading: true,
		});

		try {
			const result = await announcementControllerFindAll();
			set({
				items: result.data ?? [],
				isLoading: false,
				isInitialized: true,
			});
		} catch (error) {
			set({
				isLoading: false,
				isInitialized: true,
				error: apiError(error, '[announcement][get]: unknown error'),
			});
		}
	},
	getById: async () => {},
	getFromStoreById: (id) => {
		return get().items.find((announcement) => announcement.id === id);
	},
	reset: () => {
		set({
			items: [],
			isLoading: true,
			isInitialized: false,
			error: null,
		});
	},
	resetError: () => {
		set({
			error: null,
		});
	},
}));
