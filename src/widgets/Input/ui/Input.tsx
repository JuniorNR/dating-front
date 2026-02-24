import { forwardRef, useId } from 'react';
import { cn } from '@/shared/lib/utils';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '@/shared/ui/field';

export type InputProps = React.ComponentProps<'input'> & {
	label?: React.ReactNode;
	description?: React.ReactNode;
	error?: string;
	fieldClassName?: string;
	gap?: number;
};

const inputBaseClassName =
	'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, description, error, fieldClassName, className, id, gap, ...props }, ref) {
	const hasError = Boolean(error);
	const autoId = useId();
	const computedFieldClassName = `gap-${gap || 1}`;

	return (
		<Field
			className={cn(computedFieldClassName, fieldClassName)}
			data-invalid={hasError || undefined}
		>
			{label ? <FieldLabel htmlFor={id ?? autoId}>{label}</FieldLabel> : null}
			<FieldContent>
				<input
					ref={ref}
					id={id ?? autoId}
					aria-invalid={hasError}
					className={cn(inputBaseClassName, className)}
					{...props}
				/>
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

Input.displayName = 'Input';
