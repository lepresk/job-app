import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MailIcon, RefreshCwIcon } from 'lucide-react';
import { auth } from '@/lib/firebase/config';
import { resendVerificationEmail } from '@/lib/firebase/auth';
import { Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.emailVerified) {
        navigate('/dashboard');
      } else if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleResendEmail = async () => {
    if (!auth.currentUser) return;

    setIsResending(true);
    const response = await resendVerificationEmail(auth.currentUser);
    setIsResending(false);

    if (response.success) {
      setToastMessage('Verification email sent successfully');
    } else {
      setToastMessage(response.error?.message || 'Failed to send verification email');
    }
    setShowToast(true);
  };

  const handleRefresh = () => {
    auth.currentUser?.reload().then(() => {
      if (auth.currentUser?.emailVerified) {
        navigate('/dashboard');
      } else {
        setToastMessage('Email not verified yet. Please check your inbox.');
        setShowToast(true);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg bg-white p-8 shadow-xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <MailIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold">Verify Your Email</h1>
              <p className="mt-2 text-gray-600">
                We've sent a verification email to your inbox. Please verify your email to continue.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleResendEmail}
                className="w-full"
                disabled={isResending}
              >
                {isResending ? 'Sending...' : 'Resend Verification Email'}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleRefresh}
              >
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Check Verification Status
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast>
          <ToastTitle>Notification</ToastTitle>
          <ToastDescription>{toastMessage}</ToastDescription>
        </Toast>
      )}
    </div>
  );
}