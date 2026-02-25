import { TFunction } from 'i18next';
import { Handshake, LogOut, MessageCircle, Settings, UserPen, Users } from 'lucide-react';
import { useUserStore } from '@/entities/user';
import { useAuthControllerLogout } from '@/shared/api/ApiGenerated';

export const getProfileNavItems = (tCommon: TFunction<'common'>) => {
	const { mutate } = useAuthControllerLogout();
	const resetUser = useUserStore((store) => store.reset);

	const profileNavItemsData = {
		title: tCommon('header.profileNavigation.title'),
		links: [
			{
				title: tCommon('header.profileNavigation.myProfile.title'),
				href: '/profile',
				icon: UserPen,
				description: tCommon('header.profileNavigation.myProfile.description'),
			},
			{
				title: tCommon('header.profileNavigation.myFriends.title'),
				href: '/friends',
				icon: Handshake,
				description: tCommon('header.profileNavigation.myFriends.description'),
			},
			{
				title: tCommon('header.profileNavigation.myGroups.title'),
				href: '/groups',
				icon: Users,
				description: tCommon('header.profileNavigation.myGroups.description'),
			},
			{
				title: tCommon('header.profileNavigation.myChats.title'),
				href: '/chats',
				icon: MessageCircle,
				description: tCommon('header.profileNavigation.myChats.description'),
			},
			{
				title: tCommon('header.profileNavigation.mySettings.title'),
				href: '/settings',
				icon: Settings,
				description: tCommon('header.profileNavigation.mySettings.description'),
			},
		],
		buttons: [
			{
				title: tCommon('header.profileNavigation.logout.title'),
				icon: LogOut,
				description: tCommon('header.profileNavigation.logout.description'),
				onClick: () => {
					mutate();
					resetUser();
				},
			},
		],
	};

	return profileNavItemsData;
};
