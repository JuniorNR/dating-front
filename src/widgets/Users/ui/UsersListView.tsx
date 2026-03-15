'use client';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SortBy } from '@/widgets';
import { UsersListListProps } from '../model/users.types';
import { UsersListViewItem } from './UsersListViewItem';

export const UsersListView: FC<UsersListListProps> = ({ title, users }) => {
	const { t: tUsers } = useTranslation('users');
	const [sortType, setSortType] = useState<'created' | 'updated' | 'name'>('created');

	const sortOptions = [
		{
			label: tUsers('UsersListList.sortBy.created'),
			value: 'created' as const,
			sorter: (a: (typeof users)[number], b: (typeof users)[number]) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		},
		{
			label: tUsers('UsersListList.sortBy.updated'),
			value: 'updated' as const,
			sorter: (a: (typeof users)[number], b: (typeof users)[number]) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
		},
		{
			label: tUsers('UsersListList.sortBy.name'),
			value: 'name' as const,
			sorter: (a: (typeof users)[number], b: (typeof users)[number]) => a.username.localeCompare(b.username),
		},
	];
	const activeSort = sortOptions.find((option) => option.value === sortType);
	const sortedUsers = activeSort ? [...users].sort(activeSort.sorter) : users;

	return (
		<section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
			<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
				<div>
					<h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
					<p className="mt-1 text-sm text-muted-foreground">{tUsers('UsersListList.subtitle')}</p>
				</div>
				<SortBy
					label={tUsers('UsersListList.sortBy.label')}
					value={sortType}
					onChange={setSortType}
					options={sortOptions}
				/>
			</div>

			<ul className="relative ml-2 space-y-4 border-l border-border pl-6">
				{sortedUsers.map((user) => (
					<UsersListViewItem
						key={user.id}
						user={user}
					/>
				))}
			</ul>
		</section>
	);
};
