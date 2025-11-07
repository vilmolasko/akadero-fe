import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // ✅ Public routes (no auth/sign-in required )
  const publicRoutes = ['/', '/auth/sign-in', '/auth/sign-up'];

  // Allow public routes freely
  if (publicRoutes.some((p) => pathname === p || pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // ✅ Require token for protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Admin routes → only admin
    if (pathname.startsWith('/admin')) {
      if (user.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // ✅ Organizer routes → only organizer
    if (pathname.startsWith('/organizer')) {
      if (user.role !== 'organizer') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // ✅ All other routes okay
    return NextResponse.next();
  } catch (err) {
    console.error('Invalid token:', err);
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }
}

// ✅ Apply middleware only to protected routes
export const config = {
  matcher: ['/admin/:path*', '/organizer/:path*'],
};
