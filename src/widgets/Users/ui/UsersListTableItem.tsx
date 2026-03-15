'use client';
import { Pencil, Shield, Trash2 } from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthUserStore } from '@/entities/authUser';
import { formatDate } from '@/shared/lib/formatDate';
import { Button } from '@/shared/ui/button';
import { UsersListTableItemProps } from '../model/users.types';

export const UsersListTableItem: FC<UsersListTableItemProps> = ({ user, order }) => {
	const { t: tUsers } = useTranslation('users');
	const { authUser } = useAuthUserStore();
	const isDeleteDisabled = [
		'user',
		'admin',
	].includes(user.username.toLowerCase()) || user.id === authUser?.id;

	return (
		<tr className="border-t border-border transition-colors hover:bg-accent/60">
			<td className="px-4 py-3 text-center text-sm text-muted-foreground">{order}</td>
			<td className="px-4 py-3 text-center text-sm text-muted-foreground">{user.id}</td>
			<td className="px-4 py-3 text-sm">
				<p className="font-semibold text-card-foreground">{user.username}</p>
			</td>
			<td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
			<td className="px-4 py-3 text-center text-sm text-muted-foreground">{user.roles.length}</td>
			<td className="px-4 py-3 text-center">
				<span
					className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium tracking-normal ${
						user.banned
							? 'border-destructive/50 bg-destructive/10 text-destructive'
							: 'border-border bg-accent text-muted-foreground'
					}`}
				>
					{user.banned ? tUsers('UsersListTableItem.status.banned') : tUsers('UsersListTableItem.status.active')}
				</span>
			</td>
			<td className="px-4 py-3 text-center text-sm text-muted-foreground">{formatDate(user.createdAt)}</td>
			<td className="px-4 py-3 text-center text-sm text-muted-foreground">{formatDate(user.updatedAt)}</td>
			<td className="px-4 py-3">
				<div className="flex items-center justify-center gap-1">
					<Button
						variant="ghost"
						size="icon-lg"
						type="button"
						className="text-muted-foreground hover:text-foreground"
						aria-label={tUsers('UsersListTableItem.actions.editUser')}
						title={tUsers('UsersListTableItem.actions.editUser')}
					>
						<Pencil />
					</Button>
					<Button
						variant="ghost"
						size="icon-lg"
						type="button"
						className="text-muted-foreground hover:text-foreground"
						aria-label={tUsers('UsersListTableItem.actions.viewRoles')}
						title={tUsers('UsersListTableItem.actions.viewRoles')}
					>
						<Shield />
					</Button>
					<Button
						variant="ghost"
						size="icon-lg"
						type="button"
						className="text-destructive hover:text-destructive"
						aria-label={tUsers('UsersListTableItem.actions.deleteUser')}
						title={tUsers('UsersListTableItem.actions.deleteUser')}
						disabled={isDeleteDisabled}
					>
						<Trash2 />
					</Button>
				</div>
			</td>
		</tr>
	);
};
