import { useState, useEffect } from 'react';

interface RecentApplication {
  id: string;
  candidateName: string;
  jobTitle: string;
  appliedDate: string;
}

export function useRecentApplications() {
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([
    {
      id: '1',
      candidateName: 'John Developer',
      jobTitle: 'Senior Software Engineer',
      appliedDate: '2 days ago',
    },
    {
      id: '2',
      candidateName: 'Sarah Frontend',
      jobTitle: 'Frontend Developer',
      appliedDate: '3 days ago',
    },
    {
      id: '3',
      candidateName: 'Mike Backend',
      jobTitle: 'Backend Developer',
      appliedDate: '4 days ago',
    },
  ]);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use mock data
  }, []);

  return { recentApplications };
}