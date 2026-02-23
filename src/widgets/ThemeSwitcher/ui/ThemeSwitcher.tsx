'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';

export const ThemeSwitcher: FC = () => {
	const { setTheme } = useTheme();
	const { t: tCommon } = useTranslation('common');

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">{tCommon('themeSwitcher.title')}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme('light')}>{tCommon('themeSwitcher.light')}</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>{tCommon('themeSwitcher.dark')}</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>{tCommon('themeSwitcher.system')}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
