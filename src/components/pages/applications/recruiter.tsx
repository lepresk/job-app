import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ApplicationCard } from '@/components/applications/application-card';
import { 
  SearchIcon, 
  FilterIcon, 
  BriefcaseIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react';

interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  candidate: {
    id: string;
    name: string;
    email: string;
    phone: string;
    experience: string;
    matchScore: number;
    appliedDate: Date;
  };
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  notes?: string;
}

export function RecruiterApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');

  // Mock data - In a real app, this would come from an API
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: '1',
      jobId: 'job1',
      jobTitle: 'Senior Software Engineer',
      candidate: {
        id: 'cand1',
        name: 'John Developer',
        email: 'john@example.com',
        phone: '+242 XX XXX XXXX',
        experience: '5 years',
        matchScore: 95,
        appliedDate: new Date('2024-03-15'),
      },
      status: 'reviewing',
    },
    {
      id: '2',
      jobId: 'job1',
      jobTitle: 'Senior Software Engineer',
      candidate: {
        id: 'cand2',
        name: 'Sarah Frontend',
        email: 'sarah@example.com',
        phone: '+242 XX XXX XXXX',
        experience: '4 years',
        matchScore: 88,
        appliedDate: new Date('2024-03-14'),
      },
      status: 'shortlisted',
    },
    {
      id: '3',
      jobId: 'job2',
      jobTitle: 'Backend Developer',
      candidate: {
        id: 'cand3',
        name: 'Mike Backend',
        email: 'mike@example.com',
        phone: '+242 XX XXX XXXX',
        experience: '3 years',
        matchScore: 92,
        appliedDate: new Date('2024-03-13'),
      },
      status: 'pending',
    },
  ]);

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus as JobApplication['status'] } : app
    ));
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = 
      application.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || application.status === statusFilter;
    const matchesDate = !dateFilter || 
      application.candidate.appliedDate.toISOString().split('T')[0] === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewing: applications.filter(a => a.status === 'reviewing').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    hired: applications.filter(a => a.status === 'hired').length,
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <p className="mt-2 text-gray-600">
          Manage and track all applications for your job postings
        </p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Applications</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-2">
              <BriefcaseIcon className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Review</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <div className="rounded-full bg-yellow-100 p-2">
              <ClockIcon className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Review</p>
              <p className="text-2xl font-bold">{stats.reviewing}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-2">
              <StarIcon className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Shortlisted</p>
              <p className="text-2xl font-bold">{stats.shortlisted}</p>
            </div>
            <div className="rounded-full bg-green-100 p-2">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Hired</p>
              <p className="text-2xl font-bold">{stats.hired}</p>
            </div>
            <div className="rounded-full bg-purple-100 p-2">
              <UserIcon className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Search by candidate name or job title"
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
          <div className="grid gap-4 rounded-lg border bg-white p-4 md:grid-cols-3">
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
          <ApplicationCard
            key={application.id}
            application={application}
            onStatusChange={handleStatusChange}
          />
        ))}

        {filteredApplications.length === 0 && (
          <div className="rounded-lg border bg-white p-8 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 p-3">
              <SearchIcon className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">No applications found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find more applications
            </p>
          </div>
        )}
      </div>
    </div>
  );
}