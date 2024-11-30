import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { JobList } from '@/components/jobs/job-list';
import { useJobSearch } from '@/hooks/use-job-search';
import { SearchIcon, FilterIcon, Loader2Icon } from 'lucide-react';

const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];
const locations = ['Brazzaville', 'Pointe-Noire', 'Remote'];
const experienceLevels = ['entry', 'mid', 'senior', 'lead'];
const workplaceTypes = ['on-site', 'hybrid', 'remote'];

export function FindJobsPage() {
  const [showFilters, setShowFilters] = useState(true);
  const {
    jobs,
    isLoading,
    error,
    hasMore,
    loadMore,
    filters,
    updateFilters,
  } = useJobSearch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ keyword: e.target.value });
  };

  return (
    <div className="container py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Find Jobs</h1>
        <p className="mt-2 text-gray-600">
          Search through thousands of job opportunities
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-lg border bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center text-lg font-semibold">
                <FilterIcon className="mr-2 h-5 w-5" />
                Filters
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide' : 'Show'}
              </Button>
            </div>

            {showFilters && (
              <div className="space-y-6">
                {/* Job Type Filter */}
                <div>
                  <Label className="mb-2 block">Job Type</Label>
                  <select
                    className="w-full rounded-md border border-gray-200 p-2"
                    value={filters.type || ''}
                    onChange={(e) => updateFilters({ type: e.target.value || undefined })}
                  >
                    <option value="">All Types</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <Label className="mb-2 block">Location</Label>
                  <select
                    className="w-full rounded-md border border-gray-200 p-2"
                    value={filters.location || ''}
                    onChange={(e) => updateFilters({ location: e.target.value || undefined })}
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Level Filter */}
                <div>
                  <Label className="mb-2 block">Experience Level</Label>
                  <select
                    className="w-full rounded-md border border-gray-200 p-2"
                    value={filters.experienceLevel || ''}
                    onChange={(e) => updateFilters({ experienceLevel: e.target.value || undefined })}
                  >
                    <option value="">All Levels</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Workplace Type Filter */}
                <div>
                  <Label className="mb-2 block">Workplace Type</Label>
                  <select
                    className="w-full rounded-md border border-gray-200 p-2"
                    value={filters.workplaceType || ''}
                    onChange={(e) => updateFilters({ workplaceType: e.target.value || undefined })}
                  >
                    <option value="">All Types</option>
                    {workplaceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salary Range */}
                <div className="space-y-2">
                  <Label>Salary Range</Label>
                  <div className="grid gap-2">
                    <Input
                      type="number"
                      placeholder="Min Salary"
                      onChange={(e) => updateFilters({ salaryMin: Number(e.target.value) || undefined })}
                    />
                    <Input
                      type="number"
                      placeholder="Max Salary"
                      onChange={(e) => updateFilters({ salaryMax: Number(e.target.value) || undefined })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search jobs by title, company, or keywords"
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-gray-600">
              {jobs.length} jobs found
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading && jobs.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <Loader2Icon className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}

          {/* Job Listings */}
          <div className="space-y-4">
            <JobList jobs={jobs} />
            
            {hasMore && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={loadMore}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More Jobs'
                  )}
                </Button>
              </div>
            )}

            {!isLoading && jobs.length === 0 && (
              <div className="rounded-lg border bg-gray-50 p-8 text-center">
                <SearchIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-1 text-lg font-semibold">No jobs found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters to find more jobs
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}