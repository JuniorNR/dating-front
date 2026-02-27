'use client';
import { Plus } from 'lucide-react';
import { Reorder } from 'motion/react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateRoleForm } from '@/features';
import { RoleEntity } from '@/shared/api/ApiGenerated';
import { Button } from '@/shared/ui/button';
import { Modal, SortBy } from '@/widgets';
import { RoleListTableProps } from '../model/role.types';
import { RoleListTableItem } from './RoleListTableItem';

export const RoleListTable: FC<RoleListTableProps> = ({ title, roles }) => {
	const { t: tRole } = useTranslation('role');
	const [sortType, setSortType] = useState<'created' | 'updated' | 'name'>('created');
	const [sortedRoles, setSortedRoles] = useState<RoleEntity[]>(roles);
	const [isLoadingModalCreate, setIsLoadingModalCreate] = useState<boolean>(false);

	return (
		<section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
			<div className="mb-4 flex items-center justify-between gap-2">
				<h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
				<div className="flex items-center gap-2">
					<SortBy
						label={tRole('RoleListTable.sortBy.label')}
						value={sortType}
						onChange={setSortType}
						sortedValue={sortedRoles}
						getSortedValue={(sortedValue) => setSortedRoles(sortedValue)}
						options={[
							{
								label: tRole('RoleListTable.sortBy.created'),
								value: 'created',
								sorter: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
							},
							{
								label: tRole('RoleListTable.sortBy.updated'),
								value: 'updated',
								sorter: (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
							},
							{
								label: tRole('RoleListTable.sortBy.name'),
								value: 'name',
								sorter: (a, b) => a.name.localeCompare(b.name),
							},
						]}
					/>
					<Modal
						formId="create-role-form-table"
						openText={tRole('RoleListTable.create.openText')}
						title={tRole('RoleListTable.create.title')}
						isLoading={isLoadingModalCreate}
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
							onLoading={(isLoading) => setIsLoadingModalCreate(isLoading)}
						/>
					</Modal>
				</div>
			</div>

			<div className="overflow-x-auto rounded-xl border border-border">
				<table className="min-w-full border-collapse text-left">
					<thead>
						<tr className="bg-accent">
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{tRole('RoleListTable.columns.order')}</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{tRole('RoleListTable.columns.id')}</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{tRole('RoleListTable.columns.type')}</th>
							<th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{tRole('RoleListTable.columns.role')}</th>
							<th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{tRole('RoleListTable.columns.description')}</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{tRole('RoleListTable.columns.users')}</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{tRole('RoleListTable.columns.created')}</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{tRole('RoleListTable.columns.updated')}</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{tRole('RoleListTable.columns.actions')}</th>
						</tr>
					</thead>
					<Reorder.Group
						as="tbody"
						axis="y"
						values={sortedRoles.map((role) => role.id)}
						onReorder={() => {}}
					>
						{sortedRoles.map((role, index) => (
							<RoleListTableItem
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
