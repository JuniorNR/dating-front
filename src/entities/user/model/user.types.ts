import { RoleEntity, UserEntity } from '@/shared/api/ApiGenerated';
import { ApiError } from '@/shared/api/apiFetch';

export interface UserState {
	user: UserEntity | null;
	roles: RoleEntity['type'][];
	isAuth: boolean;
	isLoading: boolean;
	isInitialized: boolean;
	error: ApiError | null;
	setUser: (user: UserEntity) => void;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
	resetError: () => void;
	reset: () => void;
}
