import { RoleEntity, UserEntity } from '@/shared/api/ApiGenerated';

export interface UserState {
	user: UserEntity | null;
	roles: RoleEntity['type'][] | null;
	isAuth: boolean;
	isLoading: boolean;
	setUser: (user: UserEntity) => void;
	reset: () => void;
	checkAuth: () => Promise<void>;
}
