import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append(
    'Access-Control-Allow-Origin',
    'localhost,google.com,facebook.com'
  );
  request.headers.append(
    'Access-Control-Allow-Origin',
    'localhost,google.com,facebook.com'
  );

  return res;
}
