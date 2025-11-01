// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl
  
  // Get token from cookie - using the correct name 'tokenUser'
  const token = request.cookies.get('loginToken')?.value

  console.log('🔐 Middleware Debug:');
  console.log('  Path:', pathname);
  console.log('  Has tokenUser:', !!token);
  console.log('  All cookies:', Object.fromEntries(request.cookies));

  // Define public paths
  const isPublicPath = 
    pathname === '/' || 
    pathname.startsWith('/auth')

  // If accessing protected path without token → redirect to login
  if (!isPublicPath && !token) {
    console.log('🔄 Redirecting to login - No token for protected path');
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing login page with token → redirect to intended page or dashboard
  if (token && (pathname.startsWith('/auth/login') || isPublicPath)) {
    console.log('🔄 Redirecting from login - User already authenticated');
    const from = searchParams.get('from') || '/student/dashboard';
    return NextResponse.redirect(new URL(from, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};