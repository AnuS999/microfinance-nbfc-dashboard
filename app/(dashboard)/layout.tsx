import { redirect } from 'next/navigation';
import { getSession } from '@/src/lib/auth';
import { AdminLayout } from '@/components/layout/AdminLayout';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return <AdminLayout>{children}</AdminLayout>;
}

