/**
 * Next.js Instrumentation Hook
 * Runs once when the server starts
 * 
 * Use this to initialize monitoring, validate environment variables, etc.
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side only
    const { validateAndLogEnvironmentVariables } = await import('@/lib/utils/envValidation');
    
    // Validate environment variables on server startup
    validateAndLogEnvironmentVariables();
  }
}

