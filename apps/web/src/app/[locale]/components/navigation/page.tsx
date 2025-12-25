import NavigationContent from './NavigationContent';

// Force dynamic rendering to avoid CSS file issues during build
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function NavigationPage() {
  return <NavigationContent />;
}
