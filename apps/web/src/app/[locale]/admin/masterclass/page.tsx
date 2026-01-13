import { ErrorBoundary } from '@/components/errors/ErrorBoundary';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminMasterclassContent from './AdminMasterclassContent';

// Force dynamic rendering to avoid caching
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function AdminMasterclassPage() {
  return (
    <ProtectedRoute requireAdmin>
      <ErrorBoundary>
        <AdminMasterclassContent />
      </ErrorBoundary>
    </ProtectedRoute>
  );
}
