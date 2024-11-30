import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BriefcaseIcon, BuildingIcon, UserIcon, MailIcon, LockIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/auth/validation';
import { useAuthStore } from '@/lib/store';
import { loginUser } from '@/lib/firebase/auth';
import type { LoginCredentials } from '@/lib/auth/types';

export function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'jobseeker' | 'recruiter'>('jobseeker');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: selectedRole,
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await loginUser({ ...data, role: selectedRole });

      if (response.success && response.user) {
        setUser(response.user);
        navigate('/dashboard');
      } else {
        setError(response.error?.message || 'Invalid email or password');
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
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">
              Sign in to your Cowema Jobs account
            </p>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="p-8">
              <div className="mb-6">
                <Label className="mb-3 block">I am a</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`flex items-center justify-center space-x-2 rounded-lg border p-4 transition-colors ${
                      selectedRole === 'jobseeker'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRole('jobseeker')}
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Job Seeker</span>
                  </button>
                  <button
                    type="button"
                    className={`flex items-center justify-center space-x-2 rounded-lg border p-4 transition-colors ${
                      selectedRole === 'recruiter'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRole('recruiter')}
                  >
                    <BuildingIcon className="h-5 w-5" />
                    <span>Recruiter</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10"
                        placeholder="••••••••"
                        {...register('password')}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Link
                    to="/reset-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                    Create one now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}