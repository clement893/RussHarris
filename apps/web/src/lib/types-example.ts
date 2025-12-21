/**
 * Example file demonstrating how to use shared types from @modele/types
 * 
 * This file can be deleted - it's just for reference
 */

import type {
  User,
  ApiResponse,
  PaginatedResponse,
  LoginRequest,
  LoginResponse,
} from '@modele/types';

// Example: Using User type
export function getUserExample(): User {
  return {
    id: '1',
    email: 'user@example.com',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Example: Using API Response type
export async function fetchUserExample(
  userId: string
): Promise<ApiResponse<User>> {
  // In real implementation, this would make an API call
  return {
    success: true,
    data: {
      id: userId,
      email: 'user@example.com',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}

// Example: Using Paginated Response
export async function fetchUsersExample(): Promise<
  PaginatedResponse<User>
> {
  // In real implementation, this would make an API call
  return {
    items: [
      {
        id: '1',
        email: 'user1@example.com',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    total: 1,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  };
}

// Example: Using Login types
export function loginExample(
  credentials: LoginRequest
): Promise<LoginResponse> {
  // In real implementation, this would make an API call
  return Promise.resolve({
    accessToken: 'token',
    refreshToken: 'refresh',
    user: {
      id: '1',
      email: credentials.email,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });
}

