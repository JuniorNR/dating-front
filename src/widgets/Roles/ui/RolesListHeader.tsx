import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RolesListHeaderProps, RolesListVariant } from '../model/roles.types';

export const RolesListHeader: FC<RolesListHeaderProps> = ({ variant, setVariant }) => {
	const { t: tRole } = useTranslation('role');
	const handleChangeVariant = (variant: RolesListVariant) => {
		localStorage.setItem('rolesActiveTab', variant);
		setVariant(variant);
	};
	return (
		<>
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
				{tRole('RoleListHeader.variants.byTable')}
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
				{tRole('RoleListHeader.variants.byList')}
			</label>
		</>
	);
};
