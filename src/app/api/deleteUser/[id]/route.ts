import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const loggedIn = request.cookies.get('token');
  if (loggedIn?.value === process.env.token) {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE',
    });

    return response;
  } else redirect('/login');
}
