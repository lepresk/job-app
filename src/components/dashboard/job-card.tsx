import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface JobCardProps {
  title: string;
  postedDate: string;
  applicationsCount: number;
  matchesCount: number;
  jobId: string;
  onViewDetails?: () => void;
}

export function JobCard({
  title,
  postedDate,
  applicationsCount,
  matchesCount,
  jobId,
  onViewDetails,
}: JobCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <Link to={`/jobs/${jobId}`} className="group">
            <h3 className="font-semibold group-hover:text-blue-600">{title}</h3>
          </Link>
          <p className="text-sm text-gray-600">Posted {postedDate}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
              {applicationsCount} Applications
            </span>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">
              {matchesCount} Matches
            </span>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/jobs/${jobId}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}