import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/profile/avatar';
import { 
  BuildingIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  GlobeIcon,
  BriefcaseIcon,
  UsersIcon,
  LineChartIcon,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function RecruiterProfilePage() {
  const user = useAuthStore((state) => state.user);

  // Mock data - In a real app, this would come from an API
  const mockProfile = {
    imageUrl: undefined,
    companyInfo: {
      name: user?.company || 'Company Name',
      size: user?.companySize || '11-50',
      industry: user?.industry || 'Technology',
      website: 'www.company.com',
      description: 'A leading technology company focused on innovation and growth.',
      founded: '2015',
    },
    contactInfo: {
      email: user?.email || '',
      phone: user?.phone || '',
      address: '123 Business Street',
      city: user?.city || '',
      country: user?.country || '',
    },
    stats: {
      activeJobs: 5,
      totalApplications: 128,
      hiredCandidates: 12,
      averageTimeToHire: '21 days',
    },
  };

  const handleProfileImageChange = (file: File) => {
    console.log('Uploading file:', file);
  };

  return (
    <div className="container py-8">
      {/* Profile Header */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-center space-x-6">
          <Avatar
            imageUrl={mockProfile.imageUrl}
            name={mockProfile.companyInfo.name}
            size="lg"
            onImageChange={handleProfileImageChange}
            editable
          />
          <div>
            <h1 className="text-3xl font-bold">{mockProfile.companyInfo.name}</h1>
            <p className="text-gray-600">{mockProfile.companyInfo.industry}</p>
          </div>
        </div>
        <Button asChild>
          <Link to="/profile/edit">Edit Profile</Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Company Information */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-lg border bg-white p-6">
            <div className="mb-4 flex items-center">
              <BuildingIcon className="mr-2 h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Company Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">About Us</h3>
                <p className="mt-1 text-gray-600">{mockProfile.companyInfo.description}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">{mockProfile.companyInfo.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company Size</p>
                  <p className="font-medium">{mockProfile.companyInfo.size} employees</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Founded</p>
                  <p className="font-medium">{mockProfile.companyInfo.founded}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a
                    href={`https://${mockProfile.companyInfo.website}`}
                    className="font-medium text-blue-600 hover:text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {mockProfile.companyInfo.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-lg border bg-white p-6">
            <div className="mb-4 flex items-center">
              <MailIcon className="mr-2 h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Contact Information</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-3">
                <MailIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{mockProfile.contactInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{mockProfile.contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{mockProfile.contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <GlobeIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">
                    {mockProfile.contactInfo.city}, {mockProfile.contactInfo.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recruitment Stats */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Recruitment Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-blue-100 p-2">
                    <BriefcaseIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-600">Active Jobs</span>
                </div>
                <span className="font-semibold">{mockProfile.stats.activeJobs}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-green-100 p-2">
                    <UsersIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-600">Total Applications</span>
                </div>
                <span className="font-semibold">{mockProfile.stats.totalApplications}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-purple-100 p-2">
                    <LineChartIcon className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-600">Hired Candidates</span>
                </div>
                <span className="font-semibold">{mockProfile.stats.hiredCandidates}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-yellow-100 p-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                  <span className="text-gray-600">Avg. Time to Hire</span>
                </div>
                <span className="font-semibold">{mockProfile.stats.averageTimeToHire}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full" asChild>
                <Link to="/jobs/post">Post New Job</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/candidates/matches">View Candidates</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}