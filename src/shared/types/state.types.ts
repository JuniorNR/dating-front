import { ApiError } from '../api/apiFetch';

export interface BaseState<E, C, U> {
	items: E[];
	isLoading: boolean;
	isInitialized: boolean;
	error: ApiError | null;
	getFromStoreById: (id: number) => E | undefined;
	getAll: () => Promise<void>;
	getById: (id: number) => Promise<void>;
	update: (id: number, dto: U) => Promise<void>;
	create: (dto: C) => Promise<void>;
	remove: (id: number) => Promise<void>;
	resetError: () => void;
	reset: () => void;
}
