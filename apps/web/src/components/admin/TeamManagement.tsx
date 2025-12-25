/**
 * Team Management Component
 * Manages teams and team members
 */

'use client';

import Card from '@/components/ui/Card';

export interface TeamManagementProps {
  className?: string;
}

export default function TeamManagement({ className }: TeamManagementProps) {
  return (
    <Card className={className}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Team Management</h2>
        <p className="text-gray-600 dark:text-gray-400">Team management functionality coming soon.</p>
      </div>
    </Card>
  );
}

