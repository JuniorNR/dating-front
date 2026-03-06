import { create } from 'zustand';
import {
	CreateRoleDto,
	RoleEntity,
	roleControllerCreate,
	roleControllerFindAll,
	roleControllerFindOne,
	roleControllerRemove,
	roleControllerUpdate,
	UpdateRoleDto,
} from '@/shared/api/ApiGenerated';
import { createCrudStore } from '@/shared/lib/crudStoreFactory';
import { CrudStore } from '@/shared/types/store.types';

export const useRoleStore = create<CrudStore<RoleEntity, CreateRoleDto, UpdateRoleDto>>((set, get) =>
	createCrudStore(set, get, {
		entityName: 'role',
		findAll: roleControllerFindAll,
		findOne: roleControllerFindOne,
		createOne: roleControllerCreate,
		updateOne: roleControllerUpdate,
		removeOne: roleControllerRemove,
		getId: (role) => role.id,
		insertMode: 'append',
		initialLoading: true,
	}),
);
