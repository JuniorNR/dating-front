import { forwardRef } from 'react';
import { cn } from '@/shared/lib/cn';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '@/shared/ui/field';
import {
	SelectPrimitive,
	SelectPrimitiveContent,
	SelectPrimitiveGroup,
	SelectPrimitiveItem,
	SelectPrimitiveLabel,
	SelectPrimitiveTrigger,
	SelectPrimitiveValue,
} from '@/shared/ui/selectPrimitive';
import { SelectProps } from '../model/select.types';

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select({
	label,
	placeholder,
	description,
	error,
	items,
	className,
	name,
	value,
	onChange,
	onBlur,
	...rootProps
}, ref) {
	const hasError = Boolean(error);
	const normalizedValue = value === undefined || value === null ? '' : String(value);
	const handleValueChange = (nextValue: string) => {
		const matchedItem = items.find((item) => String(item.value) === nextValue);
		onChange?.(matchedItem ? matchedItem.value : nextValue);
	};

	return (
		<Field
			className={cn('gap-1')}
			data-invalid={hasError || undefined}
		>
			{label ? <FieldLabel>{label}</FieldLabel> : null}
			<FieldContent className={className}>
				<SelectPrimitive
					{...rootProps}
					name={name}
					value={normalizedValue}
					onValueChange={handleValueChange}
				>
					<SelectPrimitiveTrigger
						ref={ref}
						className="w-full"
						aria-invalid={hasError}
						onBlur={onBlur}
					>
						<SelectPrimitiveValue placeholder={placeholder} />
					</SelectPrimitiveTrigger>
					<SelectPrimitiveContent>
						<SelectPrimitiveGroup>
							{label ? <SelectPrimitiveLabel>{label}</SelectPrimitiveLabel> : null}
							{items.map((item) => (
								<SelectPrimitiveItem
									key={item.value}
									value={String(item.value)}
								>
									{item.label}
								</SelectPrimitiveItem>
							))}
						</SelectPrimitiveGroup>
					</SelectPrimitiveContent>
				</SelectPrimitive>
				{description ? <FieldDescription>{description}</FieldDescription> : null}
				<FieldError
					errors={
						error
							? [
									{
										message: error,
									},
								]
							: undefined
					}
				/>
			</FieldContent>
		</Field>
	);
});

Select.displayName = 'Select';
