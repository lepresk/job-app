import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  MapPinIcon, 
  BriefcaseIcon, 
  ClockIcon, 
  BuildingIcon,
  DollarSignIcon,
  CalendarIcon,
  CheckCircleIcon,
  BookmarkIcon,
  ShareIcon
} from 'lucide-react';

interface JobDetails {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
}

export function JobDetailsPage() {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);

  // Mock data - In a real app, this would be fetched from an API
  const jobDetails: JobDetails = {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'Brazzaville',
    type: 'Full-time',
    salary: '$60,000 - $80,000',
    experience: '5+ years',
    postedDate: '2 days ago',
    description: 
      "We are seeking a talented Senior Software Engineer to join our growing team. " +
      "The ideal candidate will have strong experience in full-stack development and a passion for " +
      "building scalable applications.\n\n" +
      "You will be responsible for designing and implementing new features, mentoring junior developers, " +
      "and contributing to technical decisions that shape our product's future.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience in software development",
      "Strong proficiency in JavaScript/TypeScript and React",
      "Experience with Node.js and REST APIs",
      "Excellent problem-solving and communication skills",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible working hours and remote work options",
      "Professional development budget",
      "Annual bonus program",
      "Modern equipment and tools",
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "AWS",
      "System Design",
    ],
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: jobDetails.title,
        text: `${jobDetails.title} at ${jobDetails.company}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleApply = () => {
    // In a real app, this would open the application form or process
    console.log('Apply to job:', id);
  };

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <div className="rounded-lg border bg-white p-6">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{jobDetails.title}</h1>
                <p className="mt-2 text-lg text-gray-600">{jobDetails.company}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSave}
                  className={isSaved ? 'text-blue-600' : ''}
                >
                  <BookmarkIcon className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <ShareIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPinIcon className="h-5 w-5" />
                <span>{jobDetails.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <BriefcaseIcon className="h-5 w-5" />
                <span>{jobDetails.type}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <DollarSignIcon className="h-5 w-5" />
                <span>{jobDetails.salary}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <ClockIcon className="h-5 w-5" />
                <span>{jobDetails.experience}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <CalendarIcon className="h-5 w-5" />
                <span>Posted {jobDetails.postedDate}</span>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Job Description</h2>
            <p className="whitespace-pre-line text-gray-600">{jobDetails.description}</p>
          </div>

          {/* Requirements */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Requirements</h2>
            <ul className="space-y-2">
              {jobDetails.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircleIcon className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-gray-600">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Skills */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {jobDetails.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Benefits</h2>
            <ul className="space-y-2">
              {jobDetails.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircleIcon className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          <div className="sticky top-8 rounded-lg border bg-white p-6">
            <Button className="mb-4 w-full" onClick={handleApply}>
              Apply Now
            </Button>
            <Button 
              variant="outline" 
              className={`w-full ${isSaved ? 'border-blue-500 text-blue-600' : ''}`} 
              onClick={handleSave}
            >
              <BookmarkIcon className="mr-2 h-4 w-4" />
              {isSaved ? 'Saved' : 'Save Job'}
            </Button>

            <hr className="my-6" />

            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <BuildingIcon className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{jobDetails.company}</h3>
                  <p className="text-sm text-gray-600">{jobDetails.location}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to={`/companies/${jobDetails.company}`}>
                  View Company Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}