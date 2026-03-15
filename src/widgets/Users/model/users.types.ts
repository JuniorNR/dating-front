import { UserEntity } from '@/shared/api/ApiGenerated';

export type UsersListVariant = 'byTable' | 'byList';

export interface UsersListHeaderProps {
	variant: UsersListVariant;
	setVariant: (variant: UsersListVariant) => void;
}

export interface UsersListTableProps {
	title: string;
	users: UserEntity[];
}

export interface UsersListListProps {
	title: string;
	users: UserEntity[];
}

export interface UsersListTableItemProps {
	user: UserEntity;
	order: number;
}

export interface UsersListViewItemProps {
	user: UserEntity;
}
