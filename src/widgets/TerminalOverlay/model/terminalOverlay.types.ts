import { ReactNode } from 'react';

export interface TerminalOverlayProps {
	title: string;
	headerNode?: ReactNode;
	entries: number;
	entriesLabel?: string;
	children: ReactNode;
	terminal: string;
}
