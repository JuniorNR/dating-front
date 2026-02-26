export const PUBLIC_ROUTES = [
	'/',
];

export const USER_ROUTES = {
	PROFILE: '/profile',
	FRIENDS: '/friends',
	GROUPS: '/groups',
	CHATS: '/chats',
	SETTINGS: '/settings',
} as const;

export const SUPERUSER_ROUTES = {
	ROLES: '/roles',
	USERS: '/users',
} as const;
