'use client';

import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/features';
import { Button } from '@/shared/ui/button';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/shared/ui/navigation-menu';
import { LanguageSwitcher, Modal, ThemeSwitcher } from '@/widgets';
import { getProfileNavItems } from '../model/header.utils';

export const Header: FC = () => {
	const { t: tCommon } = useTranslation('common');
	const profileNavItems = getProfileNavItems(tCommon);
	const [isOpenModalLogin, setIsOpenModalLogin] = useState<boolean>(false);
	const [isLoadingModalLogin, setIsLoadingModalLogin] = useState<boolean>(false);

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
						<NavigationMenuItem>
							<Modal
								formId="loginForm"
								openText={tCommon('header.loginModal.login')}
								title={tCommon('header.loginModal.title')}
								description={tCommon('header.loginModal.description')}
								confirmText={tCommon('modal.confirm')}
								closeText={tCommon('modal.close')}
								isLoading={isLoadingModalLogin}
								isOpen={isOpenModalLogin}
								setIsOpen={setIsOpenModalLogin}
								renderTrigger={
									<Button
										variant="outline"
										size="icon"
									>
										<LogIn />
									</Button>
								}
							>
								<LoginForm
									formId="loginForm"
									onSuccess={() => {
										setIsOpenModalLogin(false);
									}}
									onLoading={(isLoading) => {
										setIsLoadingModalLogin(isLoading);
									}}
								/>
							</Modal>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
};
