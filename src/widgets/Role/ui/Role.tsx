'use client';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoleStore } from '@/entities/role';
import { RoleListVariant } from '../model/role.types';
import { RoleSkeleton } from './Role.skeleton';
import { RoleList } from './RoleList';
import { RoleListHeader } from './RoleListHeader';

export const Role: FC = () => {
	const { t: tRole } = useTranslation('role');
	const localStorageActiveTab = localStorage.getItem('rolesActiveTab') as RoleListVariant;
	const [listVariant, setListVariant] = useState<RoleListVariant>(localStorageActiveTab || 'byList');
	const { roles, isLoading, isInitialized, getRoles } = useRoleStore();

	useEffect(() => {
		if (!isInitialized) {
			getRoles();
		}
	}, [
		getRoles,
		isInitialized,
	]);

	if (!isInitialized) {
		return <RoleSkeleton />;
	}

	return (
		<section className="overflow-hidden rounded-3xl border bg-card p-4 text-card-foreground sm:p-6">
			<div className="mb-5">
				<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{tRole('Role.title')}</h1>
				<p className="mt-1 text-sm text-muted-foreground">{tRole('Role.description')}</p>
			</div>
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
				<RoleListHeader
					variant={listVariant}
					setVariant={setListVariant}
				/>
				<div className="col-span-full mt-2 hidden peer-checked/by-console:block">
					<RoleList
						title="by console"
						roles={roles || []}
						variant="byConsole"
					/>
				</div>
				<div className="col-span-full mt-2 hidden peer-checked/by-table:block">
					<RoleList
						title={tRole('Role.listTitles.byTable')}
						roles={roles || []}
						variant="byTable"
					/>
				</div>
				<div className="col-span-full mt-2 hidden peer-checked/by-list:block">
					<RoleList
						title={tRole('Role.listTitles.byList')}
						roles={roles || []}
						variant="byList"
					/>
				</div>
			</div>
		</section>
	);
};
