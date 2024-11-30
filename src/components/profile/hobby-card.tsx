import { HeartIcon } from 'lucide-react';

interface HobbyCardProps {
  name: string;
  description?: string;
}

export function HobbyCard({ name, description }: HobbyCardProps) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <div className="mb-2 flex items-center space-x-2">
        <HeartIcon className="h-4 w-4 text-pink-500" />
        <h3 className="font-semibold">{name}</h3>
      </div>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
}