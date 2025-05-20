import { DashboardLayout } from '@/components/layout/DashboardLayout';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  // Here you would typically add authentication checks
  // For now, we assume the user is authenticated if they reach this layout
  return <DashboardLayout>{children}</DashboardLayout>;
}
