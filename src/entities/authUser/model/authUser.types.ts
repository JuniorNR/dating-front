import { RoleEntity, UserEntity } from '@/shared/api/ApiGenerated';
import { ApiError } from '@/shared/api/apiFetch';

export interface AuthUserState {
	authUser: UserEntity | null;
	roles: RoleEntity['type'][];
	isAuth: boolean;
	isLoading: boolean;
	isInitialized: boolean;
	error: ApiError | null;
	setAuthUser: (authUser: UserEntity) => void;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
	resetError: () => void;
	reset: () => void;
}
