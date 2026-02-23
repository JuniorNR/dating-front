import { TFunction } from 'i18next';
import { Handshake, MessageCircle, UserPen, Users } from 'lucide-react';

export const getProfileNavItems = (tCommon: TFunction<'common'>) => {
	const profileNavItemsData = {
		title: tCommon('header.profileNavigation.title'),
		items: [
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
		],
	};

	return profileNavItemsData;
};
