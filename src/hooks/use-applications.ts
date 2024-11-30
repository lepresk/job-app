import { useState, useEffect } from 'react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  appliedDate: string;
}

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Corp',
      status: 'reviewing',
      appliedDate: '2 days ago',
    },
    {
      id: '2',
      jobTitle: 'Frontend Developer',
      company: 'Digital Solutions',
      status: 'shortlisted',
      appliedDate: '3 days ago',
    },
    {
      id: '3',
      jobTitle: 'Backend Developer',
      company: 'Tech Innovators',
      status: 'pending',
      appliedDate: '1 week ago',
    },
  ]);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use mock data
  }, []);

  return { applications };
}