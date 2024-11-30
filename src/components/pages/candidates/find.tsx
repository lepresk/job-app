import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  SearchIcon, 
  FilterIcon, 
  BriefcaseIcon, 
  GraduationCapIcon, 
  MapPinIcon, 
  StarIcon,
  BookmarkIcon,
  MailIcon,
  ExternalLinkIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  title: string;
  skills: string[];
  experience: string;
  education: string;
  location: string;
  availability: string;
  matchScore: number;
  bio: string;
  profileImage?: string;
}

export function FindTalentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [educationFilter, setEducationFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  // Mock data - In a real app, this would come from an API
  const [candidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'John Developer',
      title: 'Senior Software Engineer',
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      experience: '5 years',
      education: 'B.Sc. Computer Science',
      location: 'Brazzaville',
      availability: 'Immediately',
      matchScore: 95,
      bio: 'Experienced software engineer with a strong background in full-stack development.',
    },
    {
      id: '2',
      name: 'Sarah Frontend',
      title: 'Frontend Developer',
      skills: ['React', 'TypeScript', 'Vue.js', 'CSS'],
      experience: '4 years',
      education: 'B.Sc. Software Engineering',
      location: 'Remote',
      availability: '2 weeks notice',
      matchScore: 92,
      bio: 'Frontend specialist with a passion for creating beautiful and responsive user interfaces.',
    },
    {
      id: '3',
      name: 'Mike Backend',
      title: 'Backend Developer',
      skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
      experience: '4 years',
      education: 'M.Sc. Computer Science',
      location: 'Pointe-Noire',
      availability: '2 weeks notice',
      matchScore: 88,
      bio: 'Backend developer specializing in scalable web applications and cloud infrastructure.',
    },
  ]);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation = !locationFilter || 
      candidate.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesExperience = !experienceFilter || 
      candidate.experience.toLowerCase().includes(experienceFilter.toLowerCase());
    
    const matchesSkill = !skillFilter || 
      candidate.skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));
    
    const matchesEducation = !educationFilter || 
      candidate.education.toLowerCase().includes(educationFilter.toLowerCase());
    
    const matchesAvailability = !availabilityFilter || 
      candidate.availability.toLowerCase().includes(availabilityFilter.toLowerCase());

    return matchesSearch && matchesLocation && matchesExperience && 
           matchesSkill && matchesEducation && matchesAvailability;
  });

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Find Talent</h1>
        <p className="mt-2 text-gray-600">
          Search and discover qualified candidates for your open positions
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Search by name, title, or skills"
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
              <Label>Skills</Label>
              <Input
                placeholder="Required skills"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
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

            <div className="space-y-2">
              <Label>Availability</Label>
              <Input
                placeholder="Availability"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Candidates List */}
      <div className="space-y-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="p-6">
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

                  <p className="text-gray-600">{candidate.bio}</p>

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
                      <span className="text-gray-600">Available {candidate.availability}</span>
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
          </div>
        ))}

        {filteredCandidates.length === 0 && (
          <div className="rounded-lg border bg-white p-8 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 p-3">
              <SearchIcon className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">No candidates found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find more candidates
            </p>
          </div>
        )}
      </div>
    </div>
  );
}