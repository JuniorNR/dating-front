'use client';

import { Button } from '@/shared/ui/button';
import { SortByProps } from '../model/model.sortBy.types';

export const SortBy = <TValue extends string, TItem>({
	label,
	value,
	options,
	onChange,
	sortedValue,
	getSortedValue,
}: SortByProps<TValue, TItem>) => {
	return (
		<div className="flex items-center gap-1 rounded-md border border-border bg-accent/40 p-1">
			<span className="px-2 text-xs text-muted-foreground">{label}</span>
			{options.map((option) => (
				<Button
					key={option.value}
					variant={value === option.value ? 'secondary' : 'ghost'}
					size="sm"
					type="button"
					onClick={() => {
						onChange(option.value);
						getSortedValue([
							...sortedValue,
						].sort(option.sorter));
					}}
				>
					{option.label}
				</Button>
			))}
		</div>
	);
};
