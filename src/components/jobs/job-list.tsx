import { JobCard } from './job-card';
import type { JobPosting } from '@/lib/types';

interface JobListProps {
  jobs: JobPosting[];
  showApplyButton?: boolean;
}

export function JobList({ jobs, showApplyButton }: JobListProps) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} showApplyButton={showApplyButton} />
      ))}
    </div>
  );
}