/**
 * Integration Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import {
  IntegrationList,
  IntegrationConfig,
  WebhookManager,
  APIDocumentation,
} from '@/components/integrations';
import { logger } from '@/lib/logger';
import { useState } from 'react';

export default function IntegrationComponentsContent() {
  const [selectedIntegration, setSelectedIntegration] = useState<{
    id: string;
    name: string;
    description: string;
    icon?: string;
    category: string;
  } | null>(null);

  const sampleIntegrations = [
    {
      id: '1',
      name: 'Stripe',
      description: 'Accept payments and manage subscriptions',
      category: 'payment' as const,
      status: 'connected' as const,
      connectedAt: '2024-01-15T10:00:00Z',
      configUrl: '/integrations/stripe',
      websiteUrl: 'https://stripe.com',
    },
    {
      id: '2',
      name: 'SendGrid',
      description: 'Email delivery service',
      category: 'communication' as const,
      status: 'connected' as const,
      connectedAt: '2024-02-01T10:00:00Z',
      configUrl: '/integrations/sendgrid',
      websiteUrl: 'https://sendgrid.com',
    },
    {
      id: '3',
      name: 'AWS S3',
      description: 'Cloud storage for files and media',
      category: 'storage' as const,
      status: 'available' as const,
      websiteUrl: 'https://aws.amazon.com/s3',
    },
    {
      id: '4',
      name: 'Google Analytics',
      description: 'Website analytics and tracking',
      category: 'analytics' as const,
      status: 'available' as const,
      websiteUrl: 'https://analytics.google.com',
    },
    {
      id: '5',
      name: 'Mailchimp',
      description: 'Email marketing platform',
      category: 'marketing' as const,
      status: 'disconnected' as const,
      connectedAt: '2024-01-10T10:00:00Z',
      configUrl: '/integrations/mailchimp',
      websiteUrl: 'https://mailchimp.com',
    },
  ];

  const sampleWebhooks = [
    {
      id: '1',
      name: 'Payment Webhook',
      url: 'https://example.com/webhooks/payment',
      events: ['payment.succeeded', 'payment.failed'],
      active: true,
      createdAt: '2024-01-15T10:00:00Z',
      lastTriggered: '2024-03-20T14:30:00Z',
      successCount: 150,
      failureCount: 2,
      lastStatus: 'success' as const,
    },
    {
      id: '2',
      name: 'User Events',
      url: 'https://example.com/webhooks/users',
      events: ['user.created', 'user.updated'],
      active: false,
      createdAt: '2024-02-01T10:00:00Z',
      successCount: 50,
      failureCount: 0,
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Composants d'Intégrations"
        description="Composants pour la gestion des intégrations, webhooks et documentation API"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Intégrations' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Integration List">
          <IntegrationList
            integrations={sampleIntegrations}
            onConnect={async (integration) => {
              logger.info('Connect integration:', { integrationId: integration.id });
              setSelectedIntegration({
                id: integration.id,
                name: integration.name,
                description: integration.description,
                category: integration.category,
              });
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }}
            onDisconnect={async (integration) => {
              logger.info('Disconnect integration:', { integrationId: integration.id });
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }}
            onConfigure={(integration) => {
              logger.info('Configure integration:', { integrationId: integration.id });
              setSelectedIntegration({
                id: integration.id,
                name: integration.name,
                description: integration.description,
                category: integration.category,
              });
            }}
          />
        </Section>

        {selectedIntegration && (
          <Section title="Integration Configuration">
            <div className="max-w-4xl">
              <IntegrationConfig
                integration={selectedIntegration}
                fields={[
                  {
                    id: 'api_key',
                    label: 'API Key',
                    type: 'password',
                    value: '',
                    required: true,
                    placeholder: 'Enter your API key',
                    helperText: 'Your API key is encrypted and secure',
                    sensitive: true,
                  },
                  {
                    id: 'api_secret',
                    label: 'API Secret',
                    type: 'password',
                    value: '',
                    required: true,
                    placeholder: 'Enter your API secret',
                    sensitive: true,
                  },
                ]}
                onSave={async (config) => {
                  logger.info('Integration config saved:', { config });
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  setSelectedIntegration(null);
                }}
                onCancel={() => setSelectedIntegration(null)}
                onTest={async () => {
                  logger.info('Testing integration connection');
                  await new Promise((resolve) => setTimeout(resolve, 2000));
                  return true;
                }}
              />
            </div>
          </Section>
        )}

        <Section title="Webhook Manager">
          <div className="max-w-4xl">
            <WebhookManager
              webhooks={sampleWebhooks}
              onCreate={async (data) => {
                logger.info('Webhook created:', { data });
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return {
                  id: `webhook-${Date.now()}`,
                  name: data.name,
                  url: data.url,
                  events: data.events,
                  active: true,
                  createdAt: new Date().toISOString(),
                  successCount: 0,
                  failureCount: 0,
                };
              }}
              onDelete={async (id) => {
                logger.info('Webhook deleted:', { id });
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onToggle={async (id, active) => {
                logger.info('Webhook toggled:', { id, active });
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onTest={async (id) => {
                logger.info('Testing webhook:', { id });
                await new Promise((resolve) => setTimeout(resolve, 2000));
              }}
            />
          </div>
        </Section>

        <Section title="API Documentation">
          <APIDocumentation
            baseUrl="https://api.example.com"
            onTryIt={(endpoint) => {
              logger.info('Try API endpoint:', { method: endpoint.method, path: endpoint.path });
            }}
          />
        </Section>
      </div>
    </PageContainer>
  );
}

