import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, MailIcon } from 'lucide-react';
import { resetPassword } from '@/lib/firebase/auth';

const resetSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ResetForm = z.infer<typeof resetSchema>;

export function ResetPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetForm) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await resetPassword(data.email);

      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.error?.message || 'An error occurred');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-blue-100 p-3">
                <BriefcaseIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
            <p className="mt-2 text-gray-600">
              Enter your email address to reset your password
            </p>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="p-8">
              {success ? (
                <div className="text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-3 inline-block">
                    <MailIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Check Your Email</h3>
                  <p className="text-gray-600 mb-6">
                    We've sent password reset instructions to your email address.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/login">Return to Login</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        placeholder="you@example.com"
                        {...register('email')}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  {error && (
                    <div className="rounded-md bg-red-50 p-4">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending Reset Link...' : 'Reset Password'}
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    Remember your password?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                      Sign in
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}