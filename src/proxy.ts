import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_ROUTES } from './shared/constants';

export function proxy(request: NextRequest) {
	const token = request.cookies.get(String(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME));
	const { pathname } = request.nextUrl;

	if (PUBLIC_ROUTES.includes(pathname)) {
		return NextResponse.next();
	}

	if (!token) {
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
