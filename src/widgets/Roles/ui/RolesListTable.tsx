'use client';
import { Plus } from 'lucide-react';
import { Reorder } from 'motion/react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateRoleForm } from '@/features';
import { Button } from '@/shared/ui/button';
import { Modal, SortBy } from '@/widgets';
import { RolesListTableProps } from '../model/roles.types';
import { RolesListTableItem } from './RolesListTableItem';

export const RolesTable: FC<RolesListTableProps> = ({ title, roles }) => {
	const { t: tRole } = useTranslation('role');
	const [sortType, setSortType] = useState<'created' | 'updated' | 'name'>('created');
	const [isLoadingModalCreate, setIsLoadingModalCreate] = useState<boolean>(false);
	const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

	const sortOptions = [
		{
			label: tRole('RoleListTable.sortBy.created'),
			value: 'created' as const,
			sorter: (a: (typeof roles)[number], b: (typeof roles)[number]) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		},
		{
			label: tRole('RoleListTable.sortBy.updated'),
			value: 'updated' as const,
			sorter: (a: (typeof roles)[number], b: (typeof roles)[number]) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
		},
		{
			label: tRole('RoleListTable.sortBy.name'),
			value: 'name' as const,
			sorter: (a: (typeof roles)[number], b: (typeof roles)[number]) => a.name.localeCompare(b.name),
		},
	];
	const activeSort = sortOptions.find((option) => option.value === sortType);
	const sortedRoles = activeSort ? [...roles].sort(activeSort.sorter) : roles;

	return (
		<section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
			<div className="mb-4 flex items-center justify-between gap-2">
				<h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
				<div className="flex items-center gap-2">
					<SortBy
						label={tRole('RoleListTable.sortBy.label')}
						value={sortType}
						onChange={setSortType}
						options={sortOptions}
					/>
					<Modal
						formId="create-role-form-table"
						openText={tRole('RoleListTable.create.openText')}
						title={tRole('RoleListTable.create.title')}
						isLoading={isLoadingModalCreate}
						isOpen={isOpenModalCreate}
						setIsOpen={setIsOpenModalCreate}
						renderTrigger={
							<Button
								variant="outline"
								size="icon"
								type="button"
								aria-label={tRole('RoleListTable.create.triggerAria')}
								title={tRole('RoleListTable.create.triggerAria')}
							>
								<Plus />
							</Button>
						}
					>
						<CreateRoleForm
							formId="create-role-form-table"
							onSuccess={() => setIsOpenModalCreate(false)}
							onLoading={(isLoading) => setIsLoadingModalCreate(isLoading)}
						/>
					</Modal>
				</div>
			</div>

			<div className="overflow-x-auto rounded-xl border border-border">
				<table className="min-w-full border-collapse text-left">
					<thead>
						<tr className="bg-accent">
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tRole('RoleListTable.columns.order')}
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tRole('RoleListTable.columns.id')}
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tRole('RoleListTable.columns.type')}
							</th>
							<th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{tRole('RoleListTable.columns.role')}</th>
							<th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tRole('RoleListTable.columns.description')}
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tRole('RoleListTable.columns.users')}
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tRole('RoleListTable.columns.created')}
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tRole('RoleListTable.columns.updated')}
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tRole('RoleListTable.columns.actions')}
							</th>
						</tr>
					</thead>
					<Reorder.Group
						as="tbody"
						axis="y"
						values={sortedRoles.map((role) => role.id)}
						onReorder={() => {}}
					>
						{sortedRoles.map((role, index) => (
							<RolesListTableItem
								key={role.id}
								role={role}
								order={index + 1}
							/>
						))}
					</Reorder.Group>
				</table>
			</div>
		</section>
	);
};
