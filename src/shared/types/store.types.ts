import { ApiError } from '../api/apiFetch';

type IdType = number;

export interface CrudBaseState<TEntity> {
	items: TEntity[];
	isLoading: boolean;
	isInitialized: boolean;
	error: ApiError | null;
}

export interface CrudActions<TItem, TCreateDto, TUpdateDto> {
	getAll: () => Promise<void>;
	create: (dto: TCreateDto) => Promise<void>;
	update: (id: IdType, dto: TUpdateDto) => Promise<void>;
	remove: (id: IdType) => Promise<void>;
	getFromStoreById: (id: IdType) => TItem | undefined;
	reset: () => void;
	resetError: () => void;
}

export type CrudStore<TEntity, TCreateDto, TUpdateDto> = CrudBaseState<TEntity> & CrudActions<TEntity, TCreateDto, TUpdateDto>;

export interface CreateCrudStoreConfig<TEntity, TCreateDto, TUpdateDto> {
	entityName: string;
	findAll: () => Promise<{
		data?: TEntity[] | null;
	}>;
	findOne?: (id: IdType) => Promise<{
		data?: TEntity | null;
	}>;
	createOne: (dto: TCreateDto) => Promise<{
		data: TEntity;
	}>;
	updateOne: (
		id: IdType,
		dto: TUpdateDto,
	) => Promise<{
		data: TEntity;
	}>;
	removeOne: (id: IdType) => Promise<unknown>;
	getId: (item: TEntity) => IdType;
	insertMode?: 'prepend' | 'append';
	initialLoading?: boolean;
}
