// Force dynamic so /admin/* are never prerendered (avoids useRouter from i18n without locale context)
export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
