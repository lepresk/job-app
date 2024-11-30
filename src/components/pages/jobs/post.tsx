import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/store';
import { JobForm } from '@/components/jobs/job-form';
import { Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
import { BriefcaseIcon, AlertCircleIcon } from 'lucide-react';
import { createJob } from '@/lib/firebase/jobs';
import type { JobPosting } from '@/lib/firebase/jobs';

export function PostJobPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: Omit<JobPosting, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const jobData = {
        ...data,
        recruiterId: user.id,
        company: user.company || '',
        status: 'active' as const,
      };

      await createJob(jobData);
      setShowToast(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error posting job:', err);
      setError('Failed to post job. Please try again.');
    }
  };

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-blue-100 p-3">
              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Post a New Job</h1>
              <p className="mt-1 text-gray-600">
                Create a detailed job posting to find the perfect candidate
              </p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mb-8 rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-blue-100 p-2">
              <AlertCircleIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-blue-900">Tips for a Great Job Posting</h2>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>• Be specific about required skills and experience</li>
                <li>• Include salary range to attract relevant candidates</li>
                <li>• Clearly describe day-to-day responsibilities</li>
                <li>• Highlight growth opportunities and benefits</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Job Form */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <JobForm onSubmit={handleSubmit} />
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <Toast>
          <ToastTitle>Success!</ToastTitle>
          <ToastDescription>
            Your job has been posted successfully. Redirecting to dashboard...
          </ToastDescription>
        </Toast>
      )}

      {/* Error Toast */}
      {error && (
        <Toast>
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>{error}</ToastDescription>
        </Toast>
      )}
    </div>
  );
}