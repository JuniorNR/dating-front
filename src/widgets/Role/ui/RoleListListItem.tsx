'use client';
import { format } from 'date-fns';
import { Pencil, Shield, Trash2, Users } from 'lucide-react';
import { Reorder } from 'motion/react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoleStore } from '@/entities/role';
import { UpdateRoleForm } from '@/features';
import { RoleEntity } from '@/shared/api/ApiGenerated';
import { Button } from '@/shared/ui/button';
import { Modal, SimpleModal } from '@/widgets';

interface RoleListListItemProps {
	role: RoleEntity;
}

export const RoleListListItem: FC<RoleListListItemProps> = ({ role }) => {
	const { t: tRole } = useTranslation('role');
	const formatDate = (date: string) => {
		return format(new Date(date), 'dd.MM.yyyy hh:mm');
	};
	const [isLoadingModalDelete, setIsLoadingModalDelete] = useState<boolean>(false);
	const [isLoadingModalEdit, setIsLoadingModalEdit] = useState<boolean>(false);
	const { deleteRole } = useRoleStore();

	return (
		<Reorder.Item
			as="li"
			value={role.id}
			className="relative"
			transition={{
				duration: 0.28,
				ease: 'easeInOut',
			}}
		>
			<span className="bg-primary absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full" />
			<div className="rounded-xl border border-border bg-accent/40 p-3 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/80">
				<div className="mb-2 flex items-start justify-between gap-3">
					<div className="flex flex-wrap items-center gap-2">
						<span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{formatDate(role.createdAt)}</span>
					</div>

					<div className="flex shrink-0 items-center gap-1">
						<Modal
							formId={`edit-role-${role.id}`}
							openText={tRole('RoleListListItem.actions.editRole')}
							title={tRole('RoleListListItem.actions.editRole')}
							isLoading={isLoadingModalEdit}
							renderTrigger={
								<Button
									variant="ghost"
									size="icon-lg"
									type="button"
									className="text-muted-foreground hover:text-foreground"
									aria-label={tRole('RoleListListItem.actions.editRole')}
									title={tRole('RoleListListItem.actions.editRole')}
									disabled={role.type === 'user'}
								>
									<Pencil />
								</Button>
							}
						>
							<UpdateRoleForm
								formId={`edit-role-${role.id}`}
								roleId={role.id}
								onLoading={(isLoading) => setIsLoadingModalEdit(isLoading)}
							/>
						</Modal>

						<Button
							variant="ghost"
							size="icon-lg"
							type="button"
							className="text-muted-foreground hover:text-foreground"
							aria-label={tRole('RoleListListItem.actions.managePermissions')}
							disabled
							title={tRole('RoleListListItem.actions.managePermissions')}
						>
							<Shield />
						</Button>
						<Button
							variant="ghost"
							size="icon-lg"
							type="button"
							className="text-muted-foreground hover:text-foreground"
							aria-label={tRole('RoleListListItem.actions.viewAssignedUsers')}
							disabled
							title={tRole('RoleListListItem.actions.viewAssignedUsers')}
						>
							<Users />
						</Button>
						<SimpleModal
							title={tRole('RoleListListItem.deleteModal.title')}
							description={tRole('RoleListListItem.deleteModal.description')}
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
									aria-label={tRole('RoleListListItem.actions.deleteRole')}
									title={tRole('RoleListListItem.actions.deleteRole')}
									disabled={role.type === 'user'}
								>
									<Trash2 />
								</Button>
							}
						/>
					</div>
				</div>

				<div className="flex min-h-24 flex-col">
					<h3 className="text-base font-semibold text-card-foreground">{role.name}</h3>
					<p className="mt-1 text-sm text-muted-foreground">{role.description}</p>
					<div className="mt-auto flex items-end justify-between pt-3 text-xs text-muted-foreground">
						<span className="inline-flex items-center rounded-md border border-border bg-accent px-2 py-0.5 text-[10px] font-medium tracking-normal text-muted-foreground">
							{role.type}
						</span>
						<div className="flex flex-col items-end gap-0.5">
							<span>{tRole('RoleListListItem.meta.created', { value: formatDate(role.createdAt) })}</span>
							<span>{tRole('RoleListListItem.meta.updated', { value: formatDate(role.updatedAt) })}</span>
						</div>
					</div>
				</div>
			</div>
		</Reorder.Item>
	);
};
