import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PlusIcon, XIcon } from 'lucide-react';
import { getSkills } from '@/lib/firebase/jobs';
import type { JobSkill } from '@/lib/firebase/jobs';

interface SkillSelectProps {
  value: JobSkill[];
  onChange: (skills: JobSkill[]) => void;
  error?: string;
}

export function SkillSelect({ value, onChange, error }: SkillSelectProps) {
  const [skills, setSkills] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (error) {
        console.error('Error loading skills:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const addSkill = () => {
    onChange([
      ...value,
      {
        id: '',
        name: '',
        experienceLevel: 'beginner',
        yearsRequired: '',
      },
    ]);
  };

  const removeSkill = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: keyof JobSkill, newValue: string) => {
    const newSkills = [...value];
    newSkills[index] = {
      ...newSkills[index],
      [field]: newValue,
    };
    if (field === 'name') {
      const selectedSkill = skills.find(s => s.id === newValue);
      if (selectedSkill) {
        newSkills[index].id = selectedSkill.id;
      }
    }
    onChange(newSkills);
  };

  if (isLoading) {
    return <div>Loading skills...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Required Skills</Label>
        <Button type="button" variant="outline" size="sm" onClick={addSkill}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {value.map((skill, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className="grid flex-1 gap-4 md:grid-cols-3">
            <div>
              <select
                className="w-full rounded-md border border-gray-200 p-2"
                value={skill.id}
                onChange={(e) => updateSkill(index, 'name', e.target.value)}
              >
                <option value="">Select a skill</option>
                {skills.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                className="w-full rounded-md border border-gray-200 p-2"
                value={skill.experienceLevel}
                onChange={(e) => updateSkill(index, 'experienceLevel', e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div>
              <input
                type="text"
                className="w-full rounded-md border border-gray-200 p-2"
                placeholder="Years required"
                value={skill.yearsRequired}
                onChange={(e) => updateSkill(index, 'yearsRequired', e.target.value)}
              />
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeSkill(index)}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}