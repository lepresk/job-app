import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CountryCitySelect } from '@/components/location/country-city-select';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/lib/store';
import { registerUser } from '@/lib/firebase/auth';
import { BriefcaseIcon, UserIcon, BuildingIcon, MailIcon, LockIcon, PhoneIcon } from 'lucide-react';
import { Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['jobseeker', 'recruiter']),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  company: z.string().optional().or(z.string().min(2, 'Company name must be at least 2 characters')),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).optional(),
  industry: z.string().optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'jobseeker',
    },
  });

  const selectedRole = watch('role');
  const selectedCountry = watch('country');
  const selectedCity = watch('city');

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError(null);
      const response = await registerUser(data);
      
      if (response.success && response.user) {
        navigate('/verify-email');
      } else {
        setError(response.error?.message || 'Registration failed');
      }
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
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
            <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
            <p className="mt-2 text-gray-600">
              Join Cowema Jobs and start your professional journey
            </p>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="mb-1 block">
                      I am a
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        className={`flex items-center justify-center space-x-2 rounded-lg border p-4 transition-colors ${
                          selectedRole === 'jobseeker'
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setValue('role', 'jobseeker')}
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
                        onClick={() => setValue('role', 'recruiter')}
                      >
                        <BuildingIcon className="h-5 w-5" />
                        <span>Recruiter</span>
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="name" className="mb-1 block">
                      {selectedRole === 'recruiter' ? 'Contact Person Name' : 'Full Name'}
                    </Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="name"
                        className="pl-10"
                        placeholder={selectedRole === 'recruiter' ? 'Contact Person Name' : 'Your Full Name'}
                        {...register('name')}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <Label htmlFor="email" className="mb-1 block">
                      Email Address
                    </Label>
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

                  <div className="relative">
                    <Label htmlFor="phone" className="mb-1 block">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        className="pl-10"
                        placeholder="+242 XX XXX XXXX"
                        {...register('phone')}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  <CountryCitySelect
                    selectedCountry={selectedCountry}
                    selectedCity={selectedCity}
                    onCountryChange={(country) => setValue('country', country)}
                    onCityChange={(city) => setValue('city', city)}
                    error={{
                      country: errors.country?.message,
                      city: errors.city?.message,
                    }}
                  />

                  {selectedRole === 'recruiter' && (
                    <>
                      <div className="relative">
                        <Label htmlFor="company" className="mb-1 block">
                          Company Name
                        </Label>
                        <div className="relative">
                          <BuildingIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="company"
                            className="pl-10"
                            placeholder="Company Name"
                            {...register('company')}
                          />
                        </div>
                        {errors.company && (
                          <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
                        )}
                      </div>

                      <div className="relative">
                        <Label htmlFor="companySize" className="mb-1 block">
                          Company Size
                        </Label>
                        <select
                          id="companySize"
                          className="w-full rounded-md border border-gray-200 p-2"
                          {...register('companySize')}
                        >
                          <option value="">Select company size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                      </div>

                      <div className="relative">
                        <Label htmlFor="industry" className="mb-1 block">
                          Industry
                        </Label>
                        <Input
                          id="industry"
                          placeholder="e.g., Technology, Healthcare, Finance"
                          {...register('industry')}
                        />
                      </div>
                    </>
                  )}
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast>
          <ToastTitle>Success!</ToastTitle>
          <ToastDescription>
            Your account has been created successfully. Please check your email to verify your account.
          </ToastDescription>
        </Toast>
      )}
    </div>
  );
}