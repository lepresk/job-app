import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InterviewList } from '@/components/interviews/interview-list';
import { InterviewCalendar } from '@/components/interviews/interview-calendar';
import { ScheduleInterviewModal } from '@/components/interviews/schedule-interview-modal';
import { useInterviews } from '@/hooks/use-interviews';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SearchIcon, CalendarIcon, ListIcon, PlusIcon } from 'lucide-react';
import type { Interview } from '@/types/interview';

export function InterviewsPage() {
  const { interviews, sendReminder, rescheduleInterview, scheduleInterview } = useInterviews();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = 
      interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSchedule = (interviewData: Omit<Interview, 'id' | 'status'>) => {
    scheduleInterview(interviewData);
    setShowScheduleModal(false);
    setSelectedInterview(null);
  };

  const handleReschedule = (interviewId: string) => {
    const interview = interviews.find(i => i.id === interviewId);
    if (interview) {
      setSelectedInterview(interview);
      setShowScheduleModal(true);
    }
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Interview Management</h1>
          <p className="mt-2 text-gray-600">
            Schedule and manage your upcoming interviews
          </p>
        </div>
        <Button onClick={() => setShowScheduleModal(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Schedule Interview
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Search by candidate or job title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="w-48">
          <select
            className="w-full rounded-md border border-gray-200 p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* View Toggle */}
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list" className="space-x-2">
            <ListIcon className="h-4 w-4" />
            <span>List View</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>Calendar View</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <InterviewList
            interviews={filteredInterviews}
            onSendReminder={sendReminder}
            onReschedule={handleReschedule}
          />
        </TabsContent>

        <TabsContent value="calendar">
          <InterviewCalendar
            interviews={filteredInterviews}
            onSendReminder={sendReminder}
            onReschedule={handleReschedule}
          />
        </TabsContent>
      </Tabs>

      <ScheduleInterviewModal
        isOpen={showScheduleModal}
        onClose={() => {
          setShowScheduleModal(false);
          setSelectedInterview(null);
        }}
        onSchedule={handleSchedule}
        initialData={selectedInterview || undefined}
      />
    </div>
  );
}