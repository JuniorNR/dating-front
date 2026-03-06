import { create } from 'zustand';
import {
	AnnouncementCategoryEntity,
	announcementCategoryControllerCreate,
	announcementCategoryControllerFindAll,
	announcementCategoryControllerFindOne,
	announcementCategoryControllerRemove,
	announcementCategoryControllerUpdate,
	CreateAnnouncementCategoryDto,
	UpdateAnnouncementCategoryDto,
} from '@/shared/api/ApiGenerated';
import { createCrudStore } from '@/shared/lib/crudStoreFactory';
import { CrudStore } from '@/shared/types/store.types';

export const useAnnouncementCategoryStore = create<CrudStore<AnnouncementCategoryEntity, CreateAnnouncementCategoryDto, UpdateAnnouncementCategoryDto>>()(
	(set, get) =>
		createCrudStore(set, get, {
			entityName: 'announcementCategory',
			findAll: announcementCategoryControllerFindAll,
			findOne: announcementCategoryControllerFindOne,
			createOne: announcementCategoryControllerCreate,
			updateOne: announcementCategoryControllerUpdate,
			removeOne: announcementCategoryControllerRemove,
			getId: (item) => item.id,
			insertMode: 'append',
			initialLoading: true,
		}),
);
