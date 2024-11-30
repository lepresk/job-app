import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { ProfileHeader } from '@/components/profile/profile-header';
import { SectionCard } from '@/components/profile/section-card';
import { ContactInfo } from '@/components/profile/contact-info';
import { TimelineItem } from '@/components/profile/timeline-item';
import { SkillsSection } from '@/components/profile/skills-section';
import { HobbyCard } from '@/components/profile/hobby-card';
import { 
  UserIcon, 
  BookOpenIcon, 
  BriefcaseIcon, 
  CheckCircleIcon,
  HeartIcon,
  HandHelpingIcon
} from 'lucide-react';
import { calculateProfileStrength } from '@/lib/utils/profile-completion';

export function JobSeekerProfilePage() {
  const user = useAuthStore((state) => state.user);
  const [profileImage, setProfileImage] = useState<string>();

  // Mock data - In a real app, this would come from an API
  const mockProfile = {
    personalInfo: {
      email: user?.email || '',
      phone: user?.phone || '',
      whatsapp: '+242 XX XXX XXXX',
      maritalStatus: 'Single',
      address: '123 Main Street',
      city: user?.city || '',
      country: user?.country || '',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
    },
    skills: [
      { id: '1', name: 'JavaScript', isValidated: true, level: 'advanced', validatedAt: new Date() },
      { id: '2', name: 'React', isValidated: true, level: 'advanced', validatedAt: new Date() },
      { id: '3', name: 'Node.js', isValidated: false, level: 'intermediate' },
      { id: '4', name: 'TypeScript', isValidated: true, level: 'intermediate', validatedAt: new Date() },
      { id: '5', name: 'Python', isValidated: false, level: 'beginner' },
    ],
    experience: [
      {
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        startDate: '2020-01',
        endDate: '2023-12',
        description: 'Full-stack development using React and Node.js',
      },
      {
        title: 'Frontend Developer',
        company: 'Digital Agency',
        startDate: '2018-03',
        endDate: '2019-12',
        description: 'Built responsive web applications using React',
      },
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Brazzaville',
        graduationYear: 2018,
      },
      {
        degree: 'Web Development Bootcamp',
        institution: 'Tech Academy',
        graduationYear: 2017,
      },
    ],
    hobbies: [
      {
        name: 'Photography',
        description: 'Street and landscape photography',
      },
      {
        name: 'Reading',
        description: 'Science fiction and technology books',
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

  const handleProfileImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const profileStrength = calculateProfileStrength(user);

  return (
    <div className="container py-8">
      <ProfileHeader
        name={user?.name || ''}
        imageUrl={profileImage}
        location={`${user?.city || ''}, ${user?.country || ''}`}
        completionPercentage={profileStrength}
        onImageChange={handleProfileImageChange}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Skills Section */}
          <SectionCard title="Skills" icon={<CheckCircleIcon className="h-5 w-5" />}>
            <SkillsSection
              skills={mockProfile.skills}
              validatedCount={mockProfile.skills.filter(s => s.isValidated).length}
              totalSkills={mockProfile.skills.length}
              averageScore={85}
            />
          </SectionCard>

          {/* Experience Section */}
          <SectionCard title="Work Experience" icon={<BriefcaseIcon className="h-5 w-5" />}>
            <div className="space-y-6">
              {mockProfile.experience.map((exp, index) => (
                <TimelineItem
                  key={index}
                  title={exp.title}
                  subtitle={exp.company}
                  date={`${exp.startDate} - ${exp.endDate || 'Present'}`}
                  description={exp.description}
                />
              ))}
            </div>
          </SectionCard>

          {/* Education Section */}
          <SectionCard title="Education" icon={<BookOpenIcon className="h-5 w-5" />}>
            <div className="space-y-6">
              {mockProfile.education.map((edu, index) => (
                <TimelineItem
                  key={index}
                  title={edu.degree}
                  subtitle={edu.institution}
                  date={edu.graduationYear.toString()}
                />
              ))}
            </div>
          </SectionCard>

          {/* Volunteer Experience */}
          <SectionCard title="Volunteer Experience" icon={<HandHelpingIcon className="h-5 w-5" />}>
            <div className="space-y-6">
              {mockProfile.volunteer.map((vol, index) => (
                <TimelineItem
                  key={index}
                  title={vol.role}
                  subtitle={vol.organization}
                  date={`${vol.startDate} - ${vol.endDate || 'Present'}`}
                  description={vol.description}
                  achievements={vol.achievements}
                />
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Personal Information */}
          <SectionCard title="Personal Information" icon={<UserIcon className="h-5 w-5" />}>
            <ContactInfo {...mockProfile.personalInfo} />
          </SectionCard>

          {/* Hobbies */}
          <SectionCard title="Hobbies & Interests" icon={<HeartIcon className="h-5 w-5" />}>
            <div className="space-y-4">
              {mockProfile.hobbies.map((hobby, index) => (
                <HobbyCard
                  key={index}
                  name={hobby.name}
                  description={hobby.description}
                />
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}