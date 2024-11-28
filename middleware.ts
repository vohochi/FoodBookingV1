import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, JWTPayload } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  // Xử lý route /auth/login
  if (req.nextUrl.pathname.startsWith('/auth/login')) {
    if (!token) {
      // Nếu không có token, cho phép truy cập trang login
      return NextResponse.next();
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.SECRET_KEY_ACCESS_TOKEN
      );
      const { payload }: { payload: JWTPayload } = await jwtVerify(
        token,
        secret
      );

      const user = payload.user as { id: string; role: string } | undefined;

      if (user) {
        // Nếu có token hợp lệ, redirect về tương ứng
        const redirectUrl = user.role === 'admin' ? '/admin' : '/user';

        // Sử dụng URL tuyệt đối để tránh lỗi
        const baseUrl = new URL(req.url).origin;
        return NextResponse.redirect(new URL(redirectUrl, baseUrl));
      }
    } catch (error) {
      console.log(error);
      // Nếu token không hợp lệ, xóa token và cho phép truy cập login
      const response = NextResponse.next();
      response.cookies.delete('access_token');
      return response;
    }
  }

  // Xử lý trang /user, cho phép truy cập ngay cả khi chưa đăng nhập
  if (req.nextUrl.pathname.startsWith('/user')) {
    return NextResponse.next();
  }

  // Xử lý các route được bảo vệ
  if (!token) {
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
  matcher: ['/admin/:path*', '/user/:path*', '/auth/login'],
};
