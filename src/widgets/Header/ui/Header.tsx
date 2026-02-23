'use client';

import Link from 'next/link';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/shared/ui/navigation-menu';
import { LanguageSwitcher, ThemeSwitcher } from '@/widgets';
import { getProfileNavItems } from '../model/header.utils';

export const Header: FC = () => {
	const { t: tCommon } = useTranslation('common');
	const profileNavItems = getProfileNavItems(tCommon);

	return (
		<header className="h-[50px] bg-accent">
			<div className={`mx-auto max-w-screen-2xl w-full h-full flex items-center justify-end px-2`}>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<ThemeSwitcher />
						</NavigationMenuItem>
						<NavigationMenuItem>
							<LanguageSwitcher />
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="text-xl">{profileNavItems.title}</NavigationMenuTrigger>
							<NavigationMenuContent
								align="right"
								className="w-[400px]"
							>
								{profileNavItems.items.map((profileItem) => (
									<NavigationMenuLink
										key={profileItem.href}
										asChild
										className="w-full"
									>
										<Link href={profileItem.href}>
											<div className="flex">
												<profileItem.icon className="mr-2 mt-1" />
												<div>
													<p className="text-sm font-medium whitespace-nowrap">{profileItem.title}</p>
													<p className="text-sm text-muted-foreground whitespace-nowrap">{profileItem.description}</p>
												</div>
											</div>
										</Link>
									</NavigationMenuLink>
								))}
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
};
