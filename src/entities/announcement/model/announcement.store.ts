import { create } from 'zustand';
import {
	AnnouncementEntity,
	announcementControllerCreate,
	announcementControllerFindAll,
	announcementControllerFindOne,
	announcementControllerRemove,
	announcementControllerUpdate,
	CreateAnnouncementDto,
	UpdateAnnouncementDto,
} from '@/shared/api/ApiGenerated';
import { createCrudStore } from '@/shared/lib/crudStoreFactory';
import { CrudStore } from '@/shared/types/store.types';

export const useAnnouncementStore = create<CrudStore<AnnouncementEntity, CreateAnnouncementDto, UpdateAnnouncementDto>>()((set, get) =>
	createCrudStore(set, get, {
		entityName: 'announcement',
		findAll: announcementControllerFindAll,
		findOne: announcementControllerFindOne,
		createOne: announcementControllerCreate,
		updateOne: announcementControllerUpdate,
		removeOne: announcementControllerRemove,
		getId: (item) => item.id,
		insertMode: 'append',
		initialLoading: true,
	}),
);
