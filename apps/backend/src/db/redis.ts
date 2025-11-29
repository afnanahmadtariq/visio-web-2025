import { Redis } from '@upstash/redis';
import { env } from '../config/env';

let redis: Redis | null = null;

/**
 * Get Redis client instance
 * Uses Upstash Redis for caching and rate limiting
 */
export function getRedis(): Redis | null {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

// Cache key prefixes
export const CACHE_KEYS = {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
} as const;

// Default TTLs in seconds
export const CACHE_TTL = {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  PRODUCT_LIST: 60, // 1 minute
  PRODUCT_DETAIL: 120, // 2 minutes
  USER_SESSION: 900, // 15 minutes
  STOCK: 30, // 30 seconds
=======
=======
>>>>>>> Stashed changes
    PRODUCT_LIST: 60, // 1 minute
    PRODUCT_DETAIL: 120, // 2 minutes
    USER_SESSION: 900, // 15 minutes
    STOCK: 30, // 30 seconds
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
} as const;

/**
 * Invalidate product-related caches
 * Called after admin CRUD operations
 */
export async function invalidateProductCaches(productId?: string): Promise<void> {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

export { redis };
export default { getRedis, CACHE_KEYS, CACHE_TTL, invalidateProductCaches };
