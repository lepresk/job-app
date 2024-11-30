import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SkillSelect } from './skill-select';
import { BenefitSelect } from './benefit-select';
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  ClockIcon, 
  DollarSignIcon,
  ListIcon,
  GraduationCapIcon,
  BuildingIcon
} from 'lucide-react';
import type { JobPosting, JobSkill } from '@/lib/firebase/jobs';

const jobSchema = z.object({
  title: z.string().min(3, 'Job title must be at least 3 characters'),
  location: z.string().min(2, 'Location is required'),
  type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
  workplaceType: z.enum(['on-site', 'hybrid', 'remote']),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  responsibilities: z.string().min(50, 'Please list key responsibilities'),
  requirements: z.string().min(50, 'Please list job requirements'),
  skills: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'Skill name is required'),
    experienceLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
    yearsRequired: z.string().min(1, 'Years of experience is required'),
  })).min(1, 'At least one skill is required'),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead']),
  salary: z.object({
    min: z.number().positive('Minimum salary is required'),
    max: z.number().positive('Maximum salary is required'),
    currency: z.string(),
  }),
  benefits: z.array(z.string()).min(1, 'At least one benefit is required'),
});

type JobFormData = z.infer<typeof jobSchema>;

interface JobFormProps {
  onSubmit: (data: JobFormData) => void;
  initialData?: Partial<JobPosting>;
}

export function JobForm({ onSubmit, initialData }: JobFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      type: 'full-time',
      workplaceType: 'on-site',
      experienceLevel: 'mid',
      salary: {
        currency: 'USD',
        min: 0,
        max: 0,
      },
      skills: [],
      benefits: [],
      ...initialData,
    },
  });

  const handleSkillsChange = (skills: JobSkill[]) => {
    setValue('skills', skills, { shouldValidate: true });
  };

  const handleBenefitsChange = (benefits: string[]) => {
    setValue('benefits', benefits, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <div className="relative">
              <BriefcaseIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="title"
                className="pl-9"
                placeholder="e.g., Senior Software Engineer"
                {...register('title')}
              />
            </div>
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                className="pl-9"
                placeholder="e.g., Brazzaville"
                {...register('location')}
              />
            </div>
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Employment Type</Label>
            <div className="relative">
              <ClockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                id="type"
                {...register('type')}
                className="w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 py-2"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workplaceType">Workplace Type</Label>
            <div className="relative">
              <BuildingIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                id="workplaceType"
                {...register('workplaceType')}
                className="w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 py-2"
              >
                <option value="on-site">On-site</option>
                <option value="hybrid">Hybrid</option>
                <option value="remote">Remote</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Job Details</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <textarea
              id="description"
              {...register('description')}
              className="h-32 w-full rounded-md border border-gray-200 p-3"
              placeholder="Provide a detailed description of the role..."
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Key Responsibilities</Label>
            <textarea
              id="responsibilities"
              {...register('responsibilities')}
              className="h-32 w-full rounded-md border border-gray-200 p-3"
              placeholder="List the main responsibilities and duties..."
            />
            {errors.responsibilities && (
              <p className="text-sm text-red-500">{errors.responsibilities.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <textarea
              id="requirements"
              {...register('requirements')}
              className="h-32 w-full rounded-md border border-gray-200 p-3"
              placeholder="List required qualifications and experience..."
            />
            {errors.requirements && (
              <p className="text-sm text-red-500">{errors.requirements.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Skills and Experience */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Skills and Experience</h2>
        <div className="space-y-6">
          <SkillSelect
            value={watch('skills')}
            onChange={handleSkillsChange}
            error={errors.skills?.message}
          />

          <div className="space-y-2">
            <Label htmlFor="experienceLevel">Overall Experience Level</Label>
            <div className="relative">
              <GraduationCapIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                id="experienceLevel"
                {...register('experienceLevel')}
                className="w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 py-2"
              >
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead / Manager</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Compensation */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Compensation</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="salary.currency">Currency</Label>
            <div className="relative">
              <DollarSignIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                id="salary.currency"
                {...register('salary.currency')}
                className="w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 py-2"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="XAF">XAF</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary.min">Minimum Salary</Label>
            <Input
              id="salary.min"
              type="number"
              {...register('salary.min', { valueAsNumber: true })}
            />
            {errors.salary?.min && (
              <p className="text-sm text-red-500">{errors.salary.min.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary.max">Maximum Salary</Label>
            <Input
              id="salary.max"
              type="number"
              {...register('salary.max', { valueAsNumber: true })}
            />
            {errors.salary?.max && (
              <p className="text-sm text-red-500">{errors.salary.max.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Benefits</h2>
        <BenefitSelect
          value={watch('benefits')}
          onChange={handleBenefitsChange}
          error={errors.benefits?.message}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Posting Job...' : 'Post Job'}
      </Button>
    </form>
  );
}