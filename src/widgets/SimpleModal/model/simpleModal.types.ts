export interface SimpleModalProps {
	title: string;
	description: string;
	isLoading: boolean;
	onSuccess: () => void;
	confirmText?: string;
	openText?: string;
	closeText?: string;
	renderTrigger?: React.ReactNode;
	onCancel?: () => void;
}
