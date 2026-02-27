import { TFunction } from 'i18next';
import { Handshake, LogOut, MessageCircle, Settings, UserCog, UserKey, UserPen, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/entities/user';
import { ROLES, SUPERUSER_ROUTES, USER_ROUTES } from '@/shared/constants';

export const useProfileNavItems = (tCommon: TFunction<'common'>, roles: string[]) => {
	const userStore = useUserStore();
	const router = useRouter();

	if (roles.includes(ROLES.superUser)) {
		const profileNavItemsSuperUserData = {
			title: tCommon('header.profileNavigation.title'),
			links: [
				{
					title: tCommon('header.profileNavigation.profile.title'),
					href: USER_ROUTES.PROFILE,
					icon: UserPen,
					description: tCommon('header.profileNavigation.profile.description'),
				},
				{
					title: tCommon('header.profileNavigation.roles.title'),
					href: SUPERUSER_ROUTES.ROLES,
					icon: UserKey,
					description: tCommon('header.profileNavigation.roles.description'),
				},
				{
					title: tCommon('header.profileNavigation.users.title'),
					href: SUPERUSER_ROUTES.USERS,
					icon: UserCog,
					description: tCommon('header.profileNavigation.users.description'),
				},
				{
					title: tCommon('header.profileNavigation.chats.title'),
					href: USER_ROUTES.CHATS,
					icon: MessageCircle,
					description: tCommon('header.profileNavigation.chats.description'),
				},
				{
					title: tCommon('header.profileNavigation.settings.title'),
					href: USER_ROUTES.SETTINGS,
					icon: Settings,
					description: tCommon('header.profileNavigation.settings.description'),
				},
			],
			buttons: [
				{
					title: tCommon('header.profileNavigation.logout.title'),
					icon: LogOut,
					description: tCommon('header.profileNavigation.logout.description'),
					onClick: async () => {
						await userStore.logout();
						router.push('/');
					},
				},
			],
		};

		return profileNavItemsSuperUserData;
	}

	const profileNavItemsUserData = {
		title: tCommon('header.profileNavigation.title'),
		links: [
			{
				title: tCommon('header.profileNavigation.profile.title'),
				href: USER_ROUTES.PROFILE,
				icon: UserPen,
				description: tCommon('header.profileNavigation.profile.description'),
			},
			{
				title: tCommon('header.profileNavigation.friends.title'),
				href: USER_ROUTES.FRIENDS,
				icon: Handshake,
				description: tCommon('header.profileNavigation.friends.description'),
			},
			{
				title: tCommon('header.profileNavigation.groups.title'),
				href: USER_ROUTES.GROUPS,
				icon: Users,
				description: tCommon('header.profileNavigation.groups.description'),
			},
			{
				title: tCommon('header.profileNavigation.chats.title'),
				href: USER_ROUTES.CHATS,
				icon: MessageCircle,
				description: tCommon('header.profileNavigation.chats.description'),
			},
			{
				title: tCommon('header.profileNavigation.settings.title'),
				href: USER_ROUTES.SETTINGS,
				icon: Settings,
				description: tCommon('header.profileNavigation.settings.description'),
			},
		],
		buttons: [
			{
				title: tCommon('header.profileNavigation.logout.title'),
				icon: LogOut,
				description: tCommon('header.profileNavigation.logout.description'),
				onClick: async () => {
					await userStore.logout();
					router.push('/');
				},
			},
		],
	};

	return profileNavItemsUserData;
};
