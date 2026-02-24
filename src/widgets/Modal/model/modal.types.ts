import type { ReactNode } from 'react';
import { FormModalIdentity } from '@/shared/types';

export interface ModalProps extends Omit<FormModalIdentity, 'onSuccess' | 'onLoading'> {
	openText: string;
	title: string;
	isLoading?: boolean;
	isOpen?: boolean;
	setIsOpen?: (isOpen: boolean) => void;
	description?: string;
	renderTrigger?: ReactNode;
	children?: ReactNode;
	confirmText?: string;
	closeText?: string;
}
