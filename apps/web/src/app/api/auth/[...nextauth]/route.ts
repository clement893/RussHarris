/**
 * NextAuth API Route Handler
 * Handles all authentication requests
 */

// Force dynamic rendering to prevent Turbopack from parsing vendored Next.js modules
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const runtime = 'nodejs';
export const revalidate = 0;

import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;

