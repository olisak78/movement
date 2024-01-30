import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { page: number } }
) {
  const loggedIn = request.cookies.get('token');
  const page = params.page;
  const url = `https://reqres.in/api/users?page=${page}`;
  if (loggedIn?.value === process.env.token) {
    const response = await fetch(url, {
      method: 'GET',
    });
    const result = await response.json();

    return NextResponse.json(result, { status: 200 });
  } else {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
