/**
 * Activity Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import {
  ActivityLog,
  AuditTrail,
  ActivityFeed,
  EventHistory,
} from '@/components/activity';
import { logger } from '@/lib/logger';

export default function ActivityComponentsContent() {
  const sampleActivities = [
    {
      id: '1',
      timestamp: '2024-03-20T14:30:00Z',
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: undefined,
      },
      action: 'created',
      resource: 'Project',
      resourceId: 'proj_123',
      details: 'Created new project "Website Redesign"',
      ipAddress: '192.168.1.1',
    },
    {
      id: '2',
      timestamp: '2024-03-20T13:15:00Z',
      user: {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
      action: 'updated',
      resource: 'User',
      resourceId: 'user_456',
      details: 'Updated user profile',
      ipAddress: '192.168.1.2',
    },
    {
      id: '3',
      timestamp: '2024-03-20T12:00:00Z',
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      },
      action: 'deleted',
      resource: 'Document',
      resourceId: 'doc_789',
      details: 'Deleted document "Old Report.pdf"',
      ipAddress: '192.168.1.1',
    },
  ];

  const sampleAuditEntries = [
    {
      id: '1',
      timestamp: '2024-03-20T14:30:00Z',
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      },
      action: 'update' as const,
      resourceType: 'User',
      resourceId: 'user_123',
      resourceName: 'Jane Smith',
      changes: [
        {
          field: 'email',
          oldValue: 'jane@old.com',
          newValue: 'jane@new.com',
        },
        {
          field: 'role',
          oldValue: 'user',
          newValue: 'admin',
        },
      ],
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0...',
      status: 'success' as const,
    },
    {
      id: '2',
      timestamp: '2024-03-20T13:15:00Z',
      user: {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
      action: 'delete' as const,
      resourceType: 'Project',
      resourceId: 'proj_456',
      resourceName: 'Old Project',
      ipAddress: '192.168.1.2',
      status: 'success' as const,
    },
  ];

  const sampleFeedItems = [
    {
      id: '1',
      timestamp: new Date().toISOString(),
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      },
      action: 'created',
      resource: 'Project',
      resourceId: 'proj_123',
      type: 'success' as const,
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      user: {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
      action: 'updated',
      resource: 'Document',
      resourceId: 'doc_456',
      type: 'info' as const,
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      },
      action: 'commented',
      resource: 'Task',
      resourceId: 'task_789',
      type: 'info' as const,
    },
  ];

  const sampleEvents = [
    {
      id: '1',
      timestamp: '2024-03-20T14:30:00Z',
      eventType: 'system',
      eventName: 'Backup Completed',
      description: 'Daily backup completed successfully',
      severity: 'low' as const,
      source: 'backup-service',
      userId: 'system',
      userName: 'System',
    },
    {
      id: '2',
      timestamp: '2024-03-20T13:15:00Z',
      eventType: 'security',
      eventName: 'Failed Login Attempt',
      description: 'Multiple failed login attempts detected',
      severity: 'high' as const,
      source: 'auth-service',
      userId: 'user_123',
      userName: 'Unknown',
    },
    {
      id: '3',
      timestamp: '2024-03-20T12:00:00Z',
      eventType: 'application',
      eventName: 'API Rate Limit Exceeded',
      description: 'API rate limit exceeded for user',
      severity: 'medium' as const,
      source: 'api-gateway',
      userId: 'user_456',
      userName: 'John Doe',
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Composants d'Activité"
        description="Composants pour le suivi des activités, audit et historique des événements"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Activité' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Activity Log">
          <ActivityLog
            activities={sampleActivities}
            onFilterChange={(filters) => {
              logger.info('Activity filters changed:', { filters });
            }}
          />
        </Section>

        <Section title="Audit Trail">
          <AuditTrail
            entries={sampleAuditEntries}
            onFilterChange={(filters) => {
              logger.info('Audit filters changed:', { filters });
            }}
          />
        </Section>

        <Section title="Activity Feed">
          <ActivityFeed
            activities={sampleFeedItems}
            autoRefresh={false}
            onLoadMore={async () => {
              logger.info('Loading more activities');
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return [];
            }}
          />
        </Section>

        <Section title="Event History">
          <EventHistory
            events={sampleEvents}
            onFilterChange={(filters) => {
              logger.info('Event filters changed:', { filters });
            }}
          />
        </Section>
      </div>
    </PageContainer>
  );
}

