import DataContent from './DataContent';

// Force dynamic rendering to avoid CSS file issues during build
export const dynamic = 'force-dynamic';

export default function DataPage() {
  return <DataContent />;
}
