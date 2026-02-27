'use client';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateRoleForm } from '@/features';
import { Button } from '@/shared/ui/button';
import { Modal, TerminalOverlay } from '@/widgets';
import { RoleListProps } from '../model/role.types';
import { RoleListList } from './RoleListList';
import { RoleListTable } from './RoleListTable';
import { RoleListTerminal } from './RoleListTerminal';

export const RoleList: FC<RoleListProps> = ({ title, roles, variant }) => {
	const { t: tRole } = useTranslation('role');
	const [isLoadingModalCreate, setIsLoadingModalCreate] = useState<boolean>(false);
	const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

	if (variant === 'byTable') {
		return (
			<RoleListTable
				title={title}
				roles={roles}
			/>
		);
	}

	if (variant === 'byConsole') {
		return (
			<TerminalOverlay
				title={title}
				headerNode={
					<Modal
						formId="create-role-form-terminal"
						openText={tRole('RoleListTable.create.openText')}
						title={tRole('RoleListTable.create.title')}
						isLoading={isLoadingModalCreate}
						isOpen={isOpenModalCreate}
						setIsOpen={setIsOpenModalCreate}
						renderTrigger={
							<Button
								size="xs"
								type="button"
								aria-label={tRole('RoleListTable.create.triggerAria')}
								title={tRole('RoleListTable.create.triggerAria')}
								className="justify-start rounded border border-emerald-500/40 bg-emerald-200/60 px-2 py-1 font-mono text-left text-[11px] text-emerald-800 transition-colors hover:bg-emerald-300/70 dark:border-emerald-400/40 dark:bg-emerald-900/50 dark:text-emerald-200 dark:hover:bg-emerald-800/70"
							>
								$ role create
							</Button>
						}
					>
						<CreateRoleForm
							formId="create-role-form-terminal"
							onSuccess={() => setIsOpenModalCreate(false)}
							onLoading={(isLoading) => setIsLoadingModalCreate(isLoading)}
						/>
					</Modal>
				}
				entries={roles.length}
				terminal="roles"
			>
				<RoleListTerminal roles={roles} />
			</TerminalOverlay>
		);
	}

	if (variant === 'byList') {
		return (
			<RoleListList
				title={title}
				roles={roles}
			/>
		);
	}

	return null;
};
