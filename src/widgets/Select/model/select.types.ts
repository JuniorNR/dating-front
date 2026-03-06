import type { ComponentPropsWithoutRef } from 'react';
import { SelectPrimitive } from '@/shared/ui/selectPrimitive';

interface SelectItems {
	label: string;
	value: string | number;
}

export interface SelectProps extends Omit<ComponentPropsWithoutRef<typeof SelectPrimitive>, 'value' | 'defaultValue' | 'onValueChange'> {
	label?: string;
	placeholder?: string;
	items: SelectItems[];
	description?: string;
	error?: string;
	className?: string;
	name?: string;
	value?: string | number;
	onChange?: (value: string | number) => void;
	onBlur?: () => void;
}
