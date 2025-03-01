import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function POST() {
  try {
    const prefix = process.env.NODE_ENV === 'development' ? '__Dev-' : '';
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(`${prefix}xxx.refresh-token`)?.value;

    if (!refreshToken) {
      return NextResponse.json({ success: false, message: 'No refresh token' }, { status: 401 });
    }

    const secretRefresh = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET!);
    const { payload } = await jwtVerify(refreshToken, secretRefresh);

    const user = await db.user.findUnique({
      where: { id: payload.sub as string },
      include: { role: { select: { name: true } } },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
    }

    const secretAccess = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);
    const accessToken = await new SignJWT({ sub: user.id, email: user.email, role: user.role.name })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(secretAccess);

    return NextResponse.json({ success: true, data: { accessToken } });
  } catch (error) {
    console.error('Refresh token error: ', error);
    return NextResponse.json({ success: false, message: 'Invalid refresh token' }, { status: 401 });
  }
}
