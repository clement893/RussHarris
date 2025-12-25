/**
 * Invitation Management Component
 * Manages user invitations
 */

'use client';

import Card from '@/components/ui/Card';

export interface InvitationManagementProps {
  className?: string;
}

export default function InvitationManagement({ className }: InvitationManagementProps) {
  return (
    <Card className={className}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Invitation Management</h2>
        <p className="text-gray-600 dark:text-gray-400">Invitation management functionality coming soon.</p>
      </div>
    </Card>
  );
}

