'use client';
import { format } from 'date-fns';
import { Pencil, Shield, Trash2, Users } from 'lucide-react';
import { Reorder } from 'motion/react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoleStore } from '@/entities/role';
import { UpdateRoleForm } from '@/features';
import { Button } from '@/shared/ui/button';
import { Modal, SimpleModal } from '@/widgets';
import { RoleListTableItemProps } from '../model/role.types';

export const RoleListTableItem: FC<RoleListTableItemProps> = ({ role, order }) => {
	const { t: tRole } = useTranslation('role');
	const isProtectedRole = [
		'user',
		'admin',
		'super-user',
	].includes(role.type.toLowerCase());
	const [isLoadingModalDelete, setIsLoadingModalDelete] = useState<boolean>(false);
	const [isLoadingModalEdit, setIsLoadingModalEdit] = useState<boolean>(false);
	const { deleteRole } = useRoleStore();

	const formatDate = (date: string) => {
		return format(new Date(date), 'dd.MM.yyyy hh:mm');
	};

	return (
		<Reorder.Item
			as="tr"
			value={role.id}
			className="border-t border-border transition-colors hover:bg-accent/60"
			transition={{
				duration: 0.28,
				ease: 'easeInOut',
			}}
		>
			<td className="px-4 py-3 text-center text-sm text-muted-foreground">{order}</td>
			<td className="px-4 py-3 text-center text-sm text-muted-foreground">{role.id}</td>
			<td className="px-4 py-3 text-center">
				<span className="inline-flex items-center rounded-md border border-border bg-accent px-2 py-0.5 text-[10px] font-medium tracking-normal text-muted-foreground">
					{role.type}
				</span>
			</td>
			<td className="px-4 py-3">
				<p className="text-sm font-semibold text-card-foreground">{role.name}</p>
			</td>
			<td className="px-4 py-3 text-sm text-muted-foreground">{role.description}</td>
			<td className="px-4 py-3 text-center text-sm text-muted-foreground">{role.users?.length ?? 0}</td>
			<td className="px-4 py-3 text-center text-sm text-muted-foreground">{formatDate(role.createdAt)}</td>
			<td className="px-4 py-3 text-center text-sm text-muted-foreground">{formatDate(role.updatedAt)}</td>
			<td className="px-4 py-3">
				<div className="flex items-center justify-center gap-1">
					<Modal
						formId={`edit-role-table-${role.id}`}
						openText={tRole('RoleListTable.actions.editRoleData')}
						title={tRole('RoleListTable.modals.editRoleTitle')}
						isLoading={isLoadingModalEdit}
						renderTrigger={
							<Button
								variant="ghost"
								size="icon-lg"
								type="button"
								className="text-muted-foreground hover:text-foreground"
								aria-label={tRole('RoleListTable.actions.editRoleData')}
								title={tRole('RoleListTable.actions.editRoleData')}
								disabled={isProtectedRole}
							>
								<Pencil />
							</Button>
						}
					>
						<UpdateRoleForm
							formId={`edit-role-table-${role.id}`}
							roleId={role.id}
							onLoading={(isLoading) => setIsLoadingModalEdit(isLoading)}
						/>
					</Modal>
					<Button
						variant="ghost"
						size="icon-lg"
						type="button"
						className="text-muted-foreground hover:text-foreground"
						aria-label={tRole('RoleListTable.actions.managePermissions')}
						title={tRole('RoleListTable.actions.managePermissions')}
						disabled
					>
						<Shield />
					</Button>
					<Button
						variant="ghost"
						size="icon-lg"
						type="button"
						className="text-muted-foreground hover:text-foreground"
						aria-label={tRole('RoleListTable.actions.viewAssignedUsers')}
						title={tRole('RoleListTable.actions.viewAssignedUsers')}
						disabled
					>
						<Users />
					</Button>
					<SimpleModal
						title={tRole('RoleListTable.modals.deleteRoleTitle')}
						description={tRole('RoleListTable.modals.deleteRoleDescription')}
						onSuccess={() => {
							setIsLoadingModalDelete(false);
							deleteRole(role.id);
						}}
						isLoading={isLoadingModalDelete}
						renderTrigger={
							<Button
								variant="ghost"
								size="icon-lg"
								type="button"
								className="text-destructive hover:text-destructive"
								aria-label={tRole('RoleListTable.actions.deleteRole')}
								title={tRole('RoleListTable.actions.deleteRole')}
								disabled={isProtectedRole}
							>
								<Trash2 />
							</Button>
						}
					/>
				</div>
			</td>
		</Reorder.Item>
	);
};
