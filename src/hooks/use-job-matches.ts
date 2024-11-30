import { useState, useEffect } from 'react';

interface JobMatch {
  id: string;
  title: string;
  company: string;
  matchScore: number;
  skills: string[];
  location: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
}

export function useJobMatches() {
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      matchScore: 95,
      skills: ['JavaScript', 'React', 'Node.js'],
      location: 'Brazzaville',
      salary: {
        min: 60000,
        max: 90000,
        currency: 'USD',
      },
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'Digital Solutions',
      matchScore: 88,
      skills: ['React', 'TypeScript', 'CSS'],
      location: 'Remote',
      salary: {
        min: 45000,
        max: 65000,
        currency: 'USD',
      },
    },
  ]);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use mock data
  }, []);

  return { jobMatches };
}