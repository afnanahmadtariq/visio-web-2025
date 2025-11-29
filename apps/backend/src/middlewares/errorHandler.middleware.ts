import { Request, Response, NextFunction } from 'express';
import { ErrorLog } from '../db/models';
import { isMongoConnected } from '../db/mongo';

/**
 * Custom API Error class
 */
export class ApiError extends Error {
<<<<<<< Updated upstream
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }
=======
    constructor(
        public statusCode: number,
        message: string,
        public code?: string,
        public details?: Record<string, unknown>
    ) {
        super(message);
        this.name = 'ApiError';
        Error.captureStackTrace(this, this.constructor);
    }
>>>>>>> Stashed changes
}

/**
 * Not Found Error
 */
export class NotFoundError extends ApiError {
<<<<<<< Updated upstream
  constructor(resource: string = 'Resource') {
    super(404, `${resource} not found`, 'NOT_FOUND');
  }
=======
    constructor(resource: string = 'Resource') {
        super(404, `${resource} not found`, 'NOT_FOUND');
    }
>>>>>>> Stashed changes
}

/**
 * Unauthorized Error
 */
export class UnauthorizedError extends ApiError {
<<<<<<< Updated upstream
  constructor(message: string = 'Unauthorized') {
    super(401, message, 'UNAUTHORIZED');
  }
=======
    constructor(message: string = 'Unauthorized') {
        super(401, message, 'UNAUTHORIZED');
    }
>>>>>>> Stashed changes
}

/**
 * Forbidden Error
 */
export class ForbiddenError extends ApiError {
<<<<<<< Updated upstream
  constructor(message: string = 'Access forbidden') {
    super(403, message, 'FORBIDDEN');
  }
=======
    constructor(message: string = 'Access forbidden') {
        super(403, message, 'FORBIDDEN');
    }
>>>>>>> Stashed changes
}

/**
 * Bad Request Error
 */
export class BadRequestError extends ApiError {
<<<<<<< Updated upstream
  constructor(message: string, details?: Record<string, unknown>) {
    super(400, message, 'BAD_REQUEST', details);
  }
=======
    constructor(message: string, details?: Record<string, unknown>) {
        super(400, message, 'BAD_REQUEST', details);
    }
>>>>>>> Stashed changes
}

/**
 * Conflict Error (e.g., duplicate entry)
 */
export class ConflictError extends ApiError {
<<<<<<< Updated upstream
  constructor(message: string = 'Resource already exists') {
    super(409, message, 'CONFLICT');
  }
=======
    constructor(message: string = 'Resource already exists') {
        super(409, message, 'CONFLICT');
    }
>>>>>>> Stashed changes
}

/**
 * Global error handler middleware
 */
export const errorHandler = async (
<<<<<<< Updated upstream
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Promise<void> => {
  // Log error to MongoDB if connected
  if (isMongoConnected()) {
    try {
      await ErrorLog.create({
        level: err instanceof ApiError && err.statusCode < 500 ? 'warn' : 'error',
        message: err.message,
        stack: err.stack,
        code: err instanceof ApiError ? err.code : undefined,
        path: req.path,
        method: req.method,
        userId: req.user?.id,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        meta: {
          body: req.body,
          query: req.query,
          params: req.params,
        },
      });
    } catch (logError) {
      console.error('Failed to log error to MongoDB:', logError);
    }
  }

  // Handle known API errors
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
      details: err.details,
    });
    return;
  }

  // Handle Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as { code?: string; meta?: Record<string, unknown> };
    
    if (prismaError.code === 'P2002') {
      res.status(409).json({
        success: false,
        message: 'A record with this value already exists',
        code: 'DUPLICATE_ENTRY',
      });
      return;
    }

    if (prismaError.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Record not found',
        code: 'NOT_FOUND',
      });
      return;
    }
  }

  // Log unexpected errors
  console.error('Unexpected error:', err);

  // Return generic error for unexpected errors
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    code: 'INTERNAL_ERROR',
  });
=======
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
): Promise<void> => {
    // Log error to MongoDB if connected
    if (isMongoConnected()) {
        try {
            await ErrorLog.create({
                level: err instanceof ApiError && err.statusCode < 500 ? 'warn' : 'error',
                message: err.message,
                stack: err.stack,
                code: err instanceof ApiError ? err.code : undefined,
                path: req.path,
                method: req.method,
                userId: req.user?.id,
                ip: req.ip,
                userAgent: req.get('user-agent'),
                meta: {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
            });
        } catch (logError) {
            console.error('Failed to log error to MongoDB:', logError);
        }
    }

    // Handle known API errors
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            code: err.code,
            details: err.details,
        });
        return;
    }

    // Handle Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        const prismaError = err as { code?: string; meta?: Record<string, unknown> };

        if (prismaError.code === 'P2002') {
            res.status(409).json({
                success: false,
                message: 'A record with this value already exists',
                code: 'DUPLICATE_ENTRY',
            });
            return;
        }

        if (prismaError.code === 'P2025') {
            res.status(404).json({
                success: false,
                message: 'Record not found',
                code: 'NOT_FOUND',
            });
            return;
        }
    }

    // Log unexpected errors
    console.error('Unexpected error:', err);

    // Return generic error for unexpected errors
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
    });
>>>>>>> Stashed changes
};

/**
 * 404 Not Found handler for unknown routes
 */
export const notFoundHandler = (req: Request, res: Response): void => {
<<<<<<< Updated upstream
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.path}`,
    code: 'ROUTE_NOT_FOUND',
  });
=======
    res.status(404).json({
        success: false,
        message: `Cannot ${req.method} ${req.path}`,
        code: 'ROUTE_NOT_FOUND',
    });
>>>>>>> Stashed changes
};

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export const asyncHandler = <T>(
<<<<<<< Updated upstream
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
=======
    fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
>>>>>>> Stashed changes
};
