import { useState, useEffect } from 'react';

interface RecentJob {
  id: string;
  title: string;
  postedDate: string;
  applicationsCount: number;
  matchesCount: number;
}

export function useRecentJobs() {
  const [recentJobs, setRecentJobs] = useState<RecentJob[]>([
    {
      id: '1',
      title: 'Senior Software Engineer',
      postedDate: '3 days ago',
      applicationsCount: 12,
      matchesCount: 4,
    },
    {
      id: '2',
      title: 'Frontend Developer',
      postedDate: '5 days ago',
      applicationsCount: 8,
      matchesCount: 3,
    },
    {
      id: '3',
      title: 'Backend Developer',
      postedDate: '1 week ago',
      applicationsCount: 15,
      matchesCount: 5,
    },
  ]);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use mock data
  }, []);

  return { recentJobs };
}