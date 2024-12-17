import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const tokenString = req.cookies.get('access_token1')?.value;
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
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Kiểm tra route admin TRƯỚC các kiểm tra token khác
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Nếu không có token, chuyển hướng login
    if (!token?.token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Kiểm tra role admin
    if (!token.role || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (
    req.nextUrl.pathname.startsWith('/checkout') ||
    req.nextUrl.pathname.startsWith('/account/profile')
  ) {
    // Nếu không có token, chuyển hướng về trang login
    if (!token?.token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  // Cho phép truy cập các route public mà không cần token
  if (
    req.nextUrl.pathname.startsWith('/') || // Cho phép truy cập `/user`
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
    '/:path*',
    '/auth/login',
    '/checkout',
    '/account/profile',
  ],
};
