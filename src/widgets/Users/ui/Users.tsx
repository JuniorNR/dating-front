'use client';

import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUsersStore } from '@/entities/users';
import { ErrorComponent } from '@/widgets/Error';
import { UsersListVariant } from '../model/users.types';
import { UsersSkeleton } from './Users.skeleton';
import { UsersListHeader } from './UsersListHeader';
import { UsersTable } from './UsersListTable';
import { UsersListView } from './UsersListView';

export const Users: FC = () => {
	const { t: tUsers } = useTranslation('users');
	const localStorageActiveTab = localStorage.getItem('usersActiveTab') as UsersListVariant;
	const initialVariant: UsersListVariant = localStorageActiveTab === 'byTable' || localStorageActiveTab === 'byList' ? localStorageActiveTab : 'byList';
	const [listVariant, setListVariant] = useState<UsersListVariant>(initialVariant);
	const { items: users, getAll, isInitialized, error } = useUsersStore();

	useEffect(() => {
		if (!isInitialized) {
			getAll();
		}
	}, [getAll, isInitialized]);

	if (!isInitialized) {
		return <UsersSkeleton />;
	}

	if (error) {
		return (
			<ErrorComponent
				error={error}
				isGlobal
			/>
		);
	}

	return (
		<section className="overflow-hidden rounded-3xl border bg-card p-4 text-card-foreground sm:p-6">
			<div className="mb-5">
				<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{tUsers('Users.title')}</h1>
				<p className="mt-1 text-sm text-muted-foreground">{tUsers('Users.description')}</p>
			</div>
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
				<UsersListHeader
					variant={listVariant}
					setVariant={setListVariant}
				/>
				<div className="col-span-full mt-2 hidden peer-checked/users-by-table:block">
					<UsersTable
						title={tUsers('Users.listTitles.byTable')}
						users={users || []}
					/>
				</div>
				<div className="col-span-full mt-2 hidden peer-checked/users-by-list:block">
					<UsersListView
						title={tUsers('Users.listTitles.byList')}
						users={users || []}
					/>
				</div>
			</div>
		</section>
	);
};
