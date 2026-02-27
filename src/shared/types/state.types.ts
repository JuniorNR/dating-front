import { ApiError } from '../api/apiFetch';

export interface BaseState {
	isLoading: boolean;
	isInitialized: boolean;
	error: ApiError | null;
	resetError: () => void;
	reset: () => void;
}
