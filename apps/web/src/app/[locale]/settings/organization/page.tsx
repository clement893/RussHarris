/**
 * Organization Settings Page
 * 
 * Page for managing organization settings including name, logo, domain, etc.
 * Uses existing OrganizationSettings component.
 */

'use client';

// Force dynamic rendering to avoid static generation
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/lib/store';
import { OrganizationSettings } from '@/components/settings';
import type { OrganizationSettingsData } from '@/components/settings';
import { PageHeader, PageContainer } from '@/components/layout';
import { Loading, Alert } from '@/components/ui';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { logger } from '@/lib/logger';
import { getErrorMessage } from '@/lib/errors';
import { teamsAPI, type Team } from '@/lib/api/teams';

export default function OrganizationSettingsPage() {
  const router = useRouter();
  const t = useTranslations('settings.organization');
  const { isAuthenticated, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [organization, setOrganization] = useState<{
    id: string;
    name: string;
    slug: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    timezone?: string;
    locale?: string;
  }>({
    id: '1',
    name: '',
    slug: '',
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    loadOrganization();
  }, [isAuthenticated, router]);

  const loadOrganization = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get user's teams and find the one they own
      const teamsResponse = await teamsAPI.getMyTeams();
      const teamsData = teamsResponse.data?.teams || [];
      
      // Find the team where the user is the owner
      let userTeam: Team | null = null;
      
      // Get current user ID from auth store
      const currentUserId = user?.id ? parseInt(user.id, 10) : null;
      
      if (currentUserId) {
        // Find team where user is owner
        userTeam = teamsData.find((team: Team) => team.owner_id === currentUserId) || null;
      }
      
      // Fallback to first team if no owned team found
      if (!userTeam && teamsData.length > 0) {
        userTeam = teamsData[0];
      }
      
      if (!userTeam) {
        throw new Error('No organization found. Please create an organization first.');
      }
      
      // Parse settings from team
      let teamSettings: {
        email?: string;
        phone?: string;
        website?: string;
        address?: {
          line1: string;
          line2?: string;
          city: string;
          state: string;
          postalCode: string;
          country: string;
        };
        timezone?: string;
        locale?: string;
      } = {};
      
      if (userTeam.settings && typeof userTeam.settings === 'object') {
        teamSettings = userTeam.settings as typeof teamSettings;
      } else if (typeof userTeam.settings === 'string') {
        try {
          teamSettings = JSON.parse(userTeam.settings);
        } catch (e) {
          logger.warn('Failed to parse team settings', e);
        }
      }
      
      setOrganization({
        id: String(userTeam.id),
        name: userTeam.name,
        slug: userTeam.slug,
        email: teamSettings.email,
        phone: teamSettings.phone,
        website: teamSettings.website,
        address: teamSettings.address,
        timezone: teamSettings.timezone || 'UTC',
        locale: teamSettings.locale || 'en-US',
      });
      setIsLoading(false);
    } catch (error) {
      logger.error('Failed to load organization settings', error instanceof Error ? error : new Error(String(error)));
      setError(t('errors.loadFailed') || 'Failed to load organization settings. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSave = async (data: OrganizationSettingsData) => {
    try {
      setError(null);
      
      if (!organization.id) {
        throw new Error('Organization ID is missing');
      }
      
      // Prepare team settings with additional information
      const teamSettings = {
        email: data.email,
        phone: data.phone,
        website: data.website,
        address: data.address,
        timezone: data.timezone,
        locale: data.locale,
      };
      
      // Get current team to preserve description
      const currentTeamResponse = await teamsAPI.getTeam(parseInt(organization.id, 10));
      const currentTeam = currentTeamResponse.data;
      
      // Update the team via Teams API
      const teamId = parseInt(organization.id, 10);
      const response = await teamsAPI.updateTeam(teamId, {
        name: data.name,
        description: currentTeam?.description || undefined,
        settings: teamSettings,
      });
      
      const updatedTeam = response.data;
      
      if (!updatedTeam) {
        throw new Error('Failed to update organization: no data returned');
      }
      
      // Parse settings from updated team
      let teamSettingsParsed: typeof teamSettings = {};
      if (updatedTeam.settings && typeof updatedTeam.settings === 'object') {
        teamSettingsParsed = updatedTeam.settings as typeof teamSettings;
      } else if (typeof updatedTeam.settings === 'string') {
        try {
          teamSettingsParsed = JSON.parse(updatedTeam.settings);
        } catch (e) {
          logger.warn('Failed to parse updated team settings', e);
        }
      }
      
      // Update local state with saved data
      setOrganization({
        id: String(updatedTeam.id),
        name: updatedTeam.name,
        slug: updatedTeam.slug,
        email: teamSettingsParsed.email,
        phone: teamSettingsParsed.phone,
        website: teamSettingsParsed.website,
        address: teamSettingsParsed.address,
        timezone: teamSettingsParsed.timezone || 'UTC',
        locale: teamSettingsParsed.locale || 'en-US',
      });
      
      logger.info('Organization settings saved successfully');
    } catch (error: unknown) {
      logger.error('Failed to save organization settings', error instanceof Error ? error : new Error(String(error)));
      const errorMessage = getErrorMessage(error) || t('errors.saveFailed') || 'Failed to save organization settings. Please try again.';
      setError(errorMessage);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <PageContainer>
          <div className="flex items-center justify-center min-h-[400px]">
            <Loading />
          </div>
        </PageContainer>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <PageContainer>
        <PageHeader
          title={t('title') || 'Organization Settings'}
          description={t('description') || 'Manage your organization settings and configuration'}
          breadcrumbs={[
            { label: t('breadcrumbs.dashboard') || 'Dashboard', href: '/dashboard' },
            { label: t('breadcrumbs.settings') || 'Settings', href: '/settings' },
            { label: t('breadcrumbs.organization') || 'Organization' },
          ]}
        />

        {error && (
          <div className="mt-6">
            <Alert variant="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </div>
        )}

        <div className="mt-8">
          <OrganizationSettings organization={organization} onSave={handleSave} />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}

