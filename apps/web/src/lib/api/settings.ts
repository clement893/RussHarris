/**
 * Settings API Client
 * 
 * API functions for user settings endpoints.
 * 
 * @module SettingsAPI
 */

import { apiClient } from './client';

/**
 * Notification Settings
 */
export interface NotificationSettings {
  email: {
    enabled: boolean;
    frequency: 'instant' | 'daily' | 'weekly';
    types: {
      marketing: boolean;
      product: boolean;
      security: boolean;
      billing: boolean;
      system: boolean;
    };
  };
  push: {
    enabled: boolean;
    types: {
      marketing: boolean;
      product: boolean;
      security: boolean;
      billing: boolean;
      system: boolean;
    };
  };
  inApp: {
    enabled: boolean;
    types: {
      marketing: boolean;
      product: boolean;
      security: boolean;
      billing: boolean;
      system: boolean;
    };
  };
}

/**
 * General Settings
 */
export interface GeneralSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  theme: 'light' | 'dark' | 'system';
}

/**
 * Security Settings
 */
export interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
}

/**
 * Billing Settings
 */
export interface BillingSettings {
  currency: string;
  taxId?: string;
  billingEmail?: string;
}

/**
 * Organization Settings
 */
export interface OrganizationSettings {
  name: string;
  website?: string;
  industry?: string;
  size?: string;
}

/**
 * Settings API
 */
export const settingsAPI = {
  /**
   * Get notification settings
   */
  getNotificationSettings: async (): Promise<NotificationSettings> => {
    const response = await apiClient.get<NotificationSettings>('/v1/settings/notifications');
    if (!response.data) {
      throw new Error('Failed to fetch notification settings: no data returned');
    }
    return response.data;
  },

  /**
   * Update notification settings
   */
  updateNotificationSettings: async (settings: NotificationSettings): Promise<NotificationSettings> => {
    const response = await apiClient.put<NotificationSettings>('/v1/settings/notifications', settings);
    if (!response.data) {
      throw new Error('Failed to update notification settings: no data returned');
    }
    return response.data;
  },

  /**
   * Get general settings
   */
  getGeneralSettings: async (): Promise<GeneralSettings> => {
    const response = await apiClient.get<GeneralSettings>('/v1/settings/general');
    if (!response.data) {
      throw new Error('Failed to fetch general settings: no data returned');
    }
    return response.data;
  },

  /**
   * Update general settings
   */
  updateGeneralSettings: async (settings: GeneralSettings): Promise<GeneralSettings> => {
    const response = await apiClient.put<GeneralSettings>('/v1/settings/general', settings);
    if (!response.data) {
      throw new Error('Failed to update general settings: no data returned');
    }
    return response.data;
  },

  /**
   * Get security settings
   */
  getSecuritySettings: async (): Promise<SecuritySettings> => {
    const response = await apiClient.get<SecuritySettings>('/v1/settings/security');
    if (!response.data) {
      throw new Error('Failed to fetch security settings: no data returned');
    }
    return response.data;
  },

  /**
   * Update security settings
   */
  updateSecuritySettings: async (settings: SecuritySettings): Promise<SecuritySettings> => {
    const response = await apiClient.put<SecuritySettings>('/v1/settings/security', settings);
    if (!response.data) {
      throw new Error('Failed to update security settings: no data returned');
    }
    return response.data;
  },

  /**
   * Get billing settings
   */
  getBillingSettings: async (): Promise<BillingSettings> => {
    const response = await apiClient.get<BillingSettings>('/v1/settings/billing');
    if (!response.data) {
      throw new Error('Failed to fetch billing settings: no data returned');
    }
    return response.data;
  },

  /**
   * Update billing settings
   */
  updateBillingSettings: async (settings: BillingSettings): Promise<BillingSettings> => {
    const response = await apiClient.put<BillingSettings>('/v1/settings/billing', settings);
    if (!response.data) {
      throw new Error('Failed to update billing settings: no data returned');
    }
    return response.data;
  },

  /**
   * Get organization settings
   */
  getOrganizationSettings: async (): Promise<OrganizationSettings> => {
    const response = await apiClient.get<OrganizationSettings>('/v1/settings/organization');
    if (!response.data) {
      throw new Error('Failed to fetch organization settings: no data returned');
    }
    return response.data;
  },

  /**
   * Update organization settings
   */
  updateOrganizationSettings: async (settings: OrganizationSettings): Promise<OrganizationSettings> => {
    const response = await apiClient.put<OrganizationSettings>('/v1/settings/organization', settings);
    if (!response.data) {
      throw new Error('Failed to update organization settings: no data returned');
    }
    return response.data;
  },
};

