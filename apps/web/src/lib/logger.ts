/**
 * Logger Structuré Frontend
 * Logging structuré pour le frontend avec niveaux et contexte
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  private log(level: LogLevel, message: string, context?: LogContext, error?: Error): void {
    if (this.isDevelopment) {
      const formatted = this.formatMessage(level, message, context);
      
      switch (level) {
        case 'debug':
          console.debug(formatted);
          break;
        case 'info':
          console.info(formatted);
          break;
        case 'warn':
          console.warn(formatted);
          break;
        case 'error':
          console.error(formatted, error);
          break;
      }
    }

    // En production, envoyer à votre service de logging
    if (this.isProduction && level === 'error') {
      // Exemple: envoyer à Sentry, LogRocket, etc.
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(error || new Error(message), {
          contexts: {
            custom: context,
          },
        });
      }
    }
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error, context?: LogContext): void {
    this.log('error', message, context, error);
  }

  // Méthodes spécialisées
  apiError(endpoint: string, error: Error, statusCode?: number): void {
    this.error(`API Error: ${endpoint}`, error, {
      endpoint,
      statusCode,
      type: 'api',
    });
  }

  userAction(action: string, context?: LogContext): void {
    this.info(`User Action: ${action}`, {
      ...context,
      type: 'user_action',
    });
  }

  performance(metric: string, value: number, unit: string = 'ms'): void {
    this.info(`Performance: ${metric}`, {
      metric,
      value,
      unit,
      type: 'performance',
    });
  }
}

export const logger = new Logger();

