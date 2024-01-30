import { NextResponse } from 'next/server';

export function middleware() {
  const res = NextResponse.next();
  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append(
    'Access-Control-Allow-Origin',
    'localhost,google.com,facebook.com'
  );

  return res;
}

export const config = {
  matcher: '/api/:path*',
};
