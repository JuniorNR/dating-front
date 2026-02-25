'use client';

import { LogIn } from 'lucide-react';
import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/entities/user';
import { LoginForm, RegistrationForm } from '@/features';
import { Button } from '@/shared/ui/button';
import {
	NavigationMenu,
	NavigationMenuButton,
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

	const [isOpenModalRegistration, setIsOpenModalRegistration] = useState<boolean>(false);
	const [isLoadingRegistration, setIsLoadingRegistration] = useState<boolean>(false);

	const { user, isAuth } = useUserStore();

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
							<NavigationMenuTrigger
								className="text-xl cursor-copy"
								onClick={() => navigator.clipboard.writeText(`@${user?.username}`)}
							>
								@{user?.username}
							</NavigationMenuTrigger>
							<NavigationMenuContent
								align="right"
								className="w-[400px]"
							>
								{profileNavItems.links.map((profileItemLink) => (
									<NavigationMenuLink
										key={profileItemLink.href}
										asChild
										className="w-full"
										href={profileItemLink.href}
										icon={profileItemLink.icon}
										title={profileItemLink.title}
										description={profileItemLink.description}
									/>
								))}
								{profileNavItems.buttons.map((profileItemButton) => (
									<NavigationMenuButton
										key={profileItemButton.title}
										asChild
										className="w-full"
										icon={profileItemButton.icon}
										title={profileItemButton.title}
										description={profileItemButton.description}
										onClick={profileItemButton.onClick}
										color="danger"
									/>
								))}
							</NavigationMenuContent>
						</NavigationMenuItem>
						{!isAuth && (
							<>
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
												className="flex gap-0 text-sm"
												variant="outline"
											>
												<LogIn className="size-4 mr-2" />
												<p>{tCommon('header.loginModal.login')}</p>
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
								<NavigationMenuItem>
									<Modal
										formId="registrationForm"
										openText={tCommon('header.registrationModal.registration')}
										title={tCommon('header.registrationModal.title')}
										description={tCommon('header.registrationModal.description')}
										confirmText={tCommon('modal.confirm')}
										closeText={tCommon('modal.close')}
										isLoading={isLoadingRegistration}
										isOpen={isOpenModalRegistration}
										setIsOpen={setIsOpenModalRegistration}
										renderTrigger={
											<Button
												className="flex gap-0 text-sm"
												variant="outline"
											>
												<LogIn className="size-4 mr-2" />
												<p>{tCommon('header.registrationModal.registration')}</p>
											</Button>
										}
									>
										<RegistrationForm
											formId="registrationForm"
											onSuccess={() => {
												setIsOpenModalRegistration(false);
											}}
											onLoading={(isLoading) => {
												setIsLoadingRegistration(isLoading);
											}}
										/>
									</Modal>
								</NavigationMenuItem>
							</>
						)}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
};
