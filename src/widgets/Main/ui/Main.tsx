import { FC } from 'react';
import { MainProps } from '../model/main.types';

export const Main: FC<MainProps> = ({ children }) => {
	return (
		<main className="min-h-[calc(100vh-50px-25px)] max-h-[calc(100vh-50px-25px)] overflow-y-auto overflow-x-hidden grow w-full max-w-screen-2xl mx-auto p-2">
			{children}
		</main>
	);
};
