import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { CurrentRole } from '@/lib/auth';
import { adminRoutes, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes';

export default auth(async (request) => {
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isSessionRoute = nextUrl.pathname === '/api/auth/session';

  if (isApiAuthRoute || isSessionRoute) {
    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
    return NextResponse.next();
  }

  // if (!isLoggedIn) {
  //   let callbackUrl = nextUrl.pathname;
  //   if (nextUrl.search) {
  //     callbackUrl += nextUrl.search;
  //   }
  //   const encodedCallbackUrl = encodeURIComponent(callbackUrl);
  //   return NextResponse.redirect(
  //     new URL(`/auth/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
  //   );
  // }

  if (isAdminRoute) {
    const role = await CurrentRole();
    if (role !== 'Admin') {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
