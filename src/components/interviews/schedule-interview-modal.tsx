import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { XIcon } from 'lucide-react';
import { Interview } from '@/types/interview';

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (interviewData: Omit<Interview, 'id' | 'status'>) => void;
  initialData?: Partial<Interview>;
}

export function ScheduleInterviewModal({
  isOpen,
  onClose,
  onSchedule,
  initialData,
}: ScheduleInterviewModalProps) {
  const [formData, setFormData] = useState({
    candidateName: initialData?.candidateName || '',
    jobTitle: initialData?.jobTitle || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    format: initialData?.format || 'virtual',
    platform: initialData?.platform || 'Zoom',
    meetingLink: initialData?.meetingLink || '',
    location: initialData?.location || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
        >
          <XIcon className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold">
          {initialData ? 'Reschedule Interview' : 'Schedule New Interview'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Candidate Name</Label>
            <Input
              value={formData.candidateName}
              onChange={(e) =>
                setFormData({ ...formData, candidateName: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Job Title</Label>
            <Input
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Interview Format</Label>
            <select
              className="w-full rounded-md border border-gray-200 p-2"
              value={formData.format}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  format: e.target.value as 'virtual' | 'in-person',
                })
              }
              required
            >
              <option value="virtual">Virtual</option>
              <option value="in-person">In-Person</option>
            </select>
          </div>

          {formData.format === 'virtual' ? (
            <>
              <div className="space-y-2">
                <Label>Platform</Label>
                <select
                  className="w-full rounded-md border border-gray-200 p-2"
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                  required
                >
                  <option value="Zoom">Zoom</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Meeting Link</Label>
                <Input
                  value={formData.meetingLink}
                  onChange={(e) =>
                    setFormData({ ...formData, meetingLink: e.target.value })
                  }
                  placeholder="https://..."
                  required
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Office address or room number"
                required
              />
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Reschedule' : 'Schedule Interview'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}