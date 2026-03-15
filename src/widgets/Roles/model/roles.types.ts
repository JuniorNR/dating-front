import { RoleEntity } from '@/shared/api/ApiGenerated';

export type RolesListVariant = 'byTable' | 'byList';

export interface RolesListHeaderProps {
	variant: RolesListVariant;
	setVariant: (variant: RolesListVariant) => void;
}

export interface RolesListTableProps {
	title: string;
	roles: RoleEntity[];
}

export interface RolesListListProps {
	title: string;
	roles: RoleEntity[];
}

export interface RolesListTableItemProps {
	role: RoleEntity;
	order: number;
}
