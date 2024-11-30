import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MailIcon, LockIcon } from 'lucide-react';
import { loginSchema } from '@/lib/auth/validation';
import type { LoginCredentials } from '@/lib/auth/types';

interface LoginFormProps {
  role: 'jobseeker' | 'recruiter';
  onSubmit: (data: LoginCredentials) => void;
  isSubmitting: boolean;
  error?: string;
}

export function LoginForm({ role, onSubmit, isSubmitting, error }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Label htmlFor="email" className="mb-1 block">
            {role === 'recruiter' ? 'Company Email' : 'Email Address'}
          </Label>
          <div className="relative">
            <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              className="pl-10"
              placeholder={role === 'recruiter' ? 'company@example.com' : 'you@example.com'}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="password" className="mb-1 block">
            Password
          </Label>
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
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : `Sign in as ${role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}`}
      </Button>
    </form>
  );
}