import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('aboutRussTitle'),
    description: t('aboutRussDescription'),
  };
}

export default function AboutRussLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
