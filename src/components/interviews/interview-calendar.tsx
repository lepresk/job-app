import { Interview } from '@/types/interview';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  BellIcon,
  CalendarDaysIcon
} from 'lucide-react';
import { useState } from 'react';

interface InterviewCalendarProps {
  interviews: Interview[];
  onSendReminder: (interviewId: string) => void;
  onReschedule: (interviewId: string) => void;
}

export function InterviewCalendar({ 
  interviews, 
  onSendReminder, 
  onReschedule 
}: InterviewCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <div className="rounded-lg border bg-white p-6">
      {/* Calendar Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Week Days */}
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
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
              className={`min-h-[100px] rounded-lg border p-2 ${
                dayInterviews.length > 0 ? 'border-blue-200 bg-blue-50' : ''
              }`}
            >
              <div className="mb-1 font-medium">{day}</div>
              {dayInterviews.map(interview => (
                <div
                  key={interview.id}
                  className="mb-1 rounded bg-white p-1 text-xs shadow-sm"
                >
                  <div className="font-medium">{interview.candidateName}</div>
                  <div className="text-gray-600">{interview.time}</div>
                  <div className="mt-1 flex space-x-1">
                    <button
                      onClick={() => onSendReminder(interview.id)}
                      className="rounded-full bg-blue-100 p-1 text-blue-600 hover:bg-blue-200"
                    >
                      <BellIcon className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => onReschedule(interview.id)}
                      className="rounded-full bg-blue-100 p-1 text-blue-600 hover:bg-blue-200"
                    >
                      <CalendarDaysIcon className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}