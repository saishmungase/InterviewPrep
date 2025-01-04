import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (pathname.startsWith('/dashboard')) {
        const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
        if (!token) {
            const url = new URL('/signup', req.url); 
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
