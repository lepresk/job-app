import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  SearchIcon, 
  FilterIcon, 
  BriefcaseIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  StarIcon
} from 'lucide-react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  jobId: string;
  feedback?: string;
  nextStep?: string;
  interviewDate?: string;
}

export function JobSeekerApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');

  // Mock data - In a real app, this would come from an API
  const [applications] = useState<Application[]>([
    {
      id: '1',
      jobId: 'job1',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'Brazzaville',
      appliedDate: '2024-03-15',
      status: 'reviewing',
      nextStep: 'Technical Interview',
      interviewDate: '2024-03-20',
    },
    {
      id: '2',
      jobId: 'job2',
      jobTitle: 'Frontend Developer',
      company: 'Digital Solutions',
      location: 'Remote',
      appliedDate: '2024-03-14',
      status: 'shortlisted',
      nextStep: 'Final Interview',
      interviewDate: '2024-03-21',
    },
    {
      id: '3',
      jobId: 'job3',
      jobTitle: 'Backend Developer',
      company: 'Tech Innovators',
      location: 'Pointe-Noire',
      appliedDate: '2024-03-10',
      status: 'rejected',
      feedback: 'Looking for someone with more experience in cloud technologies.',
    },
  ]);

  const filteredApplications = applications.filter(application => {
    const matchesSearch = 
      application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || application.status === statusFilter;
    const matchesDate = !dateFilter || application.appliedDate === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewing: applications.filter(a => a.status === 'reviewing').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    hired: applications.filter(a => a.status === 'hired').length,
  };

  const handleStatClick = (status: string) => {
    setStatusFilter(status);
    setShowFilters(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'reviewing':
        return 'bg-blue-100 text-blue-600';
      case 'shortlisted':
        return 'bg-green-100 text-green-600';
      case 'rejected':
        return 'bg-red-100 text-red-600';
      case 'hired':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Applications</h1>
        <p className="mt-2 text-gray-600">
          Track and manage your job applications
        </p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <button
          onClick={() => setStatusFilter('')}
          className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Applications</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-2">
              <BriefcaseIcon className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </button>

        <button
          onClick={() => handleStatClick('reviewing')}
          className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Review</p>
              <p className="text-2xl font-bold">{stats.reviewing}</p>
            </div>
            <div className="rounded-full bg-yellow-100 p-2">
              <ClockIcon className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </button>

        <button
          onClick={() => handleStatClick('shortlisted')}
          className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Shortlisted</p>
              <p className="text-2xl font-bold">{stats.shortlisted}</p>
            </div>
            <div className="rounded-full bg-green-100 p-2">
              <StarIcon className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </button>

        <button
          onClick={() => handleStatClick('rejected')}
          className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="text-2xl font-bold">{stats.rejected}</p>
            </div>
            <div className="rounded-full bg-red-100 p-2">
              <XCircleIcon className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </button>

        <button
          onClick={() => handleStatClick('hired')}
          className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Hired</p>
              <p className="text-2xl font-bold">{stats.hired}</p>
            </div>
            <div className="rounded-full bg-purple-100 p-2">
              <CheckCircleIcon className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Search by job title or company"
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
          <div className="grid gap-4 rounded-lg border bg-white p-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Status</Label>
              <select
                className="w-full rounded-md border border-gray-200 p-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Applied Date</Label>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className="rounded-lg border bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="text-lg font-semibold">{application.jobTitle}</h3>
                <p className="text-gray-600">{application.company}</p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <BriefcaseIcon className="mr-2 h-4 w-4" />
                    {application.location}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="mr-2 h-4 w-4" />
                    Applied {new Date(application.appliedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`rounded-full px-3 py-1 text-sm ${getStatusColor(application.status)}`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
                <Button variant="outline" asChild>
                  <a href={`/jobs/${application.jobId}`}>View Job</a>
                </Button>
              </div>
            </div>

            {(application.nextStep || application.feedback || application.interviewDate) && (
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                {application.nextStep && (
                  <div className="mb-2">
                    <span className="font-medium">Next Step:</span> {application.nextStep}
                    {application.interviewDate && (
                      <span className="ml-2 text-gray-600">
                        (Scheduled for {new Date(application.interviewDate).toLocaleDateString()})
                      </span>
                    )}
                  </div>
                )}
                {application.feedback && (
                  <div>
                    <span className="font-medium">Feedback:</span> {application.feedback}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {filteredApplications.length === 0 && (
          <div className="rounded-lg border bg-white p-8 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 p-3">
              <SearchIcon className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">No applications found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find your applications
            </p>
          </div>
        )}
      </div>
    </div>
  );
}