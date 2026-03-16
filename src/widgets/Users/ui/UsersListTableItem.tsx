'use client';
import { Pencil, Shield, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthUserStore } from '@/entities/authUser';
import { useUsersStore } from '@/entities/users';
import { UpdateUserForm } from '@/features';
import { formatDate } from '@/shared/lib/formatDate';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/widgets/Modal';
import { SimpleModal } from '@/widgets/SimpleModal';
import { UsersListTableItemProps } from '../model/users.types';

export const UsersListTableItem: FC<UsersListTableItemProps> = ({ user, order }) => {
	const { t: tUsers } = useTranslation('users');
	const { authUser } = useAuthUserStore();
	const { remove } = useUsersStore();
	const isDeleteDisabled = ['user', 'admin'].includes(user.username.toLowerCase()) || user.id === authUser?.id;

	const [isOpenUpdateUserForm, setIsOpenUpdateUserForm] = useState<boolean>(false);
	const [isLoadingUpdateUserForm, setIsLoadingUpdateUserForm] = useState<boolean>(false);
	const [isLoadingDeleteUser, setIsLoadingDeleteUser] = useState<boolean>(false);

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
						user.banned ? 'border-destructive/50 bg-destructive/10 text-destructive' : 'border-border bg-accent text-muted-foreground'
					}`}
				>
					{user.banned ? tUsers('UsersListTableItem.status.banned') : tUsers('UsersListTableItem.status.active')}
				</span>
			</td>
			<td className="px-4 py-3 text-center text-sm text-muted-foreground">{formatDate(user.createdAt)}</td>
			<td className="px-4 py-3 text-center text-sm text-muted-foreground">{formatDate(user.updatedAt)}</td>
			<td className="px-4 py-3">
				<div className="flex items-center justify-center gap-1">
					<Modal
						openText={tUsers('UsersListTableItem.actions.updateUser')}
						title={tUsers('UsersListTableItem.actions.updateUser')}
						isLoading={isLoadingUpdateUserForm}
						isOpen={isOpenUpdateUserForm}
						setIsOpen={setIsOpenUpdateUserForm}
						formId={`update-user-form${user.id}`}
						renderTrigger={
							<Button
								variant="ghost"
								size="icon-lg"
								type="button"
								className="text-muted-foreground hover:text-foreground"
								aria-label={tUsers('UsersListTableItem.actions.updateUser')}
								title={tUsers('UsersListTableItem.actions.updateUser')}
							>
								<Pencil />
							</Button>
						}
					>
						<UpdateUserForm
							user={user}
							formId={`update-user-form${user.id}`}
							onLoading={setIsLoadingUpdateUserForm}
							onSuccess={() => setIsOpenUpdateUserForm(false)}
						/>
					</Modal>
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
					<SimpleModal
						title={tUsers('UsersListTableItem.actions.deleteUser')}
						description={tUsers('UsersListTableItem.actions.deleteUserDescription')}
						confirmText={tUsers('UsersListTableItem.actions.deleteUserConfirm')}
						openText={tUsers('UsersListTableItem.actions.deleteUserOpen')}
						closeText={tUsers('UsersListTableItem.actions.deleteUserClose')}
						isLoading={isLoadingDeleteUser}
						onSuccess={() => {
							setIsLoadingDeleteUser(false);
							remove(user.id);
						}}
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
			</td>
		</tr>
	);
};
