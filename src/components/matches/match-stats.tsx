import { BriefcaseIcon, CheckCircleIcon, BookmarkIcon, TargetIcon } from 'lucide-react';

interface MatchStatsProps {
  totalMatches: number;
  appliedCount: number;
  savedCount: number;
  matchAccuracy: number;
}

export function MatchStats({ totalMatches, appliedCount, savedCount, matchAccuracy }: MatchStatsProps) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Match Statistics</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-blue-100 p-2">
              <BriefcaseIcon className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-gray-600">Total Matches</span>
          </div>
          <span className="font-semibold">{totalMatches}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-green-100 p-2">
              <CheckCircleIcon className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-gray-600">Applied</span>
          </div>
          <span className="font-semibold">{appliedCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-yellow-100 p-2">
              <BookmarkIcon className="h-4 w-4 text-yellow-600" />
            </div>
            <span className="text-gray-600">Saved</span>
          </div>
          <span className="font-semibold">{savedCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-purple-100 p-2">
              <TargetIcon className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-gray-600">Match Accuracy</span>
          </div>
          <span className="font-semibold">{matchAccuracy}%</span>
        </div>
      </div>
    </div>
  );
}