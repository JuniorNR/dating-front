import { UserEntity } from '@/shared/api/ApiGenerated';
import { Role } from '@/shared/types';

export interface UserState {
	user: UserEntity | null;
	roles: Role[];
	isAuth: boolean;
	isLoading: boolean;
	setUser: (user: UserEntity) => void;
	reset: () => void;
	checkAuth: () => Promise<void>;
}
