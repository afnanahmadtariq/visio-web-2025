import { Redis } from '@upstash/redis';
import { env } from '../config/env';

let redis: Redis | null = null;

/**
 * Get Redis client instance
 * Uses Upstash Redis for caching and rate limiting
 */
export function getRedis(): Redis | null {
    if (redis) return redis;

    if (!env.redisUrl || !env.redisToken) {
        console.warn('Redis not configured, caching features will be disabled');
        return null;
    }

    try {
        redis = new Redis({
            url: env.redisUrl,
            token: env.redisToken,
        });
        console.log('Redis client initialized');
        return redis;
    } catch (error) {
        console.error('Redis initialization failed:', error);
        return null;
    }
}

// Cache key prefixes
export const CACHE_KEYS = {
    // Product keys
    PRODUCT_BY_ID: (id: string) => `product:id:${id}`,
    PRODUCT_LIST_ALL: 'product:list:all',
    PRODUCT_LIST_CATEGORY: (slug: string) => `product:list:category:${slug}`,
    PRODUCT_LIST_SALES: 'product:list:sales',

    // User keys
    USER_RECENT: (userId: string) => `user:recent:${userId}`,
    USER_RECOMMEND: (userId: string) => `user:recommend:${userId}`,

    // Rate limiting keys
    RATE_LIMIT_IP: (ip: string) => `ratelimit:ip:${ip}`,
    RATE_LIMIT_USER: (userId: string) => `ratelimit:user:${userId}`,

    // Stock keys
    STOCK: (productId: string) => `stock:${productId}`,
} as const;

// Default TTLs in seconds
export const CACHE_TTL = {
    PRODUCT_LIST: 60, // 1 minute
    PRODUCT_DETAIL: 120, // 2 minutes
    USER_SESSION: 900, // 15 minutes
    STOCK: 30, // 30 seconds
} as const;

/**
 * Invalidate product-related caches
 * Called after admin CRUD operations
 */
export async function invalidateProductCaches(productId?: string): Promise<void> {
    const client = getRedis();
    if (!client) return;

    try {
        const keysToDelete = [
            CACHE_KEYS.PRODUCT_LIST_ALL,
            CACHE_KEYS.PRODUCT_LIST_SALES,
        ];

        if (productId) {
            keysToDelete.push(CACHE_KEYS.PRODUCT_BY_ID(productId));
        }

        // Delete all category caches (pattern matching would require scan)
        // For simplicity, we'll delete known keys
        await Promise.all(keysToDelete.map((key) => client.del(key)));
    } catch (error) {
        console.error('Failed to invalidate product caches:', error);
    }
}

export { redis };
export default { getRedis, CACHE_KEYS, CACHE_TTL, invalidateProductCaches };
