import { apiError } from '../api/apiFetch';
import { CreateCrudStoreConfig, CrudStore } from '../types/store.types';

export function createCrudStore<TItem, TCreateDto, TUpdateDto>(
	set: (
		fn:
			| Partial<CrudStore<TItem, TCreateDto, TUpdateDto>>
			| ((s: CrudStore<TItem, TCreateDto, TUpdateDto>) => Partial<CrudStore<TItem, TCreateDto, TUpdateDto>>),
	) => void,
	get: () => CrudStore<TItem, TCreateDto, TUpdateDto>,
	config: CreateCrudStoreConfig<TItem, TCreateDto, TUpdateDto>,
): CrudStore<TItem, TCreateDto, TUpdateDto> {
	const { entityName, findAll, findOne, createOne, updateOne, removeOne, getId, insertMode = 'append', initialLoading = true } = config;

	const withError = (scope: string, error: unknown) => apiError(error, `[${entityName}][${scope}]: unknown error`);

	return {
		items: [],
		isLoading: initialLoading,
		isInitialized: false,
		error: null,
		getAll: async () => {
			set({
				isLoading: true,
				error: null,
			});
			try {
				const result = await findAll();
				set({
					items: result.data ?? [],
					isInitialized: true,
				});
			} catch (error) {
				set({
					error: withError('get', error),
					isInitialized: true,
				});
			} finally {
				set({
					isLoading: false,
				});
			}
		},
		create: async (dto) => {
			set({
				isLoading: true,
				error: null,
			});
			try {
				const result = await createOne(dto);
				set((state) => ({
					items:
						insertMode === 'prepend'
							? [
									result.data,
									...state.items,
								]
							: [
									...state.items,
									result.data,
								],
					isInitialized: true,
				}));
			} catch (error) {
				set({
					error: withError('create', error),
				});
			} finally {
				set({
					isLoading: false,
				});
			}
		},
		update: async (id, dto) => {
			set({
				isLoading: true,
				error: null,
			});
			try {
				const result = await updateOne(id, dto);
				set((state) => ({
					items: state.items.map((item) => (getId(item) === id ? result.data : item)),
					isInitialized: true,
				}));
			} catch (error) {
				set({
					error: withError('update', error),
				});
			} finally {
				set({
					isLoading: false,
				});
			}
		},
		remove: async (id) => {
			set({
				isLoading: true,
				error: null,
			});
			try {
				await removeOne(id);
				set((state) => ({
					items: state.items.filter((item) => getId(item) !== id),
					isInitialized: true,
				}));
			} catch (error) {
				set({
					error: withError('delete', error),
				});
			} finally {
				set({
					isLoading: false,
				});
			}
		},
		getFromStoreById: (id) => get().items.find((item) => getId(item) === id),
		reset: () =>
			set({
				items: [],
				isLoading: false,
				isInitialized: false,
				error: null,
			}),
		resetError: () =>
			set({
				error: null,
			}),
	};
}
