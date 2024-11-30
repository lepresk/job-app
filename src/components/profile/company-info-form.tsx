import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const companyInfoSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  industry: z.string().min(2, 'Industry is required'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
  website: z.string().url('Please enter a valid URL'),
  founded: z.string().min(4, 'Please enter a valid year'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  // Contact Information
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter a valid address'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
});

type CompanyInfoForm = z.infer<typeof companyInfoSchema>;

interface CompanyInfoFormProps {
  initialData?: Partial<CompanyInfoForm>;
  onSubmit: (data: CompanyInfoForm) => void;
}

export function CompanyInfoForm({ initialData, onSubmit }: CompanyInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyInfoForm>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Company Basic Information */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Company Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" {...register('companyName')} />
            {errors.companyName && (
              <p className="text-sm text-red-500">{errors.companyName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" {...register('industry')} />
            {errors.industry && (
              <p className="text-sm text-red-500">{errors.industry.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <select
              id="companySize"
              {...register('companySize')}
              className="w-full rounded-md border border-gray-200 p-2"
            >
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
            {errors.companySize && (
              <p className="text-sm text-red-500">{errors.companySize.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input 
              id="website" 
              {...register('website')} 
              placeholder="https://www.example.com"
            />
            {errors.website && (
              <p className="text-sm text-red-500">{errors.website.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="founded">Founded Year</Label>
            <Input 
              id="founded" 
              {...register('founded')} 
              placeholder="YYYY"
            />
            {errors.founded && (
              <p className="text-sm text-red-500">{errors.founded.message}</p>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="description">Company Description</Label>
          <textarea
            id="description"
            {...register('description')}
            className="h-32 w-full rounded-md border border-gray-200 p-2"
            placeholder="Tell us about your company..."
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Company Email</Label>
            <Input 
              id="email" 
              type="email" 
              {...register('email')} 
              placeholder="company@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              {...register('phone')} 
              placeholder="+242 XX XXX XXXX"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              {...register('address')} 
              placeholder="123 Business Street"
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              {...register('city')} 
              placeholder="City"
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input 
              id="country" 
              {...register('country')} 
              placeholder="Country"
            />
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country.message}</p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Company Information'}
      </Button>
    </form>
  );
}