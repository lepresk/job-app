'use client';

import { useAuthStore } from '@/lib/store';
import { JobSeekerDashboard } from '@/components/pages/dashboard/job-seeker';
import { RecruiterDashboard } from '@/components/pages/dashboard/recruiter';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  if (user?.role === 'recruiter') {
    return <RecruiterDashboard />;
  }

  return <JobSeekerDashboard />;
}