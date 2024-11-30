interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description?: string;
  achievements?: string;
}

export function TimelineItem({
  title,
  subtitle,
  date,
  description,
  achievements,
}: TimelineItemProps) {
  return (
    <div className="relative border-l-2 border-blue-600 pl-4">
      <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-blue-600 bg-white" />
      <div className="mb-8">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
        <p className="mt-1 text-sm text-gray-500">{date}</p>
        {description && (
          <p className="mt-2 text-gray-600">{description}</p>
        )}
        {achievements && (
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Achievements:</span> {achievements}
          </p>
        )}
      </div>
    </div>
  );
}