import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../db/prisma';

/**
 * JWT Payload interface
 */
export interface JwtPayload {
    id: string;
    role: 'USER' | 'ADMIN';
    iat?: number;
    exp?: number;
}

/**
 * Extend Express Request to include user
 */
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

/**
 * Verify and decode JWT token
 */
export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, env.jwtSecret) as JwtPayload;
};

/**
 * Sign a new access token
 */
export const signAccessToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
};

/**
 * Sign a new refresh token
 */
export const signRefreshToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
    return jwt.sign(payload, env.refreshSecret, { expiresIn: env.refreshExpiresIn });
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, env.refreshSecret) as JwtPayload;
};

/**
 * isAuthenticated middleware
 * Verifies JWT token and attaches user to request
 */
export const isAuthenticated = async (
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
};

/**
 * isAdmin middleware
 * Must be used after isAuthenticated
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
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
};

/**
 * Optional authentication middleware
 * Attaches user if token is valid, continues otherwise
 */
export const optionalAuth = async (
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
};
