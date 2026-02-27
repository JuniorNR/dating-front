'use client';
import { Pencil, Shield, Trash2, Users } from 'lucide-react';
import { FC } from 'react';
import { RoleEntity } from '@/shared/api/ApiGenerated';
import { Button } from '@/shared/ui/button';

interface RoleListListProps {
	title: string;
	roles: RoleEntity[];
}

export const RoleListList: FC<RoleListListProps> = ({ title, roles }) => {
	const formatDate = (value: string) => value.slice(0, 10);

	return (
		<section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
			<div className="mb-4">
				<h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
				<p className="mt-1 text-sm text-muted-foreground">Role timeline</p>
			</div>

			<ul className="relative ml-2 space-y-4 border-l border-border pl-6">
				{roles.map((role) => (
					<li key={role.id} className="relative">
						<span className="bg-primary absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full" />
						<div className="rounded-xl border border-border bg-accent/40 p-3 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/80">
							<div className="mb-2 flex items-start justify-between gap-3">
								<div className="flex flex-wrap items-center gap-2">
									<span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{formatDate(role.createdAt)}</span>
									<span className="text-xs text-muted-foreground">#{role.id}</span>
								</div>

								<div className="flex shrink-0 items-center gap-1">
									<Button variant="ghost" size="icon-lg" type="button" className="text-muted-foreground hover:text-foreground" aria-label="Edit role data" title="Edit role data">
										<Pencil />
									</Button>
									<Button variant="ghost" size="icon-lg" type="button" className="text-muted-foreground hover:text-foreground" aria-label="Manage permissions" title="Manage permissions">
										<Shield />
									</Button>
									<Button variant="ghost" size="icon-lg" type="button" className="text-muted-foreground hover:text-foreground" aria-label="View assigned users" title="View assigned users">
										<Users />
									</Button>
									<Button variant="ghost" size="icon-lg" type="button" className="text-destructive hover:text-destructive" aria-label="Delete role" title="Delete role">
										<Trash2 />
									</Button>
								</div>
							</div>

							<div className="flex min-h-24 flex-col">
								<h3 className="text-base font-semibold text-card-foreground">{role.name}</h3>
								<p className="mt-1 text-sm text-muted-foreground">{role.description}</p>
								<div className="mt-auto flex items-end justify-between pt-3 text-xs text-muted-foreground">
									<span className="inline-flex items-center rounded-md border border-border bg-accent px-2 py-0.5 text-[10px] font-medium tracking-normal text-muted-foreground">
										{role.type}
									</span>
									<div className="flex flex-col items-end gap-0.5">
										<span>created {formatDate(role.createdAt)}</span>
										<span>updated {formatDate(role.updatedAt)}</span>
									</div>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};
