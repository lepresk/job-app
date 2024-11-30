export interface Interview {
  id: string;
  candidateName: string;
  jobTitle: string;
  date: string;
  time: string;
  format: 'virtual' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  platform?: string;
  meetingLink?: string;
  location?: string;
}