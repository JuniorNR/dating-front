'use client';
import { FC } from 'react';
import { TerminalOverlay } from '@/widgets';
import { RoleListProps } from '../model/role.types';
import { RoleListList } from './RoleListList';
import { RoleListTable } from './RoleListTable';
import { RoleListTerminal } from './RoleListTerminal';

export const RoleList: FC<RoleListProps> = ({ title, roles, variant }) => {
	if (variant === 'byTable') {
		return (
			<RoleListTable
				title={title}
				roles={roles}
			/>
		);
	}

	if (variant === 'byConsole') {
		return (
			<TerminalOverlay
				title={title}
				entries={roles.length}
				terminal="roles"
			>
				<RoleListTerminal roles={roles} />
			</TerminalOverlay>
		);
	}

	if (variant === 'byList') {
		return (
			<RoleListList
				title={title}
				roles={roles}
			/>
		);
	}

	return null;
};
