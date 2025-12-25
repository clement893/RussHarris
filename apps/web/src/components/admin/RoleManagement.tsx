/**
 * Role Management Component
 * Manages user roles and permissions
 */

'use client';

import Card from '@/components/ui/Card';

export interface RoleManagementProps {
  className?: string;
}

export default function RoleManagement({ className }: RoleManagementProps) {
  return (
    <Card className={className}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Role Management</h2>
        <p className="text-gray-600 dark:text-gray-400">Role management functionality coming soon.</p>
      </div>
    </Card>
  );
}

