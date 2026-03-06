import { create } from 'zustand';
import { announcementCategoryControllerFindAll } from '@/shared/api/ApiGenerated';
import { apiError } from '@/shared/api/apiFetch';
import { AnnouncementCategoryState } from './announcementCategory.types';

export const useAnnouncementCategoryStore = create<AnnouncementCategoryState>()((set, get) => ({
	items: [],
	isLoading: true,
	isInitialized: false,
	error: null,
	getFromStoreById: () => {
		return undefined;
	},
	getAll: async () => {
		if (get().isInitialized) {
			return;
		}

		set({
			isLoading: true,
		});

		try {
			const result = await announcementCategoryControllerFindAll();

			set({
				items: result.data,
				isLoading: false,
				isInitialized: true,
				error: null,
			});
		} catch (error) {
			set({
				isLoading: false,
				isInitialized: true,
				error: apiError(error, '[announcementCategory][get]: unknown error'),
			});
		}
	},
	getById: async () => {},
	create: async () => {},
	update: async () => {},
	remove: async () => {},
	resetError: async () => {},
	reset: async () => {},
}));
