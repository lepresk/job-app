import { redirect } from 'next/navigation';
import { auth } from '@/lib/firebase/auth';

export async function protectedPage() {
  try {
    const user = await auth.currentUser;
    if (!user) {
      redirect('/auth/login');
    }
    return user;
  } catch (error) {
    redirect('/auth/login');
  }
}

export async function recruiterOnly() {
  const user = await protectedPage();
  if (user?.role !== 'recruiter') {
    redirect('/dashboard');
  }
  return user;
}

export async function jobSeekerOnly() {
  const user = await protectedPage();
  if (user?.role !== 'jobseeker') {
    redirect('/dashboard');
  }
  return user;
}