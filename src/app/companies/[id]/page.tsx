'use client';

import { CompanyProfilePage } from '@/components/pages/companies/profile';

export default function Page({ params }: { params: { id: string } }) {
  return <CompanyProfilePage id={params.id} />;
}