import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store';
import { calculateProfileStrength } from '@/lib/utils/profile-completion';

interface DashboardStats {
  activeApplications: number;
  validatedSkills: number;
  profileViews: number;
  profileStrength: number;
  // Recruiter specific stats
  activeJobs?: number;
  totalCandidates?: number;
  interviewsScheduled?: number;
  averageTimeToHire?: string;
}

export function useDashboardStats() {
  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<DashboardStats>({
    activeApplications: 5,
    validatedSkills: 3,
    profileViews: 28,
    profileStrength: calculateProfileStrength(user),
    activeJobs: 5,
    totalCandidates: 128,
    interviewsScheduled: 12,
    averageTimeToHire: '21 days',
  });

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll just update the profile strength when the user changes
    setStats(prevStats => ({
      ...prevStats,
      profileStrength: calculateProfileStrength(user),
    }));
  }, [user]);

  return { stats };
}