interface SkillMatchProps {
  skills: Array<{
    name: string;
    matchScore: number;
  }>;
}

export function SkillMatch({ skills }: SkillMatchProps) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Skill Match Analysis</h2>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{skill.name}</span>
              <span className="font-semibold">{skill.matchScore}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${skill.matchScore}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}