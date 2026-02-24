import { UserEntity } from '@/shared/api/ApiGenerated';

export interface UserState {
	user: UserEntity | null;
	isAuth: boolean;
	isLoading: boolean;
	setUser: (user: UserEntity) => void;
	reset: () => void;
	checkAuth: () => Promise<void>;
}
