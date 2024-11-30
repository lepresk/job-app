import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon, TrashIcon } from 'lucide-react';

const experienceSchema = z.object({
  experience: z.array(
    z.object({
      title: z.string().min(2, 'Job title is required'),
      company: z.string().min(2, 'Company name is required'),
      startDate: z.string().min(1, 'Start date is required'),
      endDate: z.string().optional(),
      description: z.string().min(10, 'Please provide a brief description'),
    })
  ),
});

type ExperienceForm = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  initialData?: ExperienceForm['experience'];
  onSubmit: (data: ExperienceForm) => void;
}

export function ExperienceForm({ initialData = [], onSubmit }: ExperienceFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceForm>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experience: initialData.length > 0 ? initialData : [
        {
          title: '',
          company: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border p-4">
            <div className="mb-4 flex justify-between">
              <h4 className="text-lg font-semibold">Experience {index + 1}</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input {...register(`experience.${index}.title`)} />
                {errors.experience?.[index]?.title && (
                  <p className="text-sm text-red-500">
                    {errors.experience[index].title?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Company</Label>
                <Input {...register(`experience.${index}.company`)} />
                {errors.experience?.[index]?.company && (
                  <p className="text-sm text-red-500">
                    {errors.experience[index].company?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  {...register(`experience.${index}.startDate`)}
                />
                {errors.experience?.[index]?.startDate && (
                  <p className="text-sm text-red-500">
                    {errors.experience[index].startDate?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  {...register(`experience.${index}.endDate`)}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Description</Label>
                <textarea
                  className="h-24 w-full rounded-md border border-gray-200 p-2"
                  {...register(`experience.${index}.description`)}
                />
                {errors.experience?.[index]?.description && (
                  <p className="text-sm text-red-500">
                    {errors.experience[index].description?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() =>
            append({
              title: '',
              company: '',
              startDate: '',
              endDate: '',
              description: '',
            })
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Experience
        </Button>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Experience'}
        </Button>
      </div>
    </form>
  );
}