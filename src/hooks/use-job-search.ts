import { useState, useEffect } from 'react';
import { searchJobs, type JobSearchFilters, type JobPosting } from '@/lib/firebase/jobs';

export function useJobSearch(initialFilters: JobSearchFilters = {}) {
  const [filters, setFilters] = useState<JobSearchFilters>(initialFilters);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await searchJobs(filters);
        setJobs(result.jobs);
        setLastDoc(result.lastDoc);
        setHasMore(result.hasMore);
      } catch (err) {
        setError('Failed to load jobs');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  const loadMore = async () => {
    if (!hasMore || isLoading) return;

    try {
      setIsLoading(true);
      const result = await searchJobs(filters, 10, lastDoc);
      setJobs(prevJobs => [...prevJobs, ...result.jobs]);
      setLastDoc(result.lastDoc);
      setHasMore(result.hasMore);
    } catch (err) {
      setError('Failed to load more jobs');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<JobSearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setJobs([]);
    setLastDoc(null);
    setHasMore(true);
  };

  return {
    jobs,
    isLoading,
    error,
    hasMore,
    loadMore,
    filters,
    updateFilters,
  };
}