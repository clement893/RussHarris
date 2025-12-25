/**
 * Settings Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import {
  UserSettings,
  OrganizationSettings,
  SecuritySettings,
  NotificationSettings,
  PrivacySettings,
  APIKeys,
  WebhooksSettings,
} from '@/components/settings';
import { logger } from '@/lib/logger';
import { useState } from 'react';

export default function SettingsComponentsContent() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_live_1234567890abcdef',
      prefix: 'sk_live_',
      createdAt: '2024-01-15T10:00:00Z',
      lastUsed: '2024-03-20T14:30:00Z',
      scopes: ['read', 'write'],
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'sk_test_abcdef1234567890',
      prefix: 'sk_test_',
      createdAt: '2024-02-01T10:00:00Z',
      scopes: ['read'],
    },
  ]);

  const [webhooks, setWebhooks] = useState([
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
  ]);

  return (
    <PageContainer>
      <PageHeader
        title="Composants de Paramètres"
        description="Composants pour la gestion des paramètres utilisateur, organisation et sécurité"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Paramètres' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="User Settings">
          <div className="max-w-4xl">
            <UserSettings
              user={{
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                phone: '+1 (555) 123-4567',
                bio: 'Software developer passionate about building great products.',
                location: 'New York, NY',
                website: 'https://johndoe.com',
              }}
              onSave={async (data) => {
                logger.info('User settings saved:', { data });
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onAvatarChange={async (file) => {
                logger.info('Avatar changed:', { fileName: file.name });
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
            />
          </div>
        </Section>

        <Section title="Organization Settings">
          <div className="max-w-4xl">
            <OrganizationSettings
              organization={{
                id: '1',
                name: 'Acme Inc.',
                slug: 'acme-inc',
                email: 'contact@acme.com',
                phone: '+1 (555) 123-4567',
                website: 'https://acme.com',
                address: {
                  line1: '123 Main Street',
                  line2: 'Suite 100',
                  city: 'New York',
                  state: 'NY',
                  postalCode: '10001',
                  country: 'United States',
                },
                timezone: 'America/New_York',
                locale: 'en-US',
              }}
              onSave={async (data) => {
                logger.info('Organization settings saved:', { data });
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
            />
          </div>
        </Section>

        <Section title="Security Settings">
          <div className="max-w-4xl">
            <SecuritySettings
              settings={{
                twoFactorEnabled: false,
                sessionTimeout: 30,
                passwordExpiry: 90,
                requireStrongPassword: true,
                loginNotifications: true,
                suspiciousActivityAlerts: true,
              }}
              onSave={async (data) => {
                logger.info('Security settings saved:', { data });
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onEnable2FA={async () => {
                logger.info('2FA enabled');
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onDisable2FA={async () => {
                logger.info('2FA disabled');
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onChangePassword={() => {
                logger.info('Change password clicked');
              }}
            />
          </div>
        </Section>

        <Section title="Notification Settings">
          <div className="max-w-4xl">
            <NotificationSettings
              settings={{
                email: {
                  enabled: true,
                  frequency: 'instant',
                  types: {
                    marketing: false,
                    product: true,
                    security: true,
                    billing: true,
                    system: true,
                  },
                },
                push: {
                  enabled: false,
                  types: {
                    marketing: false,
                    product: true,
                    security: true,
                    billing: false,
                    system: false,
                  },
                },
                inApp: {
                  enabled: true,
                  types: {
                    marketing: false,
                    product: true,
                    security: true,
                    billing: true,
                    system: true,
                  },
                },
              }}
              onSave={async (data) => {
                logger.info('Notification settings saved:', { data });
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
            />
          </div>
        </Section>

        <Section title="Privacy Settings">
          <div className="max-w-4xl">
            <PrivacySettings
              settings={{
                profileVisibility: 'private',
                showEmail: false,
                showPhone: false,
                allowDataCollection: true,
                allowAnalytics: true,
                allowMarketing: false,
              }}
              onSave={async (data) => {
                logger.info('Privacy settings saved:', { data });
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onExportData={async () => {
                logger.info('Export data requested');
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onDeleteAccount={async () => {
                logger.info('Delete account requested');
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
            />
          </div>
        </Section>

        <Section title="API Keys">
          <div className="max-w-4xl">
            <APIKeys
              apiKeys={apiKeys}
              onCreate={async (name, scopes) => {
                logger.info('API key created:', { name, scopes });
                const newKey = {
                  id: String(Date.now()),
                  name,
                  key: `sk_live_${Math.random().toString(36).substring(2, 18)}`,
                  prefix: 'sk_live_',
                  createdAt: new Date().toISOString(),
                  scopes,
                };
                setApiKeys([...apiKeys, newKey]);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return newKey;
              }}
              onDelete={async (id) => {
                logger.info('API key deleted:', { id });
                setApiKeys(apiKeys.filter((k) => k.id !== id));
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
            />
          </div>
        </Section>

        <Section title="Webhooks Settings">
          <div className="max-w-4xl">
            <WebhooksSettings
              webhooks={webhooks}
              onCreate={async (data) => {
                logger.info('Webhook created:', { data });
                const newWebhook = {
                  id: String(Date.now()),
                  ...data,
                  active: true,
                  createdAt: new Date().toISOString(),
                  successCount: 0,
                  failureCount: 0,
                };
                setWebhooks([...webhooks, newWebhook]);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return newWebhook;
              }}
              onDelete={async (id) => {
                logger.info('Webhook deleted:', { id });
                setWebhooks(webhooks.filter((w) => w.id !== id));
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onToggle={async (id, active) => {
                logger.info('Webhook toggled:', { id, active });
                setWebhooks(
                  webhooks.map((w) => (w.id === id ? { ...w, active } : w))
                );
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
            />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}

