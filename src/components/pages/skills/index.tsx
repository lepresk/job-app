import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SkillAssessment } from '@/components/skills/skill-assessment';
import { SkillBadge } from '@/components/skills/skill-badge';
import { BookIcon, CheckCircleIcon } from 'lucide-react';

const availableSkills = [
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'Java',
  'SQL',
  'TypeScript',
  'HTML/CSS',
];

export function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [validatedSkills, setValidatedSkills] = useState([
    { id: '1', name: 'JavaScript', isValidated: true },
    { id: '2', name: 'React', isValidated: true },
  ]);

  const handleSkillSelect = (skill: string) => {
    setSelectedSkill(skill);
  };

  const handleAssessmentComplete = ({ passed, score }) => {
    if (passed && selectedSkill) {
      setValidatedSkills([
        ...validatedSkills,
        { id: Date.now().toString(), name: selectedSkill, isValidated: true },
      ]);
    }
    setSelectedSkill(null);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Skills Assessment</h1>
        <p className="mt-2 text-gray-600">
          Validate your skills through quick assessments to improve your job matches
        </p>
      </div>

      {selectedSkill ? (
        <div className="rounded-lg border bg-white p-6">
          <SkillAssessment
            skill={selectedSkill}
            onComplete={handleAssessmentComplete}
          />
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {/* Available Skills */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 flex items-center text-xl font-semibold">
              <BookIcon className="mr-2 h-5 w-5 text-blue-600" />
              Available Assessments
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {availableSkills.map((skill) => {
                const isValidated = validatedSkills.some((vs) => vs.name === skill);
                return (
                  <div
                    key={skill}
                    className="rounded-lg border p-4 transition-colors hover:border-blue-500"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">{skill}</span>
                      {isValidated ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleSkillSelect(skill)}
                        >
                          Start
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {isValidated
                        ? 'Skill validated'
                        : '5-minute assessment to validate your skill'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Validated Skills */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 flex items-center text-xl font-semibold">
              <CheckCircleIcon className="mr-2 h-5 w-5 text-green-600" />
              Your Validated Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {validatedSkills.map((skill) => (
                <SkillBadge key={skill.id} skill={skill} />
              ))}
            </div>
            {validatedSkills.length === 0 && (
              <p className="text-gray-600">
                No skills validated yet. Complete assessments to validate your skills.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}