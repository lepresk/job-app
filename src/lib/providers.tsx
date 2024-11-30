'use client';

import { PropsWithChildren } from 'react';
import { ToastProvider } from '@/components/ui/toast';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}