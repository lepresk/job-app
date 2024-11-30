import { Loader2Icon } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2Icon className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
}