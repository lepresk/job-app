import { useState } from 'react';
import { JobList } from '@/components/jobs/job-list';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchIcon } from 'lucide-react';
import type { JobPosting } from '@/lib/types';

// Mock data - In a real app, this would come from an API
const mockJobs: JobPosting[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'Brazzaville',
    type: 'full-time',
    description: 'We are looking for a senior software engineer...',
    requirements: ['5+ years experience', 'Bachelor\'s degree'],
    skills: ['JavaScript', 'React', 'Node.js'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more mock jobs here
];

export function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Find Your Next Opportunity</h1>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="search">Search Jobs</Label>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              className="pl-9"
              placeholder="Search by title or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Filter by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
      </div>

      <JobList jobs={filteredJobs} />
    </div>
  );
}