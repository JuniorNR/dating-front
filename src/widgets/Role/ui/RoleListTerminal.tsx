'use client';
import { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { RoleListTerminalProps } from '../model/role.types';

export const RoleListTerminal: FC<RoleListTerminalProps> = ({ roles }) => {
	const formatDate = (value: string) => value.slice(0, 10);

	return (
		<ul className="relative overflow-hidden rounded-xl border border-emerald-300 dark:border-emerald-500/30">
			{roles.map((role) => (
				<li
					key={role.id}
					className={cn(
						'bg-emerald-100/70 p-3 font-mono dark:bg-emerald-950/30',
					)}
				>
					<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
						<div className="min-w-0">
							<p className="text-xs text-emerald-700 dark:text-emerald-400">$ role.get --id {role.id}</p>
							<p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">name: {role.name}</p>
							<p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">type: {role.type}</p>
							<p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">description: {role.description}</p>
							<div className="mt-2 space-y-1 text-[11px] text-emerald-700/75 dark:text-emerald-300/70">
								<p>users={role.users?.length || 0}</p>
								<p>created_at={formatDate(role.createdAt)}</p>
								<p>updated_at={formatDate(role.updatedAt)}</p>
							</div>
						</div>

						<div className="w-full sm:w-64 shrink-0">
							<div className="grid grid-cols-1 gap-1.5">
								<Button
									size="xs"
									type="button"
									className="w-full justify-start rounded border border-emerald-500/40 bg-emerald-200/60 px-2 py-1 text-left text-[11px] text-emerald-800 transition-colors hover:bg-emerald-300/70 dark:border-emerald-400/40 dark:bg-emerald-900/50 dark:text-emerald-200 dark:hover:bg-emerald-800/70"
								>
									$ role edit data --id={role.id}
								</Button>
								<Button
									size="xs"
									type="button"
									disabled
									className="w-full justify-start rounded border border-emerald-500/40 bg-emerald-200/60 px-2 py-1 text-left text-[11px] text-emerald-800 transition-colors hover:bg-emerald-300/70 dark:border-emerald-400/40 dark:bg-emerald-900/50 dark:text-emerald-200 dark:hover:bg-emerald-800/70"
								>
									$ role edit permissions --id={role.id}
								</Button>
								<Button
									size="xs"
									type="button"
									className="w-full justify-start rounded border border-emerald-500/40 bg-emerald-200/60 px-2 py-1 text-left text-[11px] text-emerald-800 transition-colors hover:bg-emerald-300/70 dark:border-emerald-400/40 dark:bg-emerald-900/50 dark:text-emerald-200 dark:hover:bg-emerald-800/70"
								>
									$ role get users_list --id={role.id}
								</Button>
								<Button
									size="xs"
									type="button"
									className="w-full justify-start rounded border border-emerald-500/40 bg-emerald-200/60 px-2 py-1 text-left text-[11px] text-emerald-800 transition-colors hover:bg-emerald-300/70 dark:border-emerald-400/40 dark:bg-emerald-900/50 dark:text-emerald-200 dark:hover:bg-emerald-800/70"
								>
									$ role delete --id={role.id}
								</Button>
							</div>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};
