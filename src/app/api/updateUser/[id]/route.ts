import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const loggedIn = request.cookies.get('token');
  if (loggedIn?.value === process.env.token) {
    const res = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body),
    });

    const result = await res.json();

    return NextResponse.json(result);
  } else return NextResponse.redirect(new URL('/login', request.url));
}
