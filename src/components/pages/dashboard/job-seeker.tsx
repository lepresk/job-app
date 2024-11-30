import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { StatsCard } from '@/components/dashboard/stats-card';
import { JobMatchCard } from '@/components/dashboard/job-match-card';
import { ApplicationStatusCard } from '@/components/dashboard/application-status-card';
import { MatchesAlert } from '@/components/dashboard/matches-alert';
import { Button } from '@/components/ui/button';
import { 
  BriefcaseIcon, 
  CheckCircleIcon, 
  StarIcon, 
  TrendingUpIcon,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getJobSeekerDashboardData } from '@/lib/firebase/dashboard';
import type { DashboardStats, RecentApplication } from '@/lib/firebase/dashboard';
import type { JobPosting } from '@/lib/types';

export function JobSeekerDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [applications, setApplications] = useState<RecentApplication[]>([]);
  const [jobMatches, setJobMatches] = useState<JobPosting[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const data = await getJobSeekerDashboardData(user.id);
        setStats(data.stats);
        setApplications(data.applications);
        setJobMatches(data.jobMatches);
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
        <p className="text-gray-600">Here's your personalized job search overview</p>
      </div>

      {/* Daily Matches Alert */}
      <div className="mb-8">
        <MatchesAlert
          matchCount={jobMatches.length}
          matchAccuracy={85}
          timeToApply="24h"
        />
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div 
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/applications')}
        >
          <StatsCard
            title="Active Applications"
            value={stats?.activeApplications || 0}
            change="+2 this week"
            icon={BriefcaseIcon}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
        </div>
        <div 
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/skills')}
        >
          <StatsCard
            title="Skills Validated"
            value={`${stats?.validatedSkills || 0}/5`}
            icon={CheckCircleIcon}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
        </div>
        <div 
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/profile')}
        >
          <StatsCard
            title="Profile Views"
            value={stats?.profileViews || 0}
            change="+8 this week"
            icon={StarIcon}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>
        <div 
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/profile')}
        >
          <StatsCard
            title="Profile Strength"
            value={stats?.profileStrength || 0}
            icon={TrendingUpIcon}
            iconColor="text-yellow-600"
            iconBgColor="bg-yellow-100"
            isProfileStrength={true}
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Today's Matches */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Today's Top Matches</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/matches">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {jobMatches.map((match) => (
              <JobMatchCard
                key={match.id}
                title={match.title}
                company={match.company}
                matchScore={85} // This would come from the match data in production
                skills={match.skills}
                location={match.location}
                salary={match.salary}
                onApply={() => navigate(`/jobs/${match.id}`)}
                onSave={() => {}}
              />
            ))}
            {jobMatches.length === 0 && (
              <div className="rounded-lg border bg-gray-50 p-6 text-center text-gray-500">
                No job matches found today
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
            {applications.map((application) => (
              <ApplicationStatusCard
                key={application.id}
                jobId={application.id}
                jobTitle={application.jobTitle}
                company="Company Name" // This would come from the job data in production
                status={application.status}
                appliedDate={new Date(application.appliedDate).toLocaleDateString()}
              />
            ))}
            {applications.length === 0 && (
              <div className="rounded-lg border bg-gray-50 p-6 text-center text-gray-500">
                No applications found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}