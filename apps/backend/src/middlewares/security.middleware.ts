import { Application, RequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { env } from '../config/env';

/**
 * Apply all security middlewares to the Express app
 */
export const applySecurityMiddlewares = (app: Application): void => {
    // Helmet - Security headers
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    imgSrc: ["'self'", 'data:', 'https:'],
                    scriptSrc: ["'self'"],
                },
            },
            crossOriginEmbedderPolicy: false,
            crossOriginResourcePolicy: { policy: 'cross-origin' },
        })
    );

    // CORS - Cross-Origin Resource Sharing
    app.use(
        cors({
            origin: env.corsOrigin.split(',').map((origin) => origin.trim()),
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
            exposedHeaders: ['X-Total-Count', 'X-Page', 'X-Limit'],
            maxAge: 86400, // 24 hours
        })
    );

    // MongoDB Sanitization - Prevent NoSQL injection
    app.use(
        mongoSanitize({
            replaceWith: '_',
            onSanitize: ({ req, key }) => {
                console.warn(`Sanitized request field: ${key} in ${req.path}`);
            },
        }) as unknown as RequestHandler
    );

    // Global rate limiter
    app.use(
        rateLimit({
            windowMs: env.rateLimitWindowMs,
            max: env.rateLimitMax,
            standardHeaders: true,
            legacyHeaders: false,
            message: {
                success: false,
                message: 'Too many requests, please try again later.',
            },
            skip: (req) => {
                // Skip rate limiting for health checks
                return req.path === '/health' || req.path === '/';
            },
        }) as unknown as RequestHandler
    );
};

/**
 * Login-specific rate limiter (stricter)
 */
export const loginRateLimiter = rateLimit({
    windowMs: env.loginRateLimitWindowMs,
    max: env.loginRateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many login attempts, please try again later.',
    },
    keyGenerator: (req) => {
        // Rate limit by IP + email combination
        const email = req.body?.email || '';
        return `${req.ip}-${email}`;
    },
}) as unknown as RequestHandler;

/**
 * API rate limiter for authenticated users (more lenient)
 */
export const apiRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'API rate limit exceeded, please slow down.',
    },
}) as unknown as RequestHandler;

/**
 * Admin API rate limiter
 */
export const adminRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 50, // 50 requests per minute for admin operations
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Admin rate limit exceeded.',
    },
}) as unknown as RequestHandler;
