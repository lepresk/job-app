import { SkillBadge } from '@/components/skills/skill-badge';
import type { Skill } from '@/lib/types';

interface SkillBadgeGroupProps {
  skills: Skill[];
  title: string;
}

export function SkillBadgeGroup({ skills, title }: SkillBadgeGroupProps) {
  return (
    <div>
      <h3 className="mb-3 font-medium text-gray-700">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillBadge key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}