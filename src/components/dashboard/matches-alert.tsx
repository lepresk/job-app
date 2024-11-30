import { AlertCircleIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MatchesAlertProps {
  matchCount: number;
  matchAccuracy: number;
  timeToReview: string;
}

export function MatchesAlert({ matchCount, matchAccuracy, timeToReview }: MatchesAlertProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start space-x-4">
          <div className="rounded-full bg-blue-100 p-3">
            <AlertCircleIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-900">New Talent Matches Available!</h2>
            <p className="mt-1 text-gray-700">
              You have {matchCount} new candidate matches for your job postings.
            </p>
          </div>
        </div>
        <Button className="shrink-0" asChild>
          <Link to="/candidates/matches">
            View Matches
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="flex border-t bg-white/50">
        <div className="flex-1 border-r p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{matchCount}</div>
          <div className="text-sm text-gray-600">New Matches</div>
        </div>
        <div className="flex-1 border-r p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{matchAccuracy}%</div>
          <div className="text-sm text-gray-600">Match Accuracy</div>
        </div>
        <div className="flex-1 p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{timeToReview}</div>
          <div className="text-sm text-gray-600">Time to Review</div>
        </div>
      </div>
    </div>
  );
}