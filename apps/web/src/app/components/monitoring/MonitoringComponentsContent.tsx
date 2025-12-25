'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import {
  AlertsPanel,
  ErrorTrackingDashboard,
  HealthStatus,
  LogsViewer,
  MetricsChart,
  SystemPerformanceDashboard,
  PerformanceProfiler,
  SystemMetrics,
} from '@/components/monitoring';
import { logger } from '@/lib/logger';

export default function MonitoringComponentsContent() {
  return (
    <PageContainer>
      <PageHeader
        title="Composants de Monitoring"
        description="Composants pour le monitoring système, métriques et santé de l'application"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Monitoring' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="System Performance Dashboard">
          <SystemPerformanceDashboard />
        </Section>

        <Section title="Health Status">
          <HealthStatus
            services={[
              { name: 'API', status: 'healthy', latency: 45 },
              { name: 'Database', status: 'healthy', latency: 12 },
              { name: 'Cache', status: 'degraded', latency: 120 },
              { name: 'Queue', status: 'healthy', latency: 8 },
            ]}
          />
        </Section>

        <Section title="System Metrics">
          <SystemMetrics
            metrics={{
              cpu: 45,
              memory: 62,
              disk: 38,
              network: 12,
            }}
          />
        </Section>

        <Section title="Metrics Chart">
          <MetricsChart
            data={[
              { timestamp: '2024-01-01', value: 100 },
              { timestamp: '2024-01-02', value: 120 },
              { timestamp: '2024-01-03', value: 95 },
              { timestamp: '2024-01-04', value: 140 },
            ]}
            metric="requests"
          />
        </Section>

        <Section title="Error Tracking Dashboard">
          <ErrorTrackingDashboard
            errors={[
              { id: '1', message: 'TypeError: Cannot read property', count: 45, lastSeen: new Date() },
              { id: '2', message: 'Network timeout', count: 12, lastSeen: new Date() },
            ]}
          />
        </Section>

        <Section title="Alerts Panel">
          <AlertsPanel
            alerts={[
              { id: '1', type: 'warning', message: 'High memory usage', timestamp: new Date() },
              { id: '2', type: 'error', message: 'API endpoint down', timestamp: new Date() },
            ]}
            onDismiss={(id) => {
              logger.debug('Alert dismissed', { id });
            }}
          />
        </Section>

        <Section title="Logs Viewer">
          <LogsViewer
            logs={[
              { id: '1', level: 'info', message: 'User logged in', timestamp: new Date() },
              { id: '2', level: 'error', message: 'Failed to process payment', timestamp: new Date() },
            ]}
            onFilterChange={(filters) => {
              logger.debug('Log filters changed', { filters });
            }}
          />
        </Section>

        <Section title="Performance Profiler">
          <PerformanceProfiler
            onProfileStart={() => {
              logger.debug('Performance profiling started');
            }}
            onProfileStop={(results) => {
              logger.debug('Performance profiling stopped', { results });
            }}
          />
        </Section>
      </div>
    </PageContainer>
  );
}

