import { CreateUserDto, RoleEntity, UpdateUserDto, UserEntity } from '@/shared/api/ApiGenerated';
import { BaseState } from '@/shared/types';

export interface UserState
	extends Omit<BaseState<UserEntity, CreateUserDto, UpdateUserDto>, 'items' | 'create' | 'update' | 'remove' | 'getAll' | 'getById' | 'getFromStoreById'> {
	user: UserEntity | null;
	roles: RoleEntity['type'][];
	isAuth: boolean;
	setUser: (user: UserEntity) => void;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
}
