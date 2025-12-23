'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

/**
 * Protected Route Component
 * Prevents unauthorized access to routes requiring authentication
 * Prevents flash of unauthenticated content
 */
export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Check authentication
      if (!isAuthenticated()) {
        router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // Check admin privileges if required
      if (requireAdmin && !user?.is_admin) {
        router.replace('/dashboard?error=unauthorized');
        return;
      }

      // Authorize access
      setIsAuthorized(true);
      setIsChecking(false);
    };

    // Check immediately
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.is_admin, requireAdmin, router, pathname]);

  // Show loader during verification
  if (isChecking || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-xl text-gray-600">Verifying authentication...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

