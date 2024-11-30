import { LucideIcon } from 'lucide-react';
import { getProfileStrengthColor, getProfileStrengthMessage } from '@/lib/utils/profile-completion';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  isProfileStrength?: boolean;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  iconBgColor,
  isProfileStrength = false,
}: StatsCardProps) {
  const strengthColor = isProfileStrength ? getProfileStrengthColor(Number(value)) : '';
  const strengthMessage = isProfileStrength ? getProfileStrengthMessage(Number(value)) : '';

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${iconBgColor}`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className="mt-2">
        <p className="flex items-end">
          <span className={`text-3xl font-bold ${isProfileStrength ? strengthColor : 'text-gray-900'}`}>
            {value}
            {isProfileStrength && '%'}
          </span>
          {change && <span className="ml-2 text-sm text-green-600">{change}</span>}
        </p>
        {isProfileStrength && (
          <p className="mt-1 text-sm text-gray-600">{strengthMessage}</p>
        )}
      </div>
    </div>
  );
}