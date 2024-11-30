import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon, TrashIcon } from 'lucide-react';

const hobbiesSchema = z.object({
  hobbies: z.array(
    z.object({
      name: z.string().min(2, 'Hobby name is required'),
      description: z.string().optional(),
    })
  ),
});

type HobbiesForm = z.infer<typeof hobbiesSchema>;

interface HobbiesFormProps {
  initialData?: HobbiesForm['hobbies'];
  onSubmit: (data: HobbiesForm) => void;
}

export function HobbiesForm({ initialData = [], onSubmit }: HobbiesFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HobbiesForm>({
    resolver: zodResolver(hobbiesSchema),
    defaultValues: {
      hobbies: initialData.length > 0 ? initialData : [{ name: '', description: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hobbies',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border p-4">
            <div className="mb-4 flex justify-between">
              <h4 className="text-lg font-semibold">Hobby {index + 1}</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Hobby Name</Label>
                <Input {...register(`hobbies.${index}.name`)} />
                {errors.hobbies?.[index]?.name && (
                  <p className="text-sm text-red-500">
                    {errors.hobbies[index].name?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <textarea
                  className="h-24 w-full rounded-md border border-gray-200 p-2"
                  {...register(`hobbies.${index}.description`)}
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
          onClick={() => append({ name: '', description: '' })}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Hobby
        </Button>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Hobbies'}
        </Button>
      </div>
    </form>
  );
}