export interface BaseFormModal {
	formId: string;
	onLoading: (isLoading: boolean) => void;
	onSuccess?: () => void;
}
