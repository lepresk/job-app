import { CheckCircleIcon } from 'lucide-react';
import type { Skill } from '@/lib/types';

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <div
      className={`flex items-center space-x-1 rounded-full px-3 py-1 ${
        skill.isValidated
          ? 'bg-green-100 text-green-600'
          : 'bg-gray-100 text-gray-600'
      }`}
    >
      {skill.isValidated && <CheckCircleIcon className="h-4 w-4" />}
      <span className="text-sm">{skill.name}</span>
    </div>
  );
}