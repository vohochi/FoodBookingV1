import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, JWTPayload } from 'jose';
// import { loginSocial } from '@/_lib/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  console.log(req.cookies);

  // Cho phép truy cập trang /auth/login và /user mà không cần kiểm tra token
  // const authSessionToken = req.cookies.get('authjs.session-token');

  // console.log(authSessionToken);
  // if (authSessionToken) {
  //   const res = await loginSocial({
  //     email: process.env.SOCIAL_LOGIN_EMAIL || '',
  //     password: process.env.SOCIAL_LOGIN_PASSWORD || '',
  //   });

  //   console.log(res);
  // }

  // Nếu đã có token, ngăn truy cập các route login và register
  if (token) {
    if (
      req.nextUrl.pathname.startsWith('/auth/login') ||
      req.nextUrl.pathname.startsWith('/auth/register')
    ) {
      return NextResponse.redirect(new URL('/user', req.url)); // Chuyển hướng về trang chính
    }
  }

  // Cho phép truy cập các route public mà không cần token
  if (
    req.nextUrl.pathname.startsWith('/user') || // Cho phép truy cập `/user`
    req.nextUrl.pathname.startsWith('/auth/login') ||
    req.nextUrl.pathname.startsWith('/user') &&
    !req.nextUrl.pathname.startsWith('/user/checkout') ||
    req.nextUrl.pathname.startsWith('/auth/register')
  ) {
    return NextResponse.next();
  }

  // Nếu không có token và không phải route public, chuyển hướng về trang login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.SECRET_KEY_ACCESS_TOKEN
    );
    const { payload }: { payload: JWTPayload } = await jwtVerify(token, secret);

    const user = payload.user as { id: string; role: string } | undefined;
    if (!user || !user.role) {
      throw new Error('Invalid token: missing user role');
    }

    // Kiểm tra quyền truy cập route /admin
    if (req.nextUrl.pathname.startsWith('/admin') && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/user', req.url));
    }

    // Kiểm tra quyền truy cập /user/checkout
    if (req.nextUrl.pathname.startsWith('/user/checkout')) {
      const baseUrl = new URL(req.url).origin;
      return NextResponse.redirect(new URL('/auth/login', baseUrl));
    }

    // Cho phép truy cập các route khác
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed:', error);

    // Xóa token không hợp lệ và chuyển hướng về login
    const response = NextResponse.redirect(new URL('/auth/login', req.url));
    response.cookies.delete('access_token');
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/auth/login', '/user/checkout','/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
