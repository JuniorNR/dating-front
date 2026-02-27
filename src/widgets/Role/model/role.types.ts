import { RoleEntity } from '@/shared/api/ApiGenerated';

export type RoleListVariant = 'byTable' | 'byConsole' | 'byList';

export interface RoleListHeaderProps {
	variant: RoleListVariant;
	setVariant: (variant: RoleListVariant) => void;
}

export interface RoleListProps {
	title: string;
	roles: RoleEntity[];
	variant: RoleListVariant;
}

export interface RoleListTableProps {
	title: string;
	roles: RoleEntity[];
}

export interface RoleListTerminalProps {
	roles: RoleEntity[];
}

export interface RoleListListProps {
	title: string;
	roles: RoleEntity[];
}
