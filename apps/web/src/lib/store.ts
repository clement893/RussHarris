/**
 * Authentication Store
 * 
 * Zustand store for managing authentication state with persistence.
 * Handles user data, JWT tokens, and authentication status.
 * 
 * @module lib/store
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TokenStorage } from './auth/tokenStorage';

/**
 * User interface representing authenticated user data
 */
interface User {
  /** Unique user identifier */
  id: string;
  /** User email address */
  email: string;
  /** User display name */
  name: string;
  /** Whether the user account is active */
  is_active: boolean;
  /** Whether the user email is verified */
  is_verified: boolean;
  /** Whether the user has admin privileges */
  is_admin?: boolean;
  /** Account creation timestamp (ISO 8601) */
  created_at?: string;
  /** Last update timestamp (ISO 8601) */
  updated_at?: string;
}

/**
 * Authentication state interface
 */
interface AuthState {
  /** Current authenticated user or null if not authenticated */
  user: User | null;
  /** JWT access token or null if not authenticated */
  token: string | null;
  /** JWT refresh token or null if not available */
  refreshToken: string | null;
  /** 
   * Checks if user is currently authenticated
   * @returns True if both token and user are present
   */
  isAuthenticated: () => boolean;
  /** 
   * Logs in a user with tokens
   * @param user - User data
   * @param token - JWT access token
   * @param refreshToken - Optional JWT refresh token
   */
  login: (user: User, token: string, refreshToken?: string) => void;
  /** Logs out the current user and clears all tokens */
  logout: () => void;
  /** 
   * Updates the current user data
   * @param user - Updated user data
   */
  setUser: (user: User) => void;
  /** 
   * Updates the access token
   * @param token - New JWT access token
   */
  setToken: (token: string) => void;
  /** 
   * Updates the refresh token
   * @param refreshToken - New JWT refresh token
   */
  setRefreshToken: (refreshToken: string) => void;
  /** Current error message or null */
  error: string | null;
  /** 
   * Sets or clears the error message
   * @param error - Error message or null to clear
   */
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      error: null,

      isAuthenticated: () => {
        const state = get();
        return !!state.token && !!state.user;
      },

      login: (user: User, token: string, refreshToken?: string) => {
        TokenStorage.setToken(token);
        if (refreshToken) {
          TokenStorage.setRefreshToken(refreshToken);
        }
        set({ user, token, refreshToken: refreshToken || null, error: null });
      },

      logout: () => {
        TokenStorage.removeTokens();
        set({ user: null, token: null, refreshToken: null, error: null });
      },

      setUser: (user: User) => {
        set({ user });
      },

      setToken: (token: string) => {
        TokenStorage.setToken(token);
        set({ token });
      },

      setRefreshToken: (refreshToken: string) => {
        TokenStorage.setRefreshToken(refreshToken);
        set({ refreshToken });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

