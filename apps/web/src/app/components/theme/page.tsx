import { Suspense } from 'react';
import nextDynamic from 'next/dynamic';
import { Spinner } from '@/components/ui';

const ThemeContent = nextDynamic(() => import('./ThemeContent'), {
  ssr: false,
});

export const dynamic = 'force-dynamic';

export default function ThemePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Spinner /></div>}>
      <ThemeContent />
    </Suspense>
  );
}
