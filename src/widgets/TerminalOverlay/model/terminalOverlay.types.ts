import { ReactNode } from 'react';

export interface TerminalOverlayProps {
	title: string;
	entries: number;
	children: ReactNode;
	terminal: string;
}
