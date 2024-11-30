import { Avatar } from '@/components/profile/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getProfileStrengthColor, getProfileStrengthMessage } from '@/lib/utils/profile-completion';

interface ProfileHeaderProps {
  name: string;
  imageUrl?: string;
  location: string;
  completionPercentage: number;
  onImageChange: (file: File) => void;
}

export function ProfileHeader({
  name,
  imageUrl,
  location,
  completionPercentage,
  onImageChange,
}: ProfileHeaderProps) {
  const strengthColor = getProfileStrengthColor(completionPercentage);
  const strengthMessage = getProfileStrengthMessage(completionPercentage);

  return (
    <div className="relative mb-8 overflow-hidden rounded-xl border bg-white">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 md:h-48" />

      <div className="p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          {/* Avatar and Basic Info */}
          <div className="flex items-end space-x-6">
            <div className="-mt-20 shrink-0">
              <Avatar
                imageUrl={imageUrl}
                name={name}
                size="lg"
                onImageChange={onImageChange}
                editable
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="text-gray-600">{location}</p>
            </div>
          </div>

          {/* Profile Completion and Actions */}
          <div className="flex w-full items-center justify-between gap-4 md:w-auto">
            <div className="flex items-center space-x-4">
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-blue-100">
                <div className={`text-xl font-bold ${strengthColor}`}>
                  {completionPercentage}%
                </div>
              </div>
              <div>
                <div className={`font-medium ${strengthColor}`}>Profile Strength</div>
                <div className="text-sm text-gray-600">{strengthMessage}</div>
              </div>
            </div>
            <Button asChild>
              <Link to="/profile/edit">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}