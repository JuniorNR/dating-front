export interface FormModalIdentity {
	formId: string;
	onSuccess: () => void;
	onLoading: (isLoading: boolean) => void;
}
