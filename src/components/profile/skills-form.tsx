import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon, TrashIcon, CheckCircleIcon } from 'lucide-react';
import { useState } from 'react';

const skillsSchema = z.object({
  skills: z.array(
    z.object({
      name: z.string().min(2, 'Skill name is required'),
      score: z.number().min(0).max(100).optional(),
      isValidated: z.boolean().default(false),
      validatedAt: z.date().optional(),
      yearsOfExperience: z.number().min(0, 'Years must be positive'),
    })
  ),
});

type SkillsForm = z.infer<typeof skillsSchema>;

interface SkillsFormProps {
  initialData?: SkillsForm['skills'];
  onSubmit: (data: SkillsForm) => void;
}

export function SkillsForm({ initialData = [], onSubmit }: SkillsFormProps) {
  const [showValidation, setShowValidation] = useState<number | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SkillsForm>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: initialData.length > 0 ? initialData : [
        {
          name: '',
          score: 0,
          isValidated: false,
          yearsOfExperience: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const handleValidation = (index: number) => {
    setShowValidation(index);
    // In a real app, this would trigger the validation assessment
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border p-4">
            <div className="mb-4 flex justify-between">
              <h4 className="text-lg font-semibold">Skill {index + 1}</h4>
              <div className="flex space-x-2">
                {field.isValidated ? (
                  <div className="flex items-center space-x-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
                    <CheckCircleIcon className="h-4 w-4" />
                    <span>Validated ({field.score}%)</span>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleValidation(index)}
                  >
                    Validate Skill
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Skill Name</Label>
                <Input {...register(`skills.${index}.name`)} />
                {errors.skills?.[index]?.name && (
                  <p className="text-sm text-red-500">
                    {errors.skills[index].name?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Years of Experience</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  {...register(`skills.${index}.yearsOfExperience`, {
                    valueAsNumber: true,
                  })}
                />
                {errors.skills?.[index]?.yearsOfExperience && (
                  <p className="text-sm text-red-500">
                    {errors.skills[index].yearsOfExperience?.message}
                  </p>
                )}
              </div>
            </div>

            {showValidation === index && (
              <div className="mt-4 rounded-lg bg-blue-50 p-4">
                <h5 className="mb-2 font-medium">Skill Validation</h5>
                <p className="mb-4 text-sm text-gray-600">
                  Complete a quick assessment to validate your proficiency in this skill.
                  The assessment typically takes 5-10 minutes.
                </p>
                <div className="flex space-x-2">
                  <Button size="sm">Start Assessment</Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowValidation(null)}
                  >
                    Later
                  </Button>
                </div>
              </div>
            )}
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
              name: '',
              score: 0,
              isValidated: false,
              yearsOfExperience: 0,
            })
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Skill
        </Button>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Skills'}
        </Button>
      </div>
    </form>
  );
}