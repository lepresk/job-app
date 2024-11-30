import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { 
  SearchIcon, 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  EyeOffIcon,
  Loader2Icon,
  FilterIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react';
import { getRecruiterJobs, updateJobStatus, deleteJob } from '@/lib/firebase/jobs';
import type { JobPosting } from '@/lib/firebase/jobs';

export function ManageJobsPage() {
  const user = useAuthStore((state) => state.user);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const data = await getRecruiterJobs(user.id);
        setJobs(data);
      } catch (err) {
        setError('Failed to load jobs');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [user?.id]);

  const handleStatusChange = async (jobId: string, newStatus: 'active' | 'closed') => {
    try {
      await updateJobStatus(jobId, newStatus);
      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      ));
    } catch (err) {
      console.error('Error updating job status:', err);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) {
      return;
    }

    try {
      await deleteJob(jobId);
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center py-8">
        <Loader2Icon className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Jobs</h1>
          <p className="mt-2 text-gray-600">
            View and manage all your job postings
          </p>
        </div>
        <Button asChild>
          <Link to="/jobs/post">
            <PlusIcon className="mr-2 h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Search jobs by title or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="ml-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterIcon className="mr-2 h-4 w-4" />
            Filters
            {showFilters ? (
              <ChevronUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="rounded-lg border bg-white p-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <select
                className="w-full rounded-md border border-gray-200 p-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.location}</p>
                
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium
                    ${job.status === 'active' 
                      ? 'bg-green-100 text-green-700'
                      : job.status === 'closed'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                  <span className="text-gray-500">
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-gray-500">
                    {job.type} • {job.workplaceType}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/jobs/${job.id}/edit`}>
                    <EditIcon className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                {job.status === 'active' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(job.id!, 'closed')}
                  >
                    <EyeOffIcon className="mr-2 h-4 w-4" />
                    Close
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(job.id!, 'active')}
                  >
                    <EyeOffIcon className="mr-2 h-4 w-4" />
                    Activate
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => handleDelete(job.id!)}
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="rounded-lg border bg-gray-50 p-8 text-center">
            <SearchIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-1 text-lg font-semibold">No jobs found</h3>
            <p className="text-gray-600">
              {jobs.length === 0
                ? "You haven't posted any jobs yet"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}