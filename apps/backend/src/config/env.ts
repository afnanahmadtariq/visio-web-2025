import 'dotenv/config';

/**
 * Centralized environment configuration
 * All environment variables are validated and typed here
 */
export const env = {
    // Server
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 10000,
    nodeEnv: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',

    // Database URLs
    databaseUrl: process.env.DATABASE_URL!,
    mongoUrl: process.env.MONGO_URL!,

    // Redis (Upstash)
    redisUrl: process.env.REDIS_URL!,
    redisToken: process.env.REDIS_TOKEN!,

    // JWT
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET!,
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',

    // DLL Authentication
    dllUsername: process.env.DLL_USERNAME!,
    dllPassword: process.env.DLL_PASSWORD!,

    // CORS
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

    // Cloudinary
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,

    // Rate Limiting
    rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 200,
    loginRateLimitWindowMs: Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MS) || 5 * 60 * 1000, // 5 minutes
    loginRateLimitMax: Number(process.env.LOGIN_RATE_LIMIT_MAX) || 10,

    // Security
    bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 12,
    maxFailedLoginAttempts: Number(process.env.MAX_FAILED_LOGIN_ATTEMPTS) || 5,

    // EmailJS
    EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
    EMAILJS_PRIVATE_KEY: process.env.EMAILJS_PRIVATE_KEY,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
} as const;

/**
 * Validate required environment variables
 * Throws error if critical variables are missing
 */
export function validateEnv(): void {
    const required = [
        'DATABASE_URL',
        'JWT_SECRET',
        'REFRESH_TOKEN_SECRET',
    ];

    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

export default env;
