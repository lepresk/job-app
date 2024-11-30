'use client';

import { Button } from '@/components/ui/button';
import { AlertCircleIcon } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
        <AlertCircleIcon className="mx-auto mb-4 h-12 w-12 text-red-500" />
        <h2 className="mb-2 text-2xl font-bold">Something went wrong!</h2>
        <p className="mb-6 text-gray-600">{error.message}</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}