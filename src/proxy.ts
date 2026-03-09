import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_ROUTES } from './shared/constants';

const isUnauthorized = async (request: NextRequest): Promise<boolean> => {
	const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

	try {
		const response = await fetch(`${baseURL}/api/user/auth`, {
			method: 'GET',
			headers: {
				cookie: request.headers.get('cookie') ?? '',
			},
			cache: 'no-store',
		});

		return response.status === 401;
	} catch {
		return true;
	}
};

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (PUBLIC_ROUTES.includes(pathname)) {
		return NextResponse.next();
	}

	if (await isUnauthorized(request)) {
		const referer = request.headers.get('referer');

		if (referer) {
			const prevPath = new URL(referer).pathname;
			if (PUBLIC_ROUTES.includes(prevPath)) {
				return NextResponse.redirect(new URL(prevPath, request.url));
			}
		}

		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|api).*)',
	],
};
