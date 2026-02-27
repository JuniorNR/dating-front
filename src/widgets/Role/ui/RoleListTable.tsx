'use client';
import { Pencil, Shield, Trash2, Users } from 'lucide-react';
import { FC } from 'react';
import { Button } from '@/shared/ui/button';
import { RoleListTableProps } from '../model/role.types';

export const RoleListTable: FC<RoleListTableProps> = ({ title, roles }) => {
	const formatDate = (value: string) => value.slice(0, 10);

	return (
		<section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
			<div className="mb-4 flex items-center justify-between gap-2">
				<h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
				<span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{roles.length} roles</span>
			</div>

			<div className="overflow-x-auto rounded-xl border border-border">
				<table className="min-w-full border-collapse text-left">
					<thead>
						<tr className="bg-accent">
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Order</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Id</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Type</th>
							<th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Role</th>
							<th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Description</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Users</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Created</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Updated</th>
							<th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Actions</th>
						</tr>
					</thead>
					<tbody>
						{roles.map((role, index) => (
							<tr
								key={role.id}
								className="border-t border-border transition-colors hover:bg-accent/60"
							>
								<td className="px-4 py-3 text-center text-sm text-muted-foreground">{index + 1}</td>
								<td className="px-4 py-3 text-center text-sm text-muted-foreground">{role.id}</td>
								<td className="px-4 py-3 text-center">
									<span className="inline-flex items-center rounded-md border border-border bg-accent px-2 py-0.5 text-[10px] font-medium tracking-normal text-muted-foreground">
										{role.type}
									</span>
								</td>
								<td className="px-4 py-3">
									<p className="text-sm font-semibold text-card-foreground">{role.name}</p>
								</td>
								<td className="px-4 py-3 text-sm text-muted-foreground">{role.description}</td>
								<td className="px-4 py-3 text-center text-sm text-muted-foreground">{role.users?.length ?? 0}</td>
								<td className="px-4 py-3 text-center text-sm text-muted-foreground">{formatDate(role.createdAt)}</td>
								<td className="px-4 py-3 text-center text-sm text-muted-foreground">{formatDate(role.updatedAt)}</td>
								<td className="px-4 py-3">
									<div className="flex items-center justify-center gap-1">
										<Button
											variant="ghost"
											size="icon-lg"
											type="button"
											className="text-muted-foreground hover:text-foreground"
											aria-label="Edit role data"
											title="Edit role data"
										>
											<Pencil />
										</Button>
										<Button
											variant="ghost"
											size="icon-lg"
											type="button"
											className="text-muted-foreground hover:text-foreground"
											aria-label="Manage permissions"
											title="Manage permissions"
										>
											<Shield />
										</Button>
										<Button
											variant="ghost"
											size="icon-lg"
											type="button"
											className="text-muted-foreground hover:text-foreground"
											aria-label="View assigned users"
											title="View assigned users"
										>
											<Users />
										</Button>
										<Button
											variant="ghost"
											size="icon-lg"
											type="button"
											className="text-destructive hover:text-destructive"
											aria-label="Delete role"
											title="Delete role"
										>
											<Trash2 />
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};
