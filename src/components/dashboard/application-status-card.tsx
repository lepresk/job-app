import { Link } from 'react-router-dom';

interface ApplicationStatusCardProps {
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  appliedDate: string;
  onViewDetails?: () => void;
}

export function ApplicationStatusCard({
  jobId,
  jobTitle,
  company,
  status,
  appliedDate,
  onViewDetails,
}: ApplicationStatusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'reviewing':
        return 'bg-blue-100 text-blue-600';
      case 'shortlisted':
        return 'bg-green-100 text-green-600';
      case 'rejected':
        return 'bg-red-100 text-red-600';
      case 'hired':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <Link to={`/jobs/${jobId}`} className="group">
            <h3 className="font-semibold group-hover:text-blue-600">{jobTitle}</h3>
          </Link>
          <p className="text-gray-600">{company}</p>
          <p className="mt-1 text-sm text-gray-500">Applied {appliedDate}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm ${getStatusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
}