import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPinIcon, BriefcaseIcon, ClockIcon } from 'lucide-react';

const recentJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'Brazzaville',
    type: 'Full-time',
    salary: '$60,000 - $80,000',
    tags: ['Remote Friendly', 'Healthcare', '401k'],
  },
  {
    id: 2,
    title: 'Marketing Manager',
    company: 'Global Solutions',
    location: 'Pointe-Noire',
    type: 'Full-time',
    salary: '$50,000 - $65,000',
    tags: ['Marketing', 'Leadership', 'Benefits'],
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'Creative Agency',
    location: 'Remote',
    type: 'Contract',
    salary: '$45,000 - $60,000',
    tags: ['Design', 'UI/UX', 'Flexible Hours'],
  },
];

export function RecentJobsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Recent Job Opportunities</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Discover the latest job openings from top companies in Congo-Brazzaville
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentJobs.map((job) => (
            <div
              key={job.id}
              className="group rounded-lg border bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4">
                <h3 className="mb-2 text-xl font-semibold group-hover:text-blue-600">
                  {job.title}
                </h3>
                <p className="text-gray-600">{job.company}</p>
              </div>

              <div className="mb-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="mr-2 h-4 w-4" />
                  {job.type}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="mr-2 h-4 w-4" />
                  {job.salary}
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link to={`/jobs/${job.id}`}>View Details</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link to="/jobs/find">View All Jobs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}