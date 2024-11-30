import { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function SectionCard({ title, icon, children }: SectionCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-6 flex items-center space-x-3">
        <div className="rounded-full bg-blue-100 p-2 text-blue-600">
          {icon}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}