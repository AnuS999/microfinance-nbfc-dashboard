import { AdminLayout } from '@/components/layout/AdminLayout';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No authentication required - dashboard is publicly accessible
  return <AdminLayout>{children}</AdminLayout>;
}

