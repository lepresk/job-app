import { User } from '@/lib/auth/types';

interface ProfileFields {
  personal: {
    name: boolean;
    email: boolean;
    phone: boolean;
    whatsapp: boolean;
    maritalStatus: boolean;
    address: boolean;
    city: boolean;
    country: boolean;
    dateOfBirth: boolean;
    gender: boolean;
  };
  professional: {
    education: boolean;
    experience: boolean;
    skills: boolean;
    languages: boolean;
    hobbies: boolean;
    volunteer: boolean;
  };
  preferences: {
    jobTypes: boolean;
    locations: boolean;
    salary: boolean;
    industries: boolean;
  };
}

export function calculateProfileStrength(user: User | null): number {
  if (!user) return 0;

  // Get mock profile data from localStorage
  const mockProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const fields: ProfileFields = {
    personal: {
      name: !!user.name,
      email: !!user.email,
      phone: !!user.phone,
      whatsapp: !!mockProfile?.personalInfo?.whatsapp,
      maritalStatus: !!mockProfile?.personalInfo?.maritalStatus,
      address: !!mockProfile?.personalInfo?.address,
      city: !!user.city,
      country: !!user.country,
      dateOfBirth: !!mockProfile?.personalInfo?.dateOfBirth,
      gender: !!mockProfile?.personalInfo?.gender,
    },
    professional: {
      education: Array.isArray(mockProfile?.education) && mockProfile.education.length > 0,
      experience: Array.isArray(mockProfile?.experience) && mockProfile.experience.length > 0,
      skills: Array.isArray(mockProfile?.skills) && mockProfile.skills.length > 0,
      languages: Array.isArray(mockProfile?.languages) && mockProfile.languages.length > 0,
      hobbies: Array.isArray(mockProfile?.hobbies) && mockProfile.hobbies.length > 0,
      volunteer: Array.isArray(mockProfile?.volunteer) && mockProfile.volunteer.length > 0,
    },
    preferences: {
      jobTypes: !!mockProfile?.preferences?.jobTypes,
      locations: !!mockProfile?.preferences?.locations,
      salary: !!mockProfile?.preferences?.salary,
      industries: !!mockProfile?.preferences?.industries,
    },
  };

  // Calculate completion for each section
  const personalFields = Object.values(fields.personal);
  const professionalFields = Object.values(fields.professional);
  const preferenceFields = Object.values(fields.preferences);

  const personalCompletion = personalFields.filter(Boolean).length / personalFields.length;
  const professionalCompletion = professionalFields.filter(Boolean).length / professionalFields.length;
  const preferencesCompletion = preferenceFields.filter(Boolean).length / preferenceFields.length;

  // Weight each section differently
  const weights = {
    personal: 0.3, // 30% weight
    professional: 0.5, // 50% weight
    preferences: 0.2, // 20% weight
  };

  const totalCompletion = (
    personalCompletion * weights.personal +
    professionalCompletion * weights.professional +
    preferencesCompletion * weights.preferences
  ) * 100;

  return Math.round(totalCompletion);
}

export function getProfileStrengthColor(strength: number): string {
  if (strength < 30) return 'text-red-600';
  if (strength < 60) return 'text-yellow-600';
  if (strength < 80) return 'text-blue-600';
  return 'text-green-600';
}

export function getProfileStrengthMessage(strength: number): string {
  if (strength < 30) return 'Your profile needs attention';
  if (strength < 60) return 'Keep going! Add more details';
  if (strength < 80) return 'Almost there! Complete missing sections';
  return 'Great job! Profile is well completed';
}

export function getIncompleteFields(user: User | null): string[] {
  if (!user) return [];

  const mockProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const incompleteFields: string[] = [];

  // Check personal information
  if (!user.name) incompleteFields.push('Full Name');
  if (!user.email) incompleteFields.push('Email');
  if (!user.phone) incompleteFields.push('Phone Number');
  if (!mockProfile?.personalInfo?.whatsapp) incompleteFields.push('WhatsApp');
  if (!mockProfile?.personalInfo?.maritalStatus) incompleteFields.push('Marital Status');
  if (!mockProfile?.personalInfo?.address) incompleteFields.push('Address');
  if (!user.city) incompleteFields.push('City');
  if (!user.country) incompleteFields.push('Country');
  if (!mockProfile?.personalInfo?.dateOfBirth) incompleteFields.push('Date of Birth');
  if (!mockProfile?.personalInfo?.gender) incompleteFields.push('Gender');

  // Check professional information
  if (!mockProfile?.education?.length) incompleteFields.push('Education');
  if (!mockProfile?.experience?.length) incompleteFields.push('Work Experience');
  if (!mockProfile?.skills?.length) incompleteFields.push('Skills');
  if (!mockProfile?.languages?.length) incompleteFields.push('Languages');
  if (!mockProfile?.hobbies?.length) incompleteFields.push('Hobbies');
  if (!mockProfile?.volunteer?.length) incompleteFields.push('Volunteer Experience');

  // Check preferences
  if (!mockProfile?.preferences?.jobTypes) incompleteFields.push('Job Types');
  if (!mockProfile?.preferences?.locations) incompleteFields.push('Preferred Locations');
  if (!mockProfile?.preferences?.salary) incompleteFields.push('Salary Expectations');
  if (!mockProfile?.preferences?.industries) incompleteFields.push('Preferred Industries');

  return incompleteFields;
}