import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  CalendarIcon, 
  MapPinIcon, 
  VideoIcon, 
  MessageSquareIcon, 
  XIcon,
  ClockIcon,
  BuildingIcon,
  LinkIcon,
  HashIcon
} from 'lucide-react';

interface InteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
}

export function InteractionModal({
  isOpen,
  onClose,
  candidateName,
  candidateEmail,
  candidatePhone,
}: InteractionModalProps) {
  const [selectedTab, setSelectedTab] = useState('online');
  const [meetingDetails, setMeetingDetails] = useState({
    date: '',
    time: '',
    platform: 'zoom',
    location: '',
    message: '',
    meetingLink: '',
    meetingId: '',
    passcode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the interaction based on the selected tab
    console.log('Interaction details:', { type: selectedTab, ...meetingDetails });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
        >
          <XIcon className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold">Schedule with {candidateName}</h2>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="online" className="space-x-2">
              <VideoIcon className="h-4 w-4" />
              <span>Online Meeting</span>
            </TabsTrigger>
            <TabsTrigger value="office" className="space-x-2">
              <BuildingIcon className="h-4 w-4" />
              <span>Office Interview</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="space-x-2">
              <MessageSquareIcon className="h-4 w-4" />
              <span>Start Chat</span>
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="online" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      className="pl-9"
                      value={meetingDetails.date}
                      onChange={(e) =>
                        setMeetingDetails({ ...meetingDetails, date: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Time</Label>
                  <div className="relative">
                    <ClockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="time"
                      className="pl-9"
                      value={meetingDetails.time}
                      onChange={(e) =>
                        setMeetingDetails({ ...meetingDetails, time: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Platform</Label>
                <select
                  className="w-full rounded-md border border-gray-200 p-2"
                  value={meetingDetails.platform}
                  onChange={(e) =>
                    setMeetingDetails({ ...meetingDetails, platform: e.target.value })
                  }
                  required
                >
                  <option value="zoom">Zoom</option>
                  <option value="google-meet">Google Meet</option>
                  <option value="teams">Microsoft Teams</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Meeting Link</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-9"
                    placeholder="Enter meeting URL"
                    value={meetingDetails.meetingLink}
                    onChange={(e) =>
                      setMeetingDetails({ ...meetingDetails, meetingLink: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Meeting ID</Label>
                  <div className="relative">
                    <HashIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      className="pl-9"
                      placeholder="Enter meeting ID"
                      value={meetingDetails.meetingId}
                      onChange={(e) =>
                        setMeetingDetails({ ...meetingDetails, meetingId: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Passcode</Label>
                  <div className="relative">
                    <HashIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      className="pl-9"
                      placeholder="Enter meeting passcode"
                      value={meetingDetails.passcode}
                      onChange={(e) =>
                        setMeetingDetails({ ...meetingDetails, passcode: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Message to Candidate</Label>
                <textarea
                  className="h-32 w-full rounded-md border border-gray-200 p-2"
                  value={meetingDetails.message}
                  onChange={(e) =>
                    setMeetingDetails({ ...meetingDetails, message: e.target.value })
                  }
                  placeholder="Add any additional information or instructions..."
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="office" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      className="pl-9"
                      value={meetingDetails.date}
                      onChange={(e) =>
                        setMeetingDetails({ ...meetingDetails, date: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Time</Label>
                  <div className="relative">
                    <ClockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="time"
                      className="pl-9"
                      value={meetingDetails.time}
                      onChange={(e) =>
                        setMeetingDetails({ ...meetingDetails, time: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Office Location</Label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-9"
                    value={meetingDetails.location}
                    onChange={(e) =>
                      setMeetingDetails({ ...meetingDetails, location: e.target.value })
                    }
                    placeholder="Enter office address"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Instructions</Label>
                <textarea
                  className="h-32 w-full rounded-md border border-gray-200 p-2"
                  value={meetingDetails.message}
                  onChange={(e) =>
                    setMeetingDetails({ ...meetingDetails, message: e.target.value })
                  }
                  placeholder="Add any additional information or instructions..."
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <div className="rounded-lg border bg-gray-50 p-4">
                <div className="mb-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label>Email:</Label>
                    <span>{candidateEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label>Phone/WhatsApp:</Label>
                    <span>{candidatePhone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <textarea
                    className="h-32 w-full rounded-md border border-gray-200 p-2"
                    value={meetingDetails.message}
                    onChange={(e) =>
                      setMeetingDetails({ ...meetingDetails, message: e.target.value })
                    }
                    placeholder="Type your message..."
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <div className="mt-6 flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedTab === 'chat' ? 'Send Message' : 'Schedule Interview'}
              </Button>
            </div>
          </form>
        </Tabs>
      </div>
    </div>
  );
}