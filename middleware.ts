import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, JWTPayload } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  console.log(req.cookies);

  // Cho phép truy cập trang /auth/login và /user mà không cần kiểm tra token
  if (
    req.nextUrl.pathname.startsWith('/auth/login') ||
    req.nextUrl.pathname.startsWith('/user') &&
    !req.nextUrl.pathname.startsWith('/user/checkout')
  ) {
    return NextResponse.next();
  }

  // Xử lý các route được bảo vệ
  if (!token) {
    // Nếu không có token, redirect về trang login
    const baseUrl = new URL(req.url).origin;
    return NextResponse.redirect(new URL('/auth/login', baseUrl));
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
      const baseUrl = new URL(req.url).origin;
      return NextResponse.redirect(new URL('/user', baseUrl));
    }

    // Kiểm tra quyền truy cập /user/checkout
    if (req.nextUrl.pathname.startsWith('/user/checkout')) {
      const baseUrl = new URL(req.url).origin;
      return NextResponse.redirect(new URL('/auth/login', baseUrl));
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);

    // Nếu token không hợp lệ, xóa token và redirect về login
    const response = NextResponse.redirect(new URL('/auth/login', req.url));
    response.cookies.delete('access_token');
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/auth/login', '/user/checkout'],
};