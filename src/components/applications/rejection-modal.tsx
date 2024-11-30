import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { XIcon } from 'lucide-react';

interface RejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
}

export function RejectionModal({
  isOpen,
  onClose,
  candidateName,
}: RejectionModalProps) {
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the rejection
    console.log('Rejection details:', { reason, feedback });
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

        <h2 className="mb-6 text-2xl font-bold">Reject Application</h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to reject {candidateName}'s application?
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Reason for Rejection</Label>
            <select
              className="w-full rounded-md border border-gray-200 p-2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="">Select a reason</option>
              <option value="not-qualified">Not qualified for the position</option>
              <option value="experience">Insufficient experience</option>
              <option value="skills-mismatch">Skills mismatch</option>
              <option value="position-filled">Position already filled</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Feedback (Optional)</Label>
            <textarea
              className="h-32 w-full rounded-md border border-gray-200 p-2"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide constructive feedback to the candidate..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Reject Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}