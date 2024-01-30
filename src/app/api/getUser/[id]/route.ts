import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const loggedIn = request.cookies.get('token');
  if (loggedIn?.value === process.env.token) {
    const url = `https://reqres.in/api/users/${id}`;
    const response = await fetch(url);
    const result = await response.json();

    return NextResponse.json(result, { status: 200 });
  } else return NextResponse.redirect(new URL('/login', request.url));
}
