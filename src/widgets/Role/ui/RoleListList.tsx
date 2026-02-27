'use client';
import { Plus } from 'lucide-react';
import { Reorder } from 'motion/react';
import { FC, useState } from 'react';
import { CreateRoleForm } from '@/features';
import { RoleEntity } from '@/shared/api/ApiGenerated';
import { Button } from '@/shared/ui/button';
import { Modal, SortBy } from '@/widgets';
import { RoleListListItem } from '@/widgets/Role/ui/RoleListListItem';
import { RoleListListProps } from '../model/role.types';

export const RoleListList: FC<RoleListListProps> = ({ title, roles }) => {
	const [sortType, setSortType] = useState<'created' | 'updated' | 'name'>('created');
	const [sortedRoles, setSortedRoles] = useState<RoleEntity[]>(roles);
	const [isLoadingModalCreate, setIsLoadingModalCreate] = useState<boolean>(false);

	return (
		<section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
			<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
				<div>
					<h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
					<p className="mt-1 text-sm text-muted-foreground">Role list</p>
				</div>
				<div className="flex items-center gap-2">
					<SortBy
						value={sortType}
						onChange={setSortType}
						sortedValue={sortedRoles}
						getSortedValue={(sortedValue) => setSortedRoles(sortedValue)}
						options={[
							{
								label: 'Created',
								value: 'created',
								sorter: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
							},
							{
								label: 'Updated',
								value: 'updated',
								sorter: (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
							},
							{
								label: 'Name',
								value: 'name',
								sorter: (a, b) => a.name.localeCompare(b.name),
							},
						]}
					/>
					<Modal
						formId="create-role-form"
						openText="Create"
						title="Create role"
						isLoading={isLoadingModalCreate}
						renderTrigger={
							<Button
								variant="outline"
								size="icon"
								type="button"
								aria-label="Add role"
								title="Add role"
							>
								<Plus />
							</Button>
						}
					>
						<CreateRoleForm
							formId="create-role-form"
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
					<RoleListListItem
						key={role.id}
						role={role}
					/>
				))}
			</Reorder.Group>
		</section>
	);
};
