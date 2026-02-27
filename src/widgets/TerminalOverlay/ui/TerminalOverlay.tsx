'use client';
import { FC } from 'react';
import { TerminalOverlayProps } from '../model/terminalOverlay.types';

export const TerminalOverlay: FC<TerminalOverlayProps> = ({ title, entries, children, terminal }) => {
	return (
		<section className="relative isolate overflow-hidden rounded-2xl border border-emerald-300 bg-emerald-50/70 p-4 sm:p-5 dark:border-emerald-500/35 dark:bg-slate-950">
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0,transparent_4px,rgba(16,185,129,0.12)_5px)] bg-size-[100%_6px] opacity-25 dark:opacity-20" />

			<div className="relative mb-3 flex items-center justify-between rounded-md border border-emerald-300/70 bg-emerald-100/70 px-3 py-1.5 text-xs dark:border-emerald-400/30 dark:bg-emerald-900/30">
				<div className="flex items-center gap-1.5">
					<span className="h-2 w-2 rounded-full bg-emerald-500/70" />
					<span className="h-2 w-2 rounded-full bg-emerald-500/50" />
					<span className="h-2 w-2 rounded-full bg-emerald-500/30" />
				</div>
				<span className="font-mono text-emerald-700 dark:text-emerald-300">terminal://{terminal}</span>
			</div>

			<div className="relative mb-4 flex items-center justify-between gap-2">
				<h2 className="font-mono text-lg font-semibold text-emerald-900 dark:text-emerald-100">{title}</h2>
				<span className="font-mono text-xs uppercase tracking-[0.14em] text-emerald-700/80 dark:text-emerald-300/80">{entries} entries</span>
			</div>

			<div className="relative">{children}</div>
		</section>
	);
};
