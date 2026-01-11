import { ErrorBoundary } from '@/components/errors/ErrorBoundary';
import { ProtectedSuperAdminRoute } from '@/components/auth/ProtectedRoute';
import AdminMasterclassContent from './AdminMasterclassContent';

// Disable static generation to avoid hydration issues
export const revalidate = 0;

export default function AdminMasterclassPage() {
  return (
    <ProtectedSuperAdminRoute>
      <ErrorBoundary>
        <AdminMasterclassContent />
      </ErrorBoundary>
    </ProtectedSuperAdminRoute>
  );
}
