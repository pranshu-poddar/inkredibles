import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Pages } from './constants/page.constant';

// Mark the function as async for await usage
export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('sessionToken'); // Retrieve session token
  const pathName = request.nextUrl.pathname;

  if (!sessionToken) {
    // No session token, redirect to login page
    return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathName)}`, request.url));
  }

  // Session token exists, proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", '/dashboard/:path*', '/checkout/address'],
}
