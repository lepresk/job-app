import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { JobList } from '@/components/jobs/job-list';
import { MatchStats } from '@/components/matches/match-stats';
import { SkillMatch } from '@/components/matches/skill-match';
import { ClockIcon, AlertCircleIcon } from 'lucide-react';
import type { JobPosting } from '@/lib/types';

// Mock data - In a real app, this would come from an API
const mockMatches: JobPosting[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'Brazzaville',
    type: 'full-time',
    description: 'Looking for a senior software engineer with expertise in React and Node.js...',
    requirements: ['5+ years experience', 'Strong JavaScript skills'],
    skills: ['JavaScript', 'React', 'Node.js'],
    createdAt: new Date(),
    updatedAt: new Date(),
    salary: {
      min: 60000,
      max: 90000,
      currency: 'USD',
    },
  },
  // Add more mock matches...
];

export function DailyMatchesPage() {
  const [matches] = useState<JobPosting[]>(mockMatches);
  const currentTime = new Date();
  const nextUpdateTime = new Date();
  nextUpdateTime.setHours(24, 0, 0, 0);
  const hoursRemaining = Math.floor((nextUpdateTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60));
  const minutesRemaining = Math.floor(((nextUpdateTime.getTime() - currentTime.getTime()) % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="container py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Today's Job Matches</h1>
        <p className="mt-2 text-gray-600">
          Based on your validated skills and preferences
        </p>
      </div>

      {/* Timer and Info Section */}
      <div className="mb-8 rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircleIcon className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900">
              New matches in {hoursRemaining}h {minutesRemaining}m
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <ClockIcon className="h-5 w-5" />
            <span>Matches refresh daily at midnight</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content - Job Matches */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <JobList jobs={matches} />
          </div>
        </div>

        {/* Sidebar - Stats and Skills */}
        <div className="space-y-6">
          <MatchStats
            totalMatches={matches.length}
            appliedCount={3}
            savedCount={2}
            matchAccuracy={85}
          />
          <SkillMatch
            skills={[
              { name: 'JavaScript', matchScore: 95 },
              { name: 'React', matchScore: 90 },
              { name: 'Node.js', matchScore: 85 },
              { name: 'TypeScript', matchScore: 80 },
              { name: 'SQL', matchScore: 75 },
            ]}
          />
        </div>
      </div>
    </div>
  );
}