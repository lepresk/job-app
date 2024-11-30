import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon, TrashIcon } from 'lucide-react';

const educationSchema = z.object({
  education: z.array(
    z.object({
      degree: z.string().min(2, 'Degree is required'),
      institution: z.string().min(2, 'Institution name is required'),
      graduationYear: z.number().min(1900).max(new Date().getFullYear() + 5),
    })
  ),
});

type EducationForm = z.infer<typeof educationSchema>;

interface EducationFormProps {
  initialData?: EducationForm['education'];
  onSubmit: (data: EducationForm) => void;
}

export function EducationForm({ initialData = [], onSubmit }: EducationFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EducationForm>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: initialData.length > 0 ? initialData : [
        {
          degree: '',
          institution: '',
          graduationYear: new Date().getFullYear(),
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border p-4">
            <div className="mb-4 flex justify-between">
              <h4 className="text-lg font-semibold">Education {index + 1}</h4>
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
                <Label>Degree</Label>
                <Input {...register(`education.${index}.degree`)} />
                {errors.education?.[index]?.degree && (
                  <p className="text-sm text-red-500">
                    {errors.education[index].degree?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Institution</Label>
                <Input {...register(`education.${index}.institution`)} />
                {errors.education?.[index]?.institution && (
                  <p className="text-sm text-red-500">
                    {errors.education[index].institution?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Graduation Year</Label>
                <Input
                  type="number"
                  {...register(`education.${index}.graduationYear`, {
                    valueAsNumber: true,
                  })}
                />
                {errors.education?.[index]?.graduationYear && (
                  <p className="text-sm text-red-500">
                    {errors.education[index].graduationYear?.message}
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
              degree: '',
              institution: '',
              graduationYear: new Date().getFullYear(),
            })
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Education
        </Button>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Education'}
        </Button>
      </div>
    </form>
  );
}