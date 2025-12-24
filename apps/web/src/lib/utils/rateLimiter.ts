/**
 * Client-Side Rate Limiter
 * Prevents excessive API calls from the client
 * 
 * Security: Protects against abuse and reduces server load
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private readonly defaultWindowMs: number;
  private readonly defaultMaxRequests: number;

  constructor(
    defaultWindowMs: number = 60000, // 1 minute
    defaultMaxRequests: number = 60 // 60 requests per minute
  ) {
    this.defaultWindowMs = defaultWindowMs;
    this.defaultMaxRequests = defaultMaxRequests;
  }

  /**
   * Check if request is allowed
   * @param key Unique identifier for the rate limit (e.g., endpoint, user ID)
   * @param maxRequests Maximum requests allowed in the window
   * @param windowMs Time window in milliseconds
   * @returns True if request is allowed
   */
  isAllowed(
    key: string,
    maxRequests: number = this.defaultMaxRequests,
    windowMs: number = this.defaultWindowMs
  ): boolean {
    const now = Date.now();
    const entry = this.limits.get(key);

    // No entry or window expired, allow request
    if (!entry || now > entry.resetTime) {
      this.limits.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      return true;
    }

    // Check if limit exceeded
    if (entry.count >= maxRequests) {
      return false;
    }

    // Increment count
    entry.count++;
    return true;
  }

  /**
   * Get remaining requests for a key
   * @param key Unique identifier
   * @param maxRequests Maximum requests allowed
   * @returns Number of remaining requests, or -1 if no limit set
   */
  getRemaining(
    key: string,
    maxRequests: number = this.defaultMaxRequests
  ): number {
    const entry = this.limits.get(key);
    if (!entry) {
      return maxRequests;
    }

    const now = Date.now();
    if (now > entry.resetTime) {
      return maxRequests;
    }

    return Math.max(0, maxRequests - entry.count);
  }

  /**
   * Get time until reset for a key
   * @param key Unique identifier
   * @returns Milliseconds until reset, or 0 if no limit set
   */
  getResetTime(key: string): number {
    const entry = this.limits.get(key);
    if (!entry) {
      return 0;
    }

    const now = Date.now();
    return Math.max(0, entry.resetTime - now);
  }

  /**
   * Reset rate limit for a key
   * @param key Unique identifier
   */
  reset(key: string): void {
    this.limits.delete(key);
  }

  /**
   * Clear all rate limits
   */
  clear(): void {
    this.limits.clear();
  }

  /**
   * Clean up expired entries (call periodically)
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

// Cleanup expired entries every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    rateLimiter.cleanup();
  }, 5 * 60 * 1000);
}

/**
 * Rate limit configuration for different endpoints
 */
export const RATE_LIMIT_CONFIG = {
  // Authentication endpoints - stricter limits
  auth: {
    maxRequests: 10, // 10 requests per minute
    windowMs: 60000, // 1 minute
  },
  // File upload endpoints - very strict limits
  upload: {
    maxRequests: 5, // 5 requests per minute
    windowMs: 60000, // 1 minute
  },
  // General API endpoints - standard limits
  api: {
    maxRequests: 60, // 60 requests per minute
    windowMs: 60000, // 1 minute
  },
  // Search endpoints - moderate limits
  search: {
    maxRequests: 30, // 30 requests per minute
    windowMs: 60000, // 1 minute
  },
} as const;

/**
 * Get rate limit key from endpoint URL
 * @param url API endpoint URL
 * @returns Rate limit key
 */
export function getRateLimitKey(url: string): string {
  try {
    const urlObj = new URL(url, window.location.origin);
    const pathname = urlObj.pathname;
    
    // Extract endpoint category from path
    if (pathname.includes('/auth/')) {
      return `auth:${pathname}`;
    }
    if (pathname.includes('/upload')) {
      return `upload:${pathname}`;
    }
    if (pathname.includes('/search')) {
      return `search:${pathname}`;
    }
    
    return `api:${pathname}`;
  } catch {
    return `api:${url}`;
  }
}

/**
 * Get rate limit config for endpoint
 * @param url API endpoint URL
 * @returns Rate limit configuration
 */
export function getRateLimitConfig(url: string): {
  maxRequests: number;
  windowMs: number;
} {
  const key = getRateLimitKey(url);
  
  if (key.startsWith('auth:')) {
    return RATE_LIMIT_CONFIG.auth;
  }
  if (key.startsWith('upload:')) {
    return RATE_LIMIT_CONFIG.upload;
  }
  if (key.startsWith('search:')) {
    return RATE_LIMIT_CONFIG.search;
  }
  
  return RATE_LIMIT_CONFIG.api;
}

