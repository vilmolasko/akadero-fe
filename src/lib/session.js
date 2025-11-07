'use server';

import { cookies } from 'next/headers';
import { cache } from 'react';
import jwt from 'jsonwebtoken';
// import { SessionPayload } from "@/app/lib/definitions";

const secretKey = process.env.JWT_SECRET;
// Boolean(process.env.SECURE_TOKEN)
export async function createSession(token) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookiesStore = await cookies();

  cookiesStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'none',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export const getSession = async () => {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) {
    return { isAuth: false, userId: null, email: null };
  }
  const decoded = jwt.verify(cookie, secretKey);
  // if (decoded?.id) {
  //   return { isAuth: false, userId: null, email: null };
  // }
  return { isAuth: true, userId: decoded?._id, email: decoded.email };
};

export const getToken = cache(async () => {
  const session = (await cookies()).get('session');
  return session?.value;
});
