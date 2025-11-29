import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../db/prisma';

/**
 * JWT Payload interface
 */
export interface JwtPayload {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  id: string;
  role: 'USER' | 'ADMIN';
  iat?: number;
  exp?: number;
=======
=======
>>>>>>> Stashed changes
    id: string;
    role: 'USER' | 'ADMIN';
    iat?: number;
    exp?: number;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

/**
 * Extend Express Request to include user
 */
declare global {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
=======
=======
>>>>>>> Stashed changes
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

/**
 * Verify and decode JWT token
 */
export const verifyAccessToken = (token: string): JwtPayload => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
=======
    return jwt.verify(token, env.jwtSecret) as JwtPayload;
>>>>>>> Stashed changes
=======
    return jwt.verify(token, env.jwtSecret) as JwtPayload;
>>>>>>> Stashed changes
};

/**
 * Sign a new access token
 */
export const signAccessToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
=======
    return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
>>>>>>> Stashed changes
=======
    return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
>>>>>>> Stashed changes
};

/**
 * Sign a new refresh token
 */
export const signRefreshToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return jwt.sign(payload, env.refreshSecret, { expiresIn: env.refreshExpiresIn });
=======
    return jwt.sign(payload, env.refreshSecret, { expiresIn: env.refreshExpiresIn });
>>>>>>> Stashed changes
=======
    return jwt.sign(payload, env.refreshSecret, { expiresIn: env.refreshExpiresIn });
>>>>>>> Stashed changes
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token: string): JwtPayload => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return jwt.verify(token, env.refreshSecret) as JwtPayload;
=======
    return jwt.verify(token, env.refreshSecret) as JwtPayload;
>>>>>>> Stashed changes
=======
    return jwt.verify(token, env.refreshSecret) as JwtPayload;
>>>>>>> Stashed changes
};

/**
 * isAuthenticated middleware
 * Verifies JWT token and attaches user to request
 */
export const isAuthenticated = async (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Invalid authentication token',
      });
      return;
    }

    const payload = verifyAccessToken(token);

    // Verify user still exists and is not locked
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, role: true, isLocked: true, deletedAt: true },
    });

    if (!user || user.deletedAt || user.isLocked) {
      res.status(401).json({
        success: false,
        message: 'Account is locked or does not exist',
      });
      return;
    }

    // Verify role hasn't changed
    if (user.role !== payload.role) {
      res.status(401).json({
        success: false,
        message: 'Token is stale, please re-authenticate',
      });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: 'Token has expired',
        code: 'TOKEN_EXPIRED',
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
      return;
    }

    next(error);
  }
=======
=======
>>>>>>> Stashed changes
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
            return;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Invalid authentication token',
            });
            return;
        }

        const payload = verifyAccessToken(token);

        // Verify user still exists and is not locked
        const user = await prisma.user.findUnique({
            where: { id: payload.id },
            select: { id: true, role: true, isLocked: true, deletedAt: true },
        });

        if (!user || user.deletedAt || user.isLocked) {
            res.status(401).json({
                success: false,
                message: 'Account is locked or does not exist',
            });
            return;
        }

        // Verify role hasn't changed
        if (user.role !== payload.role) {
            res.status(401).json({
                success: false,
                message: 'Token is stale, please re-authenticate',
            });
            return;
        }

        req.user = payload;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                success: false,
                message: 'Token has expired',
                code: 'TOKEN_EXPIRED',
            });
            return;
        }

        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
            return;
        }

        next(error);
    }
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * isAdmin middleware
 * Must be used after isAuthenticated
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
    return;
  }

  if (req.user.role !== 'ADMIN') {
    res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
    return;
  }

  next();
=======
=======
>>>>>>> Stashed changes
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: 'Authentication required',
        });
        return;
    }

    if (req.user.role !== 'ADMIN') {
        res.status(403).json({
            success: false,
            message: 'Admin access required',
        });
        return;
    }

    next();
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Optional authentication middleware
 * Attaches user if token is valid, continues otherwise
 */
export const optionalAuth = async (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      next();
      return;
    }

    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch {
    // Ignore errors for optional auth
    next();
  }
=======
=======
>>>>>>> Stashed changes
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            next();
            return;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            next();
            return;
        }

        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    } catch {
        // Ignore errors for optional auth
        next();
    }
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};
