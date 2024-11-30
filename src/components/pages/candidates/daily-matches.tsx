import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ClockIcon, 
  AlertCircleIcon, 
  SearchIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  StarIcon,
  MapPinIcon,
  BuildingIcon,
  BookmarkIcon,
  MailIcon,
  PhoneIcon,
  ExternalLinkIcon,
  FilterIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react';

interface JobMatch {
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  candidates: Candidate[];
}

interface Candidate {
  id: string;
  name: string;
  title: string;
  matchScore: number;
  skills: string[];
  experience: string;
  education: string;
  location: string;
  availableFrom: string;
}

export function DailyTalentMatchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [educationFilter, setEducationFilter] = useState('');
  
  // Mock data - In a real app, this would come from an API
  const [jobMatches] = useState<JobMatch[]>([
    {
      jobId: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'Tech Corp',
      location: 'Brazzaville',
      candidates: [
        {
          id: '1',
          name: 'John Developer',
          title: 'Senior Software Engineer',
          matchScore: 95,
          skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
          experience: '5 years',
          education: 'B.Sc. Computer Science',
          location: 'Brazzaville',
          availableFrom: 'Immediately',
        },
        {
          id: '2',
          name: 'Sarah Frontend',
          title: 'Frontend Developer',
          matchScore: 92,
          skills: ['React', 'TypeScript', 'Vue.js', 'CSS'],
          experience: '4 years',
          education: 'B.Sc. Software Engineering',
          location: 'Remote',
          availableFrom: '2 weeks notice',
        },
      ],
    },
    {
      jobId: '2',
      jobTitle: 'Backend Developer',
      company: 'Tech Corp',
      location: 'Remote',
      candidates: [
        {
          id: '3',
          name: 'Mike Backend',
          title: 'Backend Developer',
          matchScore: 94,
          skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
          experience: '4 years',
          education: 'M.Sc. Computer Science',
          location: 'Pointe-Noire',
          availableFrom: '2 weeks notice',
        },
        {
          id: '4',
          name: 'Alice Engineer',
          title: 'Software Engineer',
          matchScore: 88,
          skills: ['Python', 'FastAPI', 'MongoDB', 'Docker'],
          experience: '3 years',
          education: 'B.Sc. Computer Engineering',
          location: 'Remote',
          availableFrom: '1 month notice',
        },
      ],
    },
  ]);

  const currentTime = new Date();
  const nextUpdateTime = new Date();
  nextUpdateTime.setHours(24, 0, 0, 0);
  const hoursRemaining = Math.floor((nextUpdateTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60));
  const minutesRemaining = Math.floor(((nextUpdateTime.getTime() - currentTime.getTime()) % (1000 * 60 * 60)) / (1000 * 60));

  const totalCandidates = jobMatches.reduce((sum, job) => sum + job.candidates.length, 0);
  const averageMatchScore = Math.round(
    jobMatches.reduce((sum, job) => 
      sum + job.candidates.reduce((avg, candidate) => avg + candidate.matchScore, 0) / job.candidates.length
    , 0) / jobMatches.length
  );

  const filteredJobMatches = jobMatches.map(job => ({
    ...job,
    candidates: job.candidates.filter(candidate => {
      const matchesSearch = 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSkill = !selectedSkill || candidate.skills.includes(selectedSkill);
      const matchesLocation = !locationFilter || candidate.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesExperience = !experienceFilter || candidate.experience.toLowerCase().includes(experienceFilter.toLowerCase());
      const matchesEducation = !educationFilter || candidate.education.toLowerCase().includes(educationFilter.toLowerCase());
      
      return matchesSearch && matchesSkill && matchesLocation && matchesExperience && matchesEducation;
    })
  })).filter(job => job.candidates.length > 0);

  const toggleJobExpansion = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Today's Talent Matches</h1>
        <p className="mt-2 text-gray-600">
          Review your daily matches of qualified candidates for each job posting
        </p>
      </div>

      {/* Timer Banner */}
      <div className="mb-8 overflow-hidden rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-blue-100 p-3">
              <AlertCircleIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-900">New Matches Available!</h2>
              <p className="mt-1 text-gray-700">
                You have {totalCandidates} new candidate matches across {jobMatches.length} jobs. 
                Next update in {hoursRemaining}h {minutesRemaining}m.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-blue-600">Updates daily at midnight</span>
          </div>
        </div>
        <div className="grid grid-cols-3 border-t bg-white/50">
          <div className="border-r p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{jobMatches.length}</div>
            <div className="text-sm text-gray-600">Active Jobs</div>
          </div>
          <div className="border-r p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{totalCandidates}</div>
            <div className="text-sm text-gray-600">Total Matches</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{averageMatchScore}%</div>
            <div className="text-sm text-gray-600">Avg. Match Score</div>
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
              placeholder="Search candidates by name, title, or skills"
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
          <div className="grid gap-4 rounded-lg border bg-white p-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Skills</Label>
              <select
                className="w-full rounded-md border border-gray-200 p-2"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                <option value="">All Skills</option>
                {Array.from(new Set(jobMatches.flatMap(job => 
                  job.candidates.flatMap(c => c.skills)
                ))).map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="Filter by location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Experience</Label>
              <Input
                placeholder="Years of experience"
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Education</Label>
              <Input
                placeholder="Education level"
                value={educationFilter}
                onChange={(e) => setEducationFilter(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Job Matches */}
      <div className="space-y-6">
        {filteredJobMatches.map((jobMatch) => (
          <div key={jobMatch.jobId} className="overflow-hidden rounded-lg border bg-white shadow-sm">
            {/* Job Header */}
            <div 
              className="flex cursor-pointer items-center justify-between border-b bg-white p-4 hover:bg-gray-50"
              onClick={() => toggleJobExpansion(jobMatch.jobId)}
            >
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <BuildingIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{jobMatch.jobTitle}</h2>
                  <p className="text-sm text-gray-600">
                    {jobMatch.company} • {jobMatch.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="font-medium text-blue-600">{jobMatch.candidates.length}</span>
                  <span className="ml-1 text-gray-600">matches today</span>
                </div>
                {expandedJobId === jobMatch.jobId ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            {/* Candidates List */}
            {expandedJobId === jobMatch.jobId && (
              <div className="divide-y">
                {jobMatch.candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="p-6 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex flex-col justify-between gap-6 md:flex-row">
                      {/* Candidate Info */}
                      <div className="flex-grow space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold">{candidate.name}</h3>
                            <p className="text-gray-600">{candidate.title}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                              <span className="text-sm font-bold text-green-600">{candidate.matchScore}%</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-green-600">Match Score</div>
                              <div className="text-xs text-gray-500">Based on skills</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="flex items-center space-x-2">
                            <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-600">{candidate.experience} experience</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <GraduationCapIcon className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-600">{candidate.education}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPinIcon className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-600">{candidate.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StarIcon className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-600">Available {candidate.availableFrom}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 flex-col gap-2">
                        <Button className="w-full">
                          <ExternalLinkIcon className="mr-2 h-4 w-4" />
                          View Profile
                        </Button>
                        <Button variant="outline" className="w-full">
                          <MailIcon className="mr-2 h-4 w-4" />
                          Contact
                        </Button>
                        <Button variant="outline" className="w-full">
                          <BookmarkIcon className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {filteredJobMatches.length === 0 && (
          <div className="rounded-lg border bg-white p-8 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 p-3">
              <SearchIcon className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">No matches found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find more candidates
            </p>
          </div>
        )}
      </div>
    </div>
  );
}