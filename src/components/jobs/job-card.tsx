import { Button } from '@/components/ui/button';
import { JobPosting } from '@/lib/types';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: JobPosting;
  showApplyButton?: boolean;
}

export function JobCard({ job, showApplyButton = true }: JobCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <Link to={`/jobs/${job.id}`} className="group">
            <h3 className="text-lg font-semibold group-hover:text-blue-600">
              {job.title}
            </h3>
          </Link>
          <p className="text-gray-600">{job.company}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
              {job.type}
            </span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
              {job.location}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Required Skills:</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        {showApplyButton && (
          <Button asChild>
            <Link to={`/jobs/${job.id}`}>View Details</Link>
          </Button>
        )}
      </div>
    </div>
  );
}