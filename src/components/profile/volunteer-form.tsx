import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon, TrashIcon } from 'lucide-react';

const volunteerSchema = z.object({
  volunteer: z.array(
    z.object({
      organization: z.string().min(2, 'Organization name is required'),
      role: z.string().min(2, 'Role is required'),
      startDate: z.string().min(1, 'Start date is required'),
      endDate: z.string().optional(),
      description: z.string().min(10, 'Please provide a brief description'),
      achievements: z.string().optional(),
    })
  ),
});

type VolunteerForm = z.infer<typeof volunteerSchema>;

interface VolunteerFormProps {
  initialData?: VolunteerForm['volunteer'];
  onSubmit: (data: VolunteerForm) => void;
}

export function VolunteerForm({ initialData = [], onSubmit }: VolunteerFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerForm>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      volunteer: initialData.length > 0 ? initialData : [
        {
          organization: '',
          role: '',
          startDate: '',
          endDate: '',
          description: '',
          achievements: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'volunteer',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border p-4">
            <div className="mb-4 flex justify-between">
              <h4 className="text-lg font-semibold">Volunteer Experience {index + 1}</h4>
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
                <Label>Organization</Label>
                <Input {...register(`volunteer.${index}.organization`)} />
                {errors.volunteer?.[index]?.organization && (
                  <p className="text-sm text-red-500">
                    {errors.volunteer[index].organization?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Input {...register(`volunteer.${index}.role`)} />
                {errors.volunteer?.[index]?.role && (
                  <p className="text-sm text-red-500">
                    {errors.volunteer[index].role?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  {...register(`volunteer.${index}.startDate`)}
                />
                {errors.volunteer?.[index]?.startDate && (
                  <p className="text-sm text-red-500">
                    {errors.volunteer[index].startDate?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>End Date (Optional)</Label>
                <Input
                  type="date"
                  {...register(`volunteer.${index}.endDate`)}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Description</Label>
                <textarea
                  className="h-24 w-full rounded-md border border-gray-200 p-2"
                  {...register(`volunteer.${index}.description`)}
                />
                {errors.volunteer?.[index]?.description && (
                  <p className="text-sm text-red-500">
                    {errors.volunteer[index].description?.message}
                  </p>
                )}
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Achievements (Optional)</Label>
                <textarea
                  className="h-24 w-full rounded-md border border-gray-200 p-2"
                  {...register(`volunteer.${index}.achievements`)}
                  placeholder="List your key achievements and contributions..."
                />
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
              organization: '',
              role: '',
              startDate: '',
              endDate: '',
              description: '',
              achievements: '',
            })
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Volunteer Experience
        </Button>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Volunteer Experience'}
        </Button>
      </div>
    </form>
  );
}