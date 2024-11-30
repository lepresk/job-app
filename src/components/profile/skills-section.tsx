import { SkillBadge } from '@/components/skills/skill-badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, StarIcon, TrendingUpIcon } from 'lucide-react';
import type { Skill } from '@/lib/types';

interface SkillsSectionProps {
  skills: Skill[];
  validatedCount: number;
  totalSkills: number;
  averageScore: number;
}

export function SkillsSection({ skills, validatedCount, totalSkills, averageScore }: SkillsSectionProps) {
  const validatedSkills = skills.filter(skill => skill.isValidated);
  const pendingSkills = skills.filter(skill => !skill.isValidated);

  return (
    <div className="space-y-6">
      {/* Skills Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Validated Skills</p>
              <p className="text-2xl font-bold">{validatedCount}/{totalSkills}</p>
            </div>
            <div className="rounded-full bg-green-100 p-2">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Score</p>
              <p className="text-2xl font-bold">{averageScore}%</p>
            </div>
            <div className="rounded-full bg-blue-100 p-2">
              <StarIcon className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Skill Growth</p>
              <p className="text-2xl font-bold">+3</p>
            </div>
            <div className="rounded-full bg-purple-100 p-2">
              <TrendingUpIcon className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Validated Skills */}
      <div className="rounded-lg border bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Validated Skills</h3>
          <Button variant="outline" size="sm" asChild>
            <Link to="/skills">Validate More</Link>
          </Button>
        </div>
        {validatedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {validatedSkills.map((skill) => (
              <SkillBadge key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No validated skills yet. Take skill assessments to validate your expertise.</p>
        )}
      </div>

      {/* Pending Skills */}
      {pendingSkills.length > 0 && (
        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Skills Pending Validation</h3>
          <div className="flex flex-wrap gap-2">
            {pendingSkills.map((skill) => (
              <SkillBadge key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      )}

      {/* Score Distribution */}
      <div className="rounded-lg border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Score Distribution</h3>
        <div className="space-y-4">
          {[
            { range: '90-100%', label: 'Expert' },
            { range: '75-89%', label: 'Advanced' },
            { range: '60-74%', label: 'Intermediate' },
            { range: '0-59%', label: 'Beginner' }
          ].map(({ range, label }) => {
            const count = validatedSkills.filter(s => {
              const score = s.score || 0;
              const [min, max] = range.replace('%', '').split('-').map(Number);
              return score >= min && score <= max;
            }).length;
            const percentage = validatedSkills.length > 0 ? (count / validatedSkills.length) * 100 : 0;
            
            return (
              <div key={range} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{range} ({label})</span>
                  <span>{count} skills</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}