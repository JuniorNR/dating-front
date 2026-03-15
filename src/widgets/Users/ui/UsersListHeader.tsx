import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { UsersListHeaderProps, UsersListVariant } from '../model/users.types';

export const UsersListHeader: FC<UsersListHeaderProps> = ({ variant, setVariant }) => {
	const { t: tUsers } = useTranslation('users');
	const handleChangeVariant = (variant: UsersListVariant) => {
		localStorage.setItem('usersActiveTab', variant);
		setVariant(variant);
	};

	return (
		<>
			<input
				type="radio"
				id="users-tab-by-table"
				name="users-variant"
				className="peer/users-by-table sr-only"
				defaultChecked={variant === 'byTable'}
				onChange={(isChecked) => isChecked && handleChangeVariant('byTable')}
			/>
			<label
				htmlFor="users-tab-by-table"
				className="cursor-pointer rounded-xl border border-border bg-accent px-3 py-2 text-center text-xs font-medium text-muted-foreground shadow-xs transition-all hover:border-primary/50 hover:bg-muted hover:text-foreground peer-checked/users-by-table:border-primary peer-checked/users-by-table:bg-primary/15 peer-checked/users-by-table:text-primary peer-checked/users-by-table:shadow-sm sm:text-sm"
			>
				{tUsers('UsersListHeader.variants.byTable')}
			</label>
			<input
				type="radio"
				id="users-tab-by-list"
				name="users-variant"
				className="peer/users-by-list sr-only"
				defaultChecked={variant === 'byList'}
				onChange={(isChecked) => isChecked && handleChangeVariant('byList')}
			/>
			<label
				htmlFor="users-tab-by-list"
				className="cursor-pointer rounded-xl border border-border bg-accent px-3 py-2 text-center text-xs font-medium text-muted-foreground shadow-xs transition-all hover:border-primary/50 hover:bg-muted hover:text-foreground peer-checked/users-by-list:border-primary peer-checked/users-by-list:bg-primary/15 peer-checked/users-by-list:text-primary peer-checked/users-by-list:shadow-sm sm:text-sm"
			>
				{tUsers('UsersListHeader.variants.byList')}
			</label>
		</>
	);
};
