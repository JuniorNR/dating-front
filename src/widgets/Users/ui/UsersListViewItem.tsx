'use client';
import { Pencil, Shield, Trash2 } from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthUserStore } from '@/entities/authUser';
import { useUsersStore } from '@/entities/users';
import { formatDate } from '@/shared/lib/formatDate';
import { Button } from '@/shared/ui/button';
import { SimpleModal } from '@/widgets/SimpleModal';
import { UsersListViewItemProps } from '../model/users.types';

export const UsersListViewItem: FC<UsersListViewItemProps> = ({ user }) => {
	const { t: tUsers } = useTranslation('users');
	const { authUser } = useAuthUserStore();
	const { remove } = useUsersStore();
	const isDeleteDisabled = ['user', 'admin'].includes(user.username.toLowerCase()) || user.id === authUser?.id;

	return (
		<li className="relative">
			<span className="bg-primary absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full" />
			<div className="rounded-xl border border-border bg-accent/40 p-3 hover:border-primary/50 hover:bg-accent/80">
				<div className="mb-2 flex items-start justify-between gap-3">
					<div className="min-w-0">
						<h3 className="truncate text-base font-semibold text-card-foreground">{user.username}</h3>
						<p className="truncate text-sm text-muted-foreground">{user.email}</p>
					</div>
					<div className="flex shrink-0 items-center gap-1">
						<Button
							variant="ghost"
							size="icon-lg"
							type="button"
							className="text-muted-foreground hover:text-foreground"
							aria-label={tUsers('UsersListListItem.actions.editUser')}
							title={tUsers('UsersListListItem.actions.editUser')}
						>
							<Pencil />
						</Button>
						<Button
							variant="ghost"
							size="icon-lg"
							type="button"
							className="text-muted-foreground hover:text-foreground"
							aria-label={tUsers('UsersListListItem.actions.viewRoles')}
							title={tUsers('UsersListListItem.actions.viewRoles')}
						>
							<Shield />
						</Button>
						<SimpleModal
							title={tUsers('UsersListListItem.actions.deleteUser')}
							description={tUsers('UsersListListItem.actions.deleteUserDescription')}
							confirmText={tUsers('UsersListListItem.actions.deleteUserConfirm')}
							openText={tUsers('UsersListListItem.actions.deleteUserOpen')}
							closeText={tUsers('UsersListListItem.actions.deleteUserClose')}
							isLoading={false}
							onSuccess={() => remove(user.id)}
							renderTrigger={
								<Button
									variant="ghost"
									size="icon-lg"
									type="button"
									disabled={isDeleteDisabled}
									color="destructive"
									className="text-destructive hover:text-destructive"
								>
									<Trash2 />
								</Button>
							}
						/>
					</div>
				</div>

				<div className="flex items-end justify-between text-xs text-muted-foreground">
					<div className="flex items-center gap-2">
						<span
							className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium tracking-normal ${
								user.banned ? 'border-destructive/50 bg-destructive/10 text-destructive' : 'border-border bg-accent text-muted-foreground'
							}`}
						>
							{user.banned ? tUsers('UsersListListItem.status.banned') : tUsers('UsersListListItem.status.active')}
						</span>
						<span className="inline-flex items-center rounded-md border border-border bg-accent px-2 py-0.5 text-[10px] font-medium tracking-normal text-muted-foreground">
							{tUsers('UsersListListItem.meta.rolesCount', { count: user.roles.length })}
						</span>
						{Boolean(user.banReason) && <span className="truncate">{tUsers('UsersListListItem.meta.reason', { value: user.banReason })}</span>}
					</div>
					<div className="flex flex-col items-end gap-0.5">
						<span>{tUsers('UsersListListItem.meta.created', { value: formatDate(user.createdAt) })}</span>
						<span>{tUsers('UsersListListItem.meta.updated', { value: formatDate(user.updatedAt) })}</span>
					</div>
				</div>
			</div>
		</li>
	);
};
