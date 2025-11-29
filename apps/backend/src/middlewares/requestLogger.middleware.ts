import { Request, Response, NextFunction } from 'express';
import { RequestLog } from '../db/models';
import { isMongoConnected } from '../db/mongo';

/**
 * Request logging middleware
 * Logs all requests to MongoDB for analytics and debugging
 */
export const requestLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const startTime = Date.now();

  // Store original end function
  const originalEnd = res.end;

  // Override res.end to log after response
  res.end = function (
    this: Response,
    ...args: Parameters<typeof originalEnd>
  ): ReturnType<typeof originalEnd> {
    const responseTime = Date.now() - startTime;

    // Log to MongoDB asynchronously (don't wait)
    if (isMongoConnected()) {
      RequestLog.create({
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        responseTime,
        userId: req.user?.id,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        query: Object.keys(req.query).length > 0 ? req.query : undefined,
        // Don't log sensitive body data
        body: sanitizeBody(req.body),
      }).catch((err) => {
        console.error('Failed to log request:', err);
      });
    }

    // Call original end
    return originalEnd.apply(this, args);
  } as typeof originalEnd;

  next();
};

/**
 * Sanitize request body for logging
 * Removes sensitive fields
 */
function sanitizeBody(body: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!body || typeof body !== 'object') return undefined;

  const sensitiveFields = ['password', 'passwordHash', 'token', 'refreshToken', 'cvv', 'cardNumber'];
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(body)) {
    if (sensitiveFields.includes(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeBody(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}

/**
 * Simple console logger for development
 */
export const consoleLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    console.log(
      `${statusColor}${req.method}\x1b[0m ${req.path} - ${res.statusCode} (${duration}ms)`
    );
  });

  next();
};
