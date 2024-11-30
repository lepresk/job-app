import { Button } from '@/components/ui/button';

interface ApplicationCardProps {
  candidateName: string;
  jobTitle: string;
  appliedDate: string;
  onReview: () => void;
}

export function ApplicationCard({
  candidateName,
  jobTitle,
  appliedDate,
  onReview,
}: ApplicationCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{candidateName}</h3>
          <p className="text-gray-600">Applied for {jobTitle}</p>
          <p className="mt-1 text-sm text-gray-500">Applied {appliedDate}</p>
        </div>
        <Button onClick={onReview}>Review</Button>
      </div>
    </div>
  );
}