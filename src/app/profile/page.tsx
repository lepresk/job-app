'use client';

import { useAuthStore } from '@/lib/store';
import { JobSeekerProfilePage } from '@/components/pages/profile/job-seeker';
import { RecruiterProfilePage } from '@/components/pages/profile/recruiter';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (user?.role === 'recruiter') {
    return <RecruiterProfilePage />;
  }

  return <JobSeekerProfilePage />;
}