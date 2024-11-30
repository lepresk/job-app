import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase/auth';

export async function middleware(request: NextRequest) {
  const session = await auth.currentUser;

  // Add paths that require authentication
  const protectedPaths = [
    '/dashboard',
    '/profile',
    '/jobs/post',
    '/jobs/manage',
    '/applications',
    '/interviews',
  ];

  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !session) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/jobs/post',
    '/jobs/manage',
    '/applications/:path*',
    '/interviews/:path*',
  ],
};