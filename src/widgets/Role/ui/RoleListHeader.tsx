import { FC } from 'react';
import { RoleListHeaderProps, RoleListVariant } from '../model/role.types';

export const RoleListHeader: FC<RoleListHeaderProps> = ({ variant, setVariant }) => {
	const handleChangeVariant = (variant: RoleListVariant) => {
		localStorage.setItem('rolesActiveTab', variant);
		setVariant(variant);
	};
	return (
		<>
			<input
				type="radio"
				id="tab-by-console"
				name="role-variant"
				className="peer/by-console sr-only"
				defaultChecked={variant === 'byConsole'}
				onChange={(isChecked) => isChecked && handleChangeVariant('byConsole')}
			/>
			<label
				htmlFor="tab-by-console"
				className="cursor-pointer rounded-xl border border-border bg-accent px-3 py-2 text-center text-xs font-medium text-muted-foreground shadow-xs transition-all hover:border-primary/50 hover:bg-muted hover:text-foreground peer-checked/by-console:border-primary peer-checked/by-console:bg-primary/15 peer-checked/by-console:text-primary peer-checked/by-console:shadow-sm sm:text-sm"
			>
				by console
			</label>

			<input
				type="radio"
				id="tab-by-table"
				name="role-variant"
				className="peer/by-table sr-only"
				defaultChecked={variant === 'byTable'}
				onChange={(isChecked) => isChecked && handleChangeVariant('byTable')}
			/>
			<label
				htmlFor="tab-by-table"
				className="cursor-pointer rounded-xl border border-border bg-accent px-3 py-2 text-center text-xs font-medium text-muted-foreground shadow-xs transition-all hover:border-primary/50 hover:bg-muted hover:text-foreground peer-checked/by-table:border-primary peer-checked/by-table:bg-primary/15 peer-checked/by-table:text-primary peer-checked/by-table:shadow-sm sm:text-sm"
			>
				by table
			</label>
			<input
				type="radio"
				id="tab-by-list"
				name="role-variant"
				className="peer/by-list sr-only"
				defaultChecked={variant === 'byList'}
				onChange={(isChecked) => isChecked && handleChangeVariant('byList')}
			/>
			<label
				htmlFor="tab-by-list"
				className="cursor-pointer rounded-xl border border-border bg-accent px-3 py-2 text-center text-xs font-medium text-muted-foreground shadow-xs transition-all hover:border-primary/50 hover:bg-muted hover:text-foreground peer-checked/by-list:border-primary peer-checked/by-list:bg-primary/15 peer-checked/by-list:text-primary peer-checked/by-list:shadow-sm sm:text-sm"
			>
				by list
			</label>
		</>
	);
};
