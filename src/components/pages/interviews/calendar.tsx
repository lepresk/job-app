import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  CalendarIcon, 
  ListIcon, 
  VideoIcon, 
  MapPinIcon, 
  ClockIcon,
  BriefcaseIcon,
  BuildingIcon,
  LinkIcon,
  ExternalLinkIcon
} from 'lucide-react';

interface Interview {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  type: 'online' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
  meetingLink?: string;
  meetingId?: string;
  meetingPassword?: string;
  platform?: 'zoom' | 'google-meet' | 'teams';
  notes?: string;
}

export function InterviewCalendarPage() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data - In a real app, this would come from an API
  const [interviews] = useState<Interview[]>([
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Corp',
      date: '2024-03-20',
      time: '10:00',
      type: 'online',
      status: 'scheduled',
      platform: 'zoom',
      meetingLink: 'https://zoom.us/j/123456789',
      meetingId: '123 456 789',
      meetingPassword: '123456',
      notes: 'Technical interview with the engineering team',
    },
    {
      id: '2',
      jobTitle: 'Frontend Developer',
      company: 'Digital Solutions',
      date: '2024-03-21',
      time: '14:00',
      type: 'in-person',
      status: 'scheduled',
      location: 'Office Building, Floor 3, Room 302, Brazzaville',
      notes: 'Bring portfolio and references',
    },
  ]);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const getInterviewsForDate = (day: number) => {
    return interviews.filter(interview => {
      const interviewDate = new Date(interview.date);
      return (
        interviewDate.getDate() === day &&
        interviewDate.getMonth() === currentDate.getMonth() &&
        interviewDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const joinMeeting = (interview: Interview) => {
    if (interview.meetingLink) {
      window.open(interview.meetingLink, '_blank');
    }
  };

  const getDirections = (location: string) => {
    window.open(`https://maps.google.com?q=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Interviews</h1>
        <p className="mt-2 text-gray-600">
          Manage your upcoming interviews and meetings
        </p>
      </div>

      {/* View Toggle */}
      <Tabs value={view} onValueChange={(v) => setView(v as 'calendar' | 'list')} className="mb-6">
        <TabsList>
          <TabsTrigger value="calendar" className="space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>Calendar View</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="space-x-2">
            <ListIcon className="h-4 w-4" />
            <span>List View</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="rounded-lg border bg-white p-6">
          {/* Calendar Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={previousMonth}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                Next
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Week Days */}
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center font-medium text-gray-600">
                {day}
              </div>
            ))}

            {/* Empty cells for days before the first day of the month */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="p-2" />
            ))}

            {/* Calendar Days */}
            {days.map(day => {
              const dayInterviews = getInterviewsForDate(day);
              return (
                <div
                  key={day}
                  className={`min-h-[120px] rounded-lg border p-2 ${
                    dayInterviews.length > 0 ? 'border-blue-200 bg-blue-50' : ''
                  }`}
                >
                  <div className="mb-1 font-medium">{day}</div>
                  {dayInterviews.map(interview => (
                    <div
                      key={interview.id}
                      className="mb-1 rounded bg-white p-2 text-sm shadow-sm"
                    >
                      <div className="font-medium">{interview.jobTitle}</div>
                      <div className="text-gray-600">{interview.time}</div>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        {interview.type === 'online' ? (
                          <VideoIcon className="mr-1 h-3 w-3" />
                        ) : (
                          <MapPinIcon className="mr-1 h-3 w-3" />
                        )}
                        {interview.type === 'online' ? 'Online' : 'In-Person'}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="space-y-4">
          {interviews.map(interview => (
            <div
              key={interview.id}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold">{interview.jobTitle}</h3>
                  <p className="text-gray-600">{interview.company}</p>
                  
                  <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <span>{new Date(interview.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      <span>{interview.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {interview.type === 'online' ? (
                        <VideoIcon className="h-4 w-4 text-gray-400" />
                      ) : (
                        <MapPinIcon className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="capitalize">{interview.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BuildingIcon className="h-4 w-4 text-gray-400" />
                      <span>{interview.company}</span>
                    </div>
                  </div>

                  {interview.type === 'online' && (
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 flex items-center">
                        <BriefcaseIcon className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="font-medium">Meeting Details</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        {interview.platform && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Platform:</span>
                            <span className="capitalize">{interview.platform}</span>
                          </div>
                        )}
                        {interview.meetingId && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Meeting ID:</span>
                            <span>{interview.meetingId}</span>
                          </div>
                        )}
                        {interview.meetingPassword && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Password:</span>
                            <span>{interview.meetingPassword}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {interview.type === 'in-person' && interview.location && (
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 flex items-center">
                        <MapPinIcon className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="font-medium">Location</span>
                      </div>
                      <p className="text-sm text-gray-600">{interview.location}</p>
                    </div>
                  )}

                  {interview.notes && (
                    <div className="mt-4 text-sm text-gray-600">
                      <span className="font-medium">Notes: </span>
                      {interview.notes}
                    </div>
                  )}
                </div>

                <div className="flex shrink-0 flex-col gap-2">
                  {interview.type === 'online' && interview.meetingLink && (
                    <Button onClick={() => joinMeeting(interview)}>
                      <VideoIcon className="mr-2 h-4 w-4" />
                      Join Meeting
                    </Button>
                  )}
                  {interview.type === 'in-person' && interview.location && (
                    <Button onClick={() => getDirections(interview.location)}>
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                  )}
                  <Button variant="outline">
                    <ExternalLinkIcon className="mr-2 h-4 w-4" />
                    View Job Details
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {interviews.length === 0 && (
            <div className="rounded-lg border bg-white p-8 text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 p-3">
                <CalendarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mb-1 text-lg font-semibold">No interviews scheduled</h3>
              <p className="text-gray-600">
                You don't have any upcoming interviews at the moment
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}