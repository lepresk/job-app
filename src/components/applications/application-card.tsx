import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InteractionModal } from './interaction-modal';
import { RejectionModal } from './rejection-modal';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  StarIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  VideoIcon,
  BuildingIcon,
  MessageSquareIcon,
} from 'lucide-react';

interface ApplicationCardProps {
  application: {
    id: string;
    jobId: string;
    jobTitle: string;
    candidate: {
      id: string;
      name: string;
      email: string;
      phone: string;
      experience: string;
      matchScore: number;
      appliedDate: Date;
    };
    status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  };
  onStatusChange: (applicationId: string, newStatus: string) => void;
}

export function ApplicationCard({ application, onStatusChange }: ApplicationCardProps) {
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'reviewing':
        return 'bg-blue-100 text-blue-600';
      case 'shortlisted':
        return 'bg-green-100 text-green-600';
      case 'rejected':
        return 'bg-red-100 text-red-600';
      case 'hired':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-4 w-4" />;
      case 'reviewing':
        return <StarIcon className="h-4 w-4" />;
      case 'shortlisted':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'rejected':
        return <XCircleIcon className="h-4 w-4" />;
      case 'hired':
        return <CheckCircleIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="p-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          {/* Application Info */}
          <div className="flex-grow space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-semibold">
                    {application.candidate.name}
                  </h3>
                  <span
                    className={`flex items-center space-x-1 rounded-full px-3 py-1 text-sm ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {getStatusIcon(application.status)}
                    <span className="capitalize">{application.status}</span>
                  </span>
                </div>
                <p className="text-gray-600">Applied for {application.jobTitle}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <span className="text-sm font-bold text-green-600">
                    {application.candidate.matchScore}%
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">Match Score</div>
                  <div className="text-xs text-gray-500">Based on skills</div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center space-x-2">
                <MailIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{application.candidate.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{application.candidate.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">
                  Applied {application.candidate.appliedDate.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 flex-col gap-2">
            <Button
              className="w-full"
              onClick={() => setShowInteractionModal(true)}
            >
              <VideoIcon className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowInteractionModal(true)}
            >
              <BuildingIcon className="mr-2 h-4 w-4" />
              Office Meeting
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowInteractionModal(true)}
            >
              <MessageSquareIcon className="mr-2 h-4 w-4" />
              Start Chat
            </Button>
            <Button
              variant="outline"
              className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => setShowRejectionModal(true)}
            >
              <XCircleIcon className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        </div>
      </div>

      <InteractionModal
        isOpen={showInteractionModal}
        onClose={() => setShowInteractionModal(false)}
        candidateName={application.candidate.name}
        candidateEmail={application.candidate.email}
        candidatePhone={application.candidate.phone}
      />

      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        candidateName={application.candidate.name}
      />
    </div>
  );
}