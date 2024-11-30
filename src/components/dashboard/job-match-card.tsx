import { Button } from '@/components/ui/button';
import { BookmarkIcon } from 'lucide-react';

interface JobMatchCardProps {
  title: string;
  company: string;
  matchScore: number;
  skills: string[];
  location: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  onApply: () => void;
  onSave: () => void;
}

export function JobMatchCard({
  title,
  company,
  matchScore,
  skills,
  location,
  salary,
  onApply,
  onSave,
}: JobMatchCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-gray-600">{company}</p>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>{location}</span>
            {salary && (
              <span>
                {salary.currency} {salary.min.toLocaleString()} - {salary.max.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="mb-4 flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <span className="text-sm font-bold text-green-600">{matchScore}%</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-600">Match Score</div>
              <div className="text-xs text-gray-500">Based on skills</div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={onApply}>Apply Now</Button>
            <Button variant="outline" onClick={onSave}>
              <BookmarkIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}