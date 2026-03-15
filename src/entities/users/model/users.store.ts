import { create } from 'zustand';
import {
	CreateUserDto,
	UpdateUserDto,
	UserEntity,
	userControllerCreate,
	userControllerFindAll,
	userControllerFindOne,
	userControllerRemove,
	userControllerUpdate,
} from '@/shared/api/ApiGenerated';
import { createCrudStore } from '@/shared/lib/crudStoreFactory';
import { CrudStore } from '@/shared/types/store.types';

export const useUsersStore = create<CrudStore<UserEntity, CreateUserDto, UpdateUserDto>>((set, get) =>
	createCrudStore(set, get, {
		entityName: 'users',
		findAll: userControllerFindAll,
		findOne: userControllerFindOne,
		createOne: userControllerCreate,
		updateOne: userControllerUpdate,
		removeOne: userControllerRemove,
		getId: (user: UserEntity) => user.id,
		insertMode: 'append',
		initialLoading: true,
	}),
);
