import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase/auth';

export async function GET() {
  try {
    const user = await auth.currentUser;
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}