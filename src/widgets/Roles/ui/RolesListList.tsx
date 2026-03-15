'use client';
import { Plus } from 'lucide-react';
import { Reorder } from 'motion/react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateRoleForm } from '@/features';
import { Button } from '@/shared/ui/button';
import { Modal, SortBy } from '@/widgets';
import { RolesListListItem } from '@/widgets/Roles/ui/RolesListListItem';
import { RolesListListProps } from '../model/roles.types';

export const RolesListList: FC<RolesListListProps> = ({ title, roles }) => {
	const { t: tRole } = useTranslation('role');
	const [sortType, setSortType] = useState<'created' | 'updated' | 'name'>('created');
	const [isLoadingModalCreate, setIsLoadingModalCreate] = useState<boolean>(false);
	const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

	const sortOptions = [
		{
			label: tRole('RoleListList.sortBy.created'),
			value: 'created' as const,
			sorter: (a: (typeof roles)[number], b: (typeof roles)[number]) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		},
		{
			label: tRole('RoleListList.sortBy.updated'),
			value: 'updated' as const,
			sorter: (a: (typeof roles)[number], b: (typeof roles)[number]) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
		},
		{
			label: tRole('RoleListList.sortBy.name'),
			value: 'name' as const,
			sorter: (a: (typeof roles)[number], b: (typeof roles)[number]) => a.name.localeCompare(b.name),
		},
	];
	const activeSort = sortOptions.find((option) => option.value === sortType);
	const sortedRoles = activeSort ? [...roles].sort(activeSort.sorter) : roles;

	return (
		<section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
			<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
				<div>
					<h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
					<p className="mt-1 text-sm text-muted-foreground">{tRole('RoleListList.subtitle')}</p>
				</div>
				<div className="flex items-center gap-2">
					<SortBy
						label={tRole('RoleListList.sortBy.label')}
						value={sortType}
						onChange={setSortType}
						options={sortOptions}
					/>
					<Modal
						formId="create-role-form"
						openText={tRole('RoleListList.create.openText')}
						title={tRole('RoleListList.create.title')}
						isLoading={isLoadingModalCreate}
						isOpen={isOpenModalCreate}
						setIsOpen={setIsOpenModalCreate}
						renderTrigger={
							<Button
								variant="outline"
								size="icon"
								type="button"
								aria-label={tRole('RoleListList.create.triggerAria')}
								title={tRole('RoleListList.create.triggerAria')}
							>
								<Plus />
							</Button>
						}
					>
						<CreateRoleForm
							formId="create-role-form"
							onSuccess={() => setIsOpenModalCreate(false)}
							onLoading={(isLoading) => setIsLoadingModalCreate(isLoading)}
						/>
					</Modal>
				</div>
			</div>

			<Reorder.Group
				as="ul"
				axis="y"
				values={sortedRoles.map((role) => role.id)}
				onReorder={() => {}}
				className="relative ml-2 space-y-4 border-l border-border pl-6"
			>
				{sortedRoles.map((role) => (
					<RolesListListItem
						key={role.id}
						role={role}
					/>
				))}
			</Reorder.Group>
		</section>
	);
};
