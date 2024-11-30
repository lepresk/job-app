import { Button } from '@/components/ui/button';
import { Interview } from '@/types/interview';
import { 
  CalendarIcon, 
  ClockIcon, 
  VideoIcon, 
  MapPinIcon,
  BellIcon,
  CalendarDaysIcon
} from 'lucide-react';

interface InterviewListProps {
  interviews: Interview[];
  onSendReminder: (interviewId: string) => void;
  onReschedule: (interviewId: string) => void;
}

export function InterviewList({ interviews, onSendReminder, onReschedule }: InterviewListProps) {
  return (
    <div className="space-y-4">
      {interviews.map((interview) => (
        <div
          key={interview.id}
          className="rounded-lg border bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{interview.candidateName}</h3>
              <p className="text-gray-600">{interview.jobTitle}</p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{new Date(interview.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <ClockIcon className="h-4 w-4" />
                  <span>{interview.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  {interview.format === 'virtual' ? (
                    <VideoIcon className="h-4 w-4" />
                  ) : (
                    <MapPinIcon className="h-4 w-4" />
                  )}
                  <span className="capitalize">{interview.format}</span>
                </div>
              </div>

              <div className="mt-2">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium
                  ${
                    interview.status === 'scheduled'
                      ? 'bg-blue-100 text-blue-700'
                      : interview.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {interview.status}
                </span>
              </div>
            </div>

            <div className="flex flex-shrink-0 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSendReminder(interview.id)}
              >
                <BellIcon className="mr-2 h-4 w-4" />
                Send Reminder
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReschedule(interview.id)}
              >
                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                Reschedule
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
          <h3 className="mb-1 text-lg font-semibold">No interviews found</h3>
          <p className="text-gray-600">
            No upcoming interviews match your search criteria
          </p>
        </div>
      )}
    </div>
  );
}