import { UserIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AvatarProps {
  imageUrl?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  onImageChange?: (file: File) => void;
  editable?: boolean;
}

export function Avatar({ imageUrl, name, size = 'md', onImageChange, editable = false }: AvatarProps) {
  const [previewUrl, setPreviewUrl] = useState(imageUrl);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  };

  return (
    <div className="relative inline-block">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-gray-100`}
        >
          <UserIcon className="h-1/2 w-1/2 text-gray-400" />
        </div>
      )}
      {editable && (
        <label
          htmlFor="avatar-upload"
          className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-1 shadow-lg transition-colors hover:bg-gray-50"
        >
          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 w-8 rounded-full p-0"
          >
            <UserIcon className="h-4 w-4" />
          </Button>
        </label>
      )}
    </div>
  );
}