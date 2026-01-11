import { ErrorBoundary } from '@/components/errors/ErrorBoundary';
import ProtectedSuperAdminRoute from '@/components/auth/ProtectedSuperAdminRoute';
import AdminMasterclassContent from './AdminMasterclassContent';

// Force dynamic rendering to avoid caching
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function AdminMasterclassPage() {
  return (
    <ProtectedSuperAdminRoute>
      <ErrorBoundary>
        <AdminMasterclassContent />
      </ErrorBoundary>
    </ProtectedSuperAdminRoute>
  );
}
