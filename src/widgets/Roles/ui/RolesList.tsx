'use client';
import { FC } from 'react';
import { RolesListProps } from '../model/roles.types';
import { RolesListList } from './RolesListList';
import { RolesListTable } from './RolesListTable';

export const RolesList: FC<RolesListProps> = ({ title, roles, variant }) => {
	if (variant === 'byTable') {
		return (
			<RolesListTable
				title={title}
				roles={roles}
			/>
		);
	}

	if (variant === 'byList') {
		return (
			<RolesListList
				title={title}
				roles={roles}
			/>
		);
	}

	return null;
};
