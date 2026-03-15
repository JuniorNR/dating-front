'use client';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoleStore } from '@/entities/role';
import { ErrorComponent } from '@/widgets';
import { RolesListVariant } from '../model/roles.types';
import { RolesSkeleton } from './Roles.skeleton';
import { RolesListHeader } from './RolesListHeader';
import { RolesTable } from './RolesListTable';
import { RolesListView } from './RolesListView';

export const Roles: FC = () => {
	const { t: tRole } = useTranslation('role');
	const localStorageActiveTab = localStorage.getItem('rolesActiveTab') as RolesListVariant;
	const initialVariant: RolesListVariant = localStorageActiveTab === 'byTable' || localStorageActiveTab === 'byList' ? localStorageActiveTab : 'byList';
	const [listVariant, setListVariant] = useState<RolesListVariant>(initialVariant);
	const { items: roles, isInitialized, getAll, error } = useRoleStore();

	useEffect(() => {
		if (!isInitialized) {
			getAll();
		}
	}, [
		getAll,
		isInitialized,
	]);

	if (!isInitialized) {
		return <RolesSkeleton />;
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
				<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{tRole('Role.title')}</h1>
				<p className="mt-1 text-sm text-muted-foreground">{tRole('Role.description')}</p>
			</div>
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
				<RolesListHeader
					variant={listVariant}
					setVariant={setListVariant}
				/>
				<div className="col-span-full mt-2 hidden peer-checked/by-table:block">
					<RolesTable
						title={tRole('Role.listTitles.byTable')}
						roles={roles || []}
					/>
				</div>
				<div className="col-span-full mt-2 hidden peer-checked/by-list:block">
					<RolesListView
						title={tRole('Role.listTitles.byList')}
						roles={roles || []}
					/>
				</div>
			</div>
		</section>
	);
};
