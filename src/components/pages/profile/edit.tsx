import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PersonalInfoForm } from '@/components/profile/personal-info-form';
import { CompanyInfoForm } from '@/components/profile/company-info-form';
import { EducationForm } from '@/components/profile/education-form';
import { ExperienceForm } from '@/components/profile/experience-form';
import { SkillsForm } from '@/components/profile/skills-form';
import { HobbiesForm } from '@/components/profile/hobbies-form';
import { VolunteerForm } from '@/components/profile/volunteer-form';
import { useAuthStore } from '@/lib/store';
import { Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';
import { 
  UserIcon, 
  BuildingIcon, 
  BookOpenIcon, 
  BriefcaseIcon,
  CheckCircleIcon,
  HeartIcon,
  HandHelpingIcon
} from 'lucide-react';

export function EditProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [showToast, setShowToast] = useState(false);

  // Mock data - In a real app, this would come from an API
  const mockProfile = {
    personalInfo: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      whatsapp: '+242 XX XXX XXXX',
      maritalStatus: 'Single' as const,
      address: '123 Main Street',
      city: user?.city || '',
      country: user?.country || '',
      dateOfBirth: '1990-01-01',
      gender: 'Male' as const,
    },
    companyInfo: {
      companyName: user?.company || '',
      industry: user?.industry || '',
      companySize: user?.companySize || '11-50',
      website: 'https://www.example.com',
      founded: '2015',
      description: 'A leading technology company focused on innovation and growth.',
    },
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Brazzaville',
        graduationYear: 2020,
      },
    ],
    experience: [
      {
        title: 'Software Engineer',
        company: 'Tech Corp',
        startDate: '2020-01',
        endDate: '2023-12',
        description: 'Full-stack development using React and Node.js',
      },
    ],
    skills: [
      {
        name: 'JavaScript',
        level: 'advanced',
        isValidated: true,
        yearsOfExperience: 3,
      },
    ],
    hobbies: [
      {
        name: 'Photography',
        description: 'Street and landscape photography',
      },
    ],
    volunteer: [
      {
        organization: 'Local Tech Community',
        role: 'Mentor',
        startDate: '2021-01',
        endDate: '2023-12',
        description: 'Mentoring junior developers',
        achievements: 'Helped 10+ developers start their careers',
      },
    ],
  };

  const handleSubmit = (section: string, data: any) => {
    console.log(`Saving ${section} data:`, data);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Edit Profile</h1>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7">
            <TabsTrigger value="personal" className="space-x-2">
              <UserIcon className="h-4 w-4" />
              <span>Personal</span>
            </TabsTrigger>
            {user?.role === 'recruiter' ? (
              <TabsTrigger value="company" className="space-x-2">
                <BuildingIcon className="h-4 w-4" />
                <span>Company</span>
              </TabsTrigger>
            ) : (
              <>
                <TabsTrigger value="education" className="space-x-2">
                  <BookOpenIcon className="h-4 w-4" />
                  <span>Education</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="space-x-2">
                  <BriefcaseIcon className="h-4 w-4" />
                  <span>Experience</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="space-x-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>Skills</span>
                </TabsTrigger>
                <TabsTrigger value="hobbies" className="space-x-2">
                  <HeartIcon className="h-4 w-4" />
                  <span>Hobbies</span>
                </TabsTrigger>
                <TabsTrigger value="volunteer" className="space-x-2">
                  <HandHelpingIcon className="h-4 w-4" />
                  <span>Volunteer</span>
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="personal">
            <div className="rounded-lg border bg-white p-6">
              <PersonalInfoForm
                initialData={mockProfile.personalInfo}
                onSubmit={(data) => handleSubmit('personal', data)}
              />
            </div>
          </TabsContent>

          {user?.role === 'recruiter' ? (
            <TabsContent value="company">
              <div className="rounded-lg border bg-white p-6">
                <CompanyInfoForm
                  initialData={mockProfile.companyInfo}
                  onSubmit={(data) => handleSubmit('company', data)}
                />
              </div>
            </TabsContent>
          ) : (
            <>
              <TabsContent value="education">
                <div className="rounded-lg border bg-white p-6">
                  <EducationForm
                    initialData={mockProfile.education}
                    onSubmit={(data) => handleSubmit('education', data)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="experience">
                <div className="rounded-lg border bg-white p-6">
                  <ExperienceForm
                    initialData={mockProfile.experience}
                    onSubmit={(data) => handleSubmit('experience', data)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="skills">
                <div className="rounded-lg border bg-white p-6">
                  <SkillsForm
                    initialData={mockProfile.skills}
                    onSubmit={(data) => handleSubmit('skills', data)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="hobbies">
                <div className="rounded-lg border bg-white p-6">
                  <HobbiesForm
                    initialData={mockProfile.hobbies}
                    onSubmit={(data) => handleSubmit('hobbies', data)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="volunteer">
                <div className="rounded-lg border bg-white p-6">
                  <VolunteerForm
                    initialData={mockProfile.volunteer}
                    onSubmit={(data) => handleSubmit('volunteer', data)}
                  />
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>

        {showToast && (
          <Toast>
            <ToastTitle>Success</ToastTitle>
            <ToastDescription>
              Your profile has been updated successfully.
            </ToastDescription>
          </Toast>
        )}
      </div>
    </div>
  );
}