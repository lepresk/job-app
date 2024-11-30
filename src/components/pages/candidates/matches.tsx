import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ClockIcon, AlertCircleIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  title: string;
  matchScore: number;
  skills: string[];
  experience: string;
  education: string;
}

export function CandidateMatchesPage() {
  const [candidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'John Developer',
      title: 'Senior Software Engineer',
      matchScore: 95,
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: '5 years',
      education: 'B.Sc. Computer Science',
    },
    {
      id: '2',
      name: 'Jane Engineer',
      title: 'Frontend Developer',
      matchScore: 88,
      skills: ['React', 'TypeScript', 'CSS'],
      experience: '3 years',
      education: 'B.Sc. Software Engineering',
    },
    // Add more candidates...
  ]);

  const currentTime = new Date();
  const nextUpdateTime = new Date();
  nextUpdateTime.setHours(24, 0, 0, 0);
  const hoursRemaining = Math.floor((nextUpdateTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60));
  const minutesRemaining = Math.floor(((nextUpdateTime.getTime() - currentTime.getTime()) % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Today's Talent Matches</h1>
        <p className="mt-2 text-gray-600">
          Review your daily matches and connect with potential candidates
        </p>
      </div>

      {/* Timer Banner */}
      <div className="mb-8 rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900">
              Time remaining: {hoursRemaining}h {minutesRemaining}m
            </span>
          </div>
          <span className="text-sm text-gray-600">
            New matches will be available at midnight
          </span>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="space-y-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="rounded-lg border bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">{candidate.name}</h2>
                <p className="text-gray-600">{candidate.title}</p>
                
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">{candidate.experience} experience</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AlertCircleIcon className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">{candidate.education}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-sm text-gray-600">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="mb-4 rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
                  {candidate.matchScore}% Match
                </div>
                <div className="space-y-2">
                  <Button className="w-full">View Profile</Button>
                  <Button variant="outline" className="w-full">Contact</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}