// Force dynamic so /subscriptions and children are never prerendered (avoids useRouter/context errors)
export const dynamic = 'force-dynamic';

export default function SubscriptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
