import { useAuthStore } from '@/lib/store';
import { JobSeekerApplicationsPage } from './job-seeker';
import { RecruiterApplicationsPage } from './recruiter';

export default function ApplicationsPage() {
  const user = useAuthStore((state) => state.user);

  if (user?.role === 'recruiter') {
    return <RecruiterApplicationsPage />;
  }

  return <JobSeekerApplicationsPage />;
}