import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const { pathname } = request.nextUrl;

    // Define protected routes
    const protectedPaths = ['/product-category', '/product', '/product-variant', '/task'];
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

    // If the path is protected and there's no token, redirect to login
    if (isProtectedPath && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If the user is logged in and tries to access login/register, redirect to home
    if (token && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
