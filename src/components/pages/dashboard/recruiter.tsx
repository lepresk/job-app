import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { StatsCard } from '@/components/dashboard/stats-card';
import { JobCard } from '@/components/dashboard/job-card';
import { ApplicationCard } from '@/components/dashboard/application-card';
import { MatchesAlert } from '@/components/dashboard/matches-alert';
import { Button } from '@/components/ui/button';
import { 
  BriefcaseIcon, 
  UsersIcon, 
  CheckCircleIcon,
  ClockIcon,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getRecruiterDashboardData } from '@/lib/firebase/dashboard';
import type { DashboardStats, RecentApplication } from '@/lib/firebase/dashboard';
import type { JobPosting } from '@/lib/types';

export function RecruiterDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentJobs, setRecentJobs] = useState<JobPosting[]>([]);
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const data = await getRecruiterDashboardData(user.id);
        setStats(data.stats);
        setRecentJobs(data.recentJobs);
        setRecentApplications(data.recentApplications);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  if (isLoading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's your recruitment overview</p>
      </div>

      {/* Daily Matches Alert */}
      <div className="mb-8">
        <MatchesAlert
          matchCount={7}
          matchAccuracy={92}
          timeToReview="24h"
        />
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div 
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/jobs')}
        >
          <StatsCard
            title="Active Jobs"
            value={stats?.activeJobs || 0}
            change="+2 this week"
            icon={BriefcaseIcon}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
        </div>
        <div 
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/candidates/find')}
        >
          <StatsCard
            title="Total Candidates"
            value={stats?.totalCandidates || 0}
            change="+15 new"
            icon={UsersIcon}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
        </div>
        <div 
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/interviews')}
        >
          <StatsCard
            title="Interviews Scheduled"
            value={stats?.interviewsScheduled || 0}
            change="+4 today"
            icon={CheckCircleIcon}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>
        <div 
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/analytics')}
        >
          <StatsCard
            title="Avg. Time to Hire"
            value={stats?.averageTimeToHire || '0 days'}
            change="-2 days"
            icon={ClockIcon}
            iconColor="text-yellow-600"
            iconBgColor="bg-yellow-100"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Job Postings */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Job Postings</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/jobs">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <JobCard
                key={job.id}
                jobId={job.id}
                title={job.title}
                postedDate={new Date(job.createdAt).toLocaleDateString()}
                applicationsCount={0}
                matchesCount={0}
              />
            ))}
            {recentJobs.length === 0 && (
              <div className="rounded-lg border bg-gray-50 p-6 text-center text-gray-500">
                No active jobs found
              </div>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/applications">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                candidateName={application.candidateName}
                jobTitle={application.jobTitle}
                appliedDate={new Date(application.appliedDate).toLocaleDateString()}
                onReview={() => navigate(`/applications/${application.id}`)}
              />
            ))}
            {recentApplications.length === 0 && (
              <div className="rounded-lg border bg-gray-50 p-6 text-center text-gray-500">
                No recent applications
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}