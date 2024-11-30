import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { JobList } from '@/components/jobs/job-list';
import { 
  BuildingIcon, 
  GlobeIcon, 
  UsersIcon, 
  MapPinIcon,
  CalendarIcon,
  BriefcaseIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  PhoneIcon,
  MailIcon
} from 'lucide-react';

interface CompanyDetails {
  id: string;
  name: string;
  logo?: string;
  description: string;
  industry: string;
  size: string;
  founded: string;
  website: string;
  location: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  benefits: string[];
  openPositions: Array<{
    id: string;
    title: string;
    location: string;
    type: string;
    skills: string[];
  }>;
}

export function CompanyProfilePage() {
  const { id } = useParams();

  // Mock data - In a real app, this would be fetched from an API
  const companyDetails: CompanyDetails = {
    id: '1',
    name: 'Tech Corp',
    description: 
      "Tech Corp is a leading technology company focused on building innovative solutions " +
      "that help businesses grow and succeed. With a team of passionate professionals, " +
      "we're committed to creating cutting-edge software that makes a difference.\n\n" +
      "Our culture promotes creativity, collaboration, and continuous learning. We believe " +
      "in empowering our employees to take ownership of their work and contribute to the " +
      "company's success.",
    industry: 'Technology',
    size: '51-200 employees',
    founded: '2015',
    website: 'www.techcorp.com',
    location: 'Brazzaville, Congo',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp',
      facebook: 'https://facebook.com/techcorp',
    },
    contact: {
      email: 'careers@techcorp.com',
      phone: '+242 XX XXX XXXX',
    },
    benefits: [
      'Competitive salary and equity',
      'Health insurance',
      'Flexible working hours',
      'Remote work options',
      'Professional development',
      'Modern equipment',
      'Team events',
      'Annual bonus',
    ],
    openPositions: [
      {
        id: '1',
        title: 'Senior Software Engineer',
        location: 'Brazzaville',
        type: 'Full-time',
        skills: ['JavaScript', 'React', 'Node.js'],
      },
      {
        id: '2',
        title: 'Frontend Developer',
        location: 'Remote',
        type: 'Full-time',
        skills: ['React', 'TypeScript', 'CSS'],
      },
      {
        id: '3',
        title: 'Backend Developer',
        location: 'Pointe-Noire',
        type: 'Contract',
        skills: ['Python', 'Django', 'PostgreSQL'],
      },
    ],
  };

  return (
    <div className="container py-8">
      {/* Company Header */}
      <div className="mb-8 rounded-lg border bg-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
              {companyDetails.logo ? (
                <img
                  src={companyDetails.logo}
                  alt={companyDetails.name}
                  className="h-16 w-16 object-contain"
                />
              ) : (
                <BuildingIcon className="h-10 w-10 text-gray-400" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{companyDetails.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <BuildingIcon className="mr-2 h-4 w-4" />
                  {companyDetails.industry}
                </div>
                <div className="flex items-center">
                  <UsersIcon className="mr-2 h-4 w-4" />
                  {companyDetails.size}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  {companyDetails.location}
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {companyDetails.socialLinks.linkedin && (
              <Button variant="outline" size="icon" asChild>
                <a 
                  href={companyDetails.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </Button>
            )}
            {companyDetails.socialLinks.twitter && (
              <Button variant="outline" size="icon" asChild>
                <a 
                  href={companyDetails.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon className="h-5 w-5" />
                </a>
              </Button>
            )}
            {companyDetails.socialLinks.facebook && (
              <Button variant="outline" size="icon" asChild>
                <a 
                  href={companyDetails.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">About {companyDetails.name}</h2>
            <p className="whitespace-pre-line text-gray-600">{companyDetails.description}</p>
          </div>

          {/* Open Positions */}
          <div className="rounded-lg border bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Open Positions</h2>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
                {companyDetails.openPositions.length} openings
              </span>
            </div>
            <JobList jobs={companyDetails.openPositions} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">Company Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GlobeIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Website</span>
                </div>
                <a 
                  href={`https://${companyDetails.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {companyDetails.website}
                </a>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Founded</span>
                </div>
                <span>{companyDetails.founded}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Industry</span>
                </div>
                <span>{companyDetails.industry}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UsersIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Company Size</span>
                </div>
                <span>{companyDetails.size}</span>
              </div>
            </div>

            <hr className="my-4" />

            <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MailIcon className="h-5 w-5 text-gray-400" />
                <a 
                  href={`mailto:${companyDetails.contact.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {companyDetails.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <span>{companyDetails.contact.phone}</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">Benefits & Perks</h3>
            <ul className="space-y-2">
              {companyDetails.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}