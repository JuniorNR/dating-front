'use client';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SortBy } from '@/widgets';
import { UsersListTableProps } from '../model/users.types';
import { UsersListTableItem } from './UsersListTableItem';

export const UsersTable: FC<UsersListTableProps> = ({ title, users }) => {
	const { t: tUsers } = useTranslation('users');
	const [sortType, setSortType] = useState<'created' | 'updated' | 'name'>('created');

	const sortOptions = [
		{
			label: tUsers('UsersListTable.sortBy.created'),
			value: 'created' as const,
			sorter: (a: (typeof users)[number], b: (typeof users)[number]) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		},
		{
			label: tUsers('UsersListTable.sortBy.updated'),
			value: 'updated' as const,
			sorter: (a: (typeof users)[number], b: (typeof users)[number]) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
		},
		{
			label: tUsers('UsersListTable.sortBy.name'),
			value: 'name' as const,
			sorter: (a: (typeof users)[number], b: (typeof users)[number]) => a.username.localeCompare(b.username),
		},
	];
	const activeSort = sortOptions.find((option) => option.value === sortType);
	const sortedUsers = activeSort ? [...users].sort(activeSort.sorter) : users;

	return (
		<section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
			<div className="mb-4 flex items-center justify-between gap-2">
				<h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
				<SortBy
					label={tUsers('UsersListTable.sortBy.label')}
					value={sortType}
					onChange={setSortType}
					options={sortOptions}
				/>
			</div>

			<div className="overflow-x-auto rounded-xl border border-border">
				<table className="min-w-full border-collapse text-left">
					<thead>
						<tr className="bg-accent">
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tUsers('UsersListTable.columns.order')}
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tUsers('UsersListTable.columns.id')}
							</th>
							<th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{tUsers('UsersListTable.columns.username')}</th>
							<th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{tUsers('UsersListTable.columns.email')}</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tUsers('UsersListTable.columns.roles')}
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tUsers('UsersListTable.columns.status')}
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tUsers('UsersListTable.columns.created')}
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tUsers('UsersListTable.columns.updated')}
							</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								{tUsers('UsersListTable.columns.actions')}
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedUsers.map((user, index) => (
							<UsersListTableItem
								key={user.id}
								user={user}
								order={index + 1}
							/>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};
