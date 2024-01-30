import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const loggedIn = request.cookies.get('token');
  if (loggedIn?.value === process.env.token) {
    const res = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body),
    });

    const result = await res.json();

    return NextResponse.json(result);
  } else {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
