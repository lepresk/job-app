import { useState } from 'react';
import { Interview } from '@/types/interview';

export function useInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: '1',
      candidateName: 'John Developer',
      jobTitle: 'Senior Software Engineer',
      date: '2024-03-20',
      time: '10:00 AM',
      format: 'virtual',
      status: 'scheduled',
      platform: 'Zoom',
      meetingLink: 'https://zoom.us/j/123456789',
    },
    {
      id: '2',
      candidateName: 'Sarah Frontend',
      jobTitle: 'Frontend Developer',
      date: '2024-03-21',
      time: '2:00 PM',
      format: 'in-person',
      status: 'scheduled',
      location: 'Office - Meeting Room 2',
    },
    {
      id: '3',
      candidateName: 'Mike Backend',
      jobTitle: 'Backend Developer',
      date: '2024-03-22',
      time: '11:30 AM',
      format: 'virtual',
      status: 'scheduled',
      platform: 'Google Meet',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
    },
  ]);

  const scheduleInterview = (interviewData: Omit<Interview, 'id' | 'status'>) => {
    const newInterview: Interview = {
      ...interviewData,
      id: Math.random().toString(),
      status: 'scheduled',
    };
    setInterviews([...interviews, newInterview]);
  };

  const sendReminder = (interviewId: string) => {
    // In a real app, this would send a reminder through an API
    console.log('Sending reminder for interview:', interviewId);
  };

  const rescheduleInterview = (interviewId: string) => {
    // In a real app, this would update the interview in the database
    console.log('Rescheduling interview:', interviewId);
  };

  return {
    interviews,
    scheduleInterview,
    sendReminder,
    rescheduleInterview,
  };
}