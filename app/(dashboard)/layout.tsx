import { redirect } from 'next/navigation';
import { getSession } from '@/src/lib/auth';
import { AdminLayout } from '@/components/layout/AdminLayout';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const session = await getSession();

    if (!session) {
      redirect('/login');
    }

    return <AdminLayout>{children}</AdminLayout>;
  } catch (error) {
    console.error('Error in DashboardLayout:', error);
    // Redirect to login on error
    redirect('/login');
  }
}

