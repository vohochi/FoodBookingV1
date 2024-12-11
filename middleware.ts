import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const tokenString = req.cookies.get('access_token1')?.value;
  // console.log(req.cookies.get('__Secure-authjs.session-token'));

  let token;
  if (tokenString) {
    try {
      token = JSON.parse(tokenString);
    } catch (error) {
      console.error('Error parsing token:', error);
    }
  }

  // Nếu đã có token, ngăn truy cập các route login và register
  if (token?.token) {
    if (
      req.nextUrl.pathname.startsWith('/auth/login') ||
      req.nextUrl.pathname.startsWith('/auth/register')
    ) {
      return NextResponse.redirect(new URL('/user', req.url));
    }
  }

  // Cho phép truy cập các route public mà không cần token
  if (
    req.nextUrl.pathname.startsWith('/user') || // Cho phép truy cập `/user`
    req.nextUrl.pathname.startsWith('/auth/login') ||
    req.nextUrl.pathname.startsWith('/auth/register')
  ) {
    return NextResponse.next();
  }

  // Nếu không có token và không phải route public, chuyển hướng về trang login
  if (!token?.token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    if (!token.role) {
      throw new Error('Invalid token: missing user role');
    }

    // Kiểm tra quyền truy cập route /admin
    if (req.nextUrl.pathname.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/user', req.url));
    }

    // Cho phép truy cập các route khác
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed:', error);

    // Xóa token không hợp lệ và chuyển hướng về login
    const response = NextResponse.redirect(new URL('/auth/login', req.url));
    response.cookies.delete('access_token1');
    return response;
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/user/:path*',
    '/auth/login',
    // '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};
