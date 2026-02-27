import { RoleEntity, UserEntity } from '@/shared/api/ApiGenerated';
import { BaseState } from '@/shared/types';

export interface UserState extends BaseState {
	user: UserEntity | null;
	roles: RoleEntity['type'][];
	isAuth: boolean;
	isLoading: boolean;
	setUser: (user: UserEntity) => void;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
}
