'use client';

import { JobDetailsPage } from '@/components/pages/jobs/details';

export default function Page({ params }: { params: { id: string } }) {
  return <JobDetailsPage id={params.id} />;
}