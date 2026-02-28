import { FC } from 'react';
import { MainProps } from '../model/main.types';

export const Main: FC<MainProps> = ({ children }) => {
	return (
		<main className="min-h-[calc(100vh-50px-25px)] max-h-[calc(100vh-50px-25px)] overflow-y-auto overflow-x-hidden grow w-full py-2 px-[calc(0.5rem+max(0px,(100vw-96rem)/2))]">
			{children}
		</main>
	);
};
