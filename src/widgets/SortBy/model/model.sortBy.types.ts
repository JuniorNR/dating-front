export interface SortByOption<TValue extends string = string> {
	label: string;
	value: TValue;
}

export interface SortByOptionWithSorter<TValue extends string = string, TItem = unknown> extends SortByOption<TValue> {
	sorter: (a: TItem, b: TItem) => number;
}

export interface SortByProps<TValue extends string = string, TItem = unknown> {
	label: string;
	value: TValue;
	sortedValue: TItem[];
	getSortedValue: (sortedValue: TItem[]) => void;
	options: SortByOptionWithSorter<TValue, TItem>[];
	onChange: (value: TValue) => void;
}
