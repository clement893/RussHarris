// Server layout: force dynamic so /dashboard/* are never prerendered (avoids build errors)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import DashboardLayoutClient from './DashboardLayoutClient';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
