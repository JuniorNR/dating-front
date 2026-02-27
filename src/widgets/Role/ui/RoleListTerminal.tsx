'use client';
import { FC } from 'react';
import { RoleListTerminalProps } from '../model/role.types';
import { RoleListTerminalItem } from './RoleListTerminalItem';

export const RoleListTerminal: FC<RoleListTerminalProps> = ({ roles }) => {
	return (
		<ul className="relative overflow-hidden rounded-xl border border-emerald-300 dark:border-emerald-500/30">
			{roles.map((role) => (
				<RoleListTerminalItem
					key={role.id}
					role={role}
				/>
			))}
		</ul>
	);
};
