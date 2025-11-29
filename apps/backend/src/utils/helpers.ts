import bcrypt from 'bcrypt';
import { env } from '../config/env';

/**
 * Hash a password using bcrypt
 */
export const hashPassword = async (password: string): Promise<string> => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return bcrypt.hash(password, env.bcryptRounds);
=======
    return bcrypt.hash(password, env.bcryptRounds);
>>>>>>> Stashed changes
=======
    return bcrypt.hash(password, env.bcryptRounds);
>>>>>>> Stashed changes
};

/**
 * Compare a password with a hash
 */
export const comparePassword = async (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
=======
=======
>>>>>>> Stashed changes
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Generate a random string
 */
export const generateRandomString = (length: number = 32): string => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
=======
=======
>>>>>>> Stashed changes
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    for (let i = 0; i < length; i++) {
        result += chars[randomValues[i] % chars.length];
    }
    return result;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Generate a slug from a string
 */
export const generateSlug = (text: string): string => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
=======
=======
>>>>>>> Stashed changes
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Calculate discounted price
 */
export const calculateDiscountedPrice = (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  price: number,
  salePercent: number | null | undefined
): number => {
  if (!salePercent || salePercent <= 0) return price;
  return price * (1 - salePercent / 100);
=======
=======
>>>>>>> Stashed changes
    price: number,
    salePercent: number | null | undefined
): number => {
    if (!salePercent || salePercent <= 0) return price;
    return price * (1 - salePercent / 100);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Format currency
 */
export const formatCurrency = (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
=======
=======
>>>>>>> Stashed changes
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US'
): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Paginate array
 */
export const paginate = <T>(
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  array: T[],
  page: number,
  limit: number
): {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
} => {
  const total = array.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const data = array.slice(offset, offset + limit);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
=======
=======
>>>>>>> Stashed changes
    array: T[],
    page: number,
    limit: number
): {
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
} => {
    const total = array.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const data = array.slice(offset, offset + limit);

    return {
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        },
    };
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Create pagination metadata
 */
export const createPaginationMeta = (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  total: number,
  page: number,
  limit: number
) => {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
=======
=======
>>>>>>> Stashed changes
    total: number,
    page: number,
    limit: number
) => {
    const totalPages = Math.ceil(total / limit);
    return {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
    };
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Sleep utility for delays
 */
export const sleep = (ms: number): Promise<void> => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return new Promise((resolve) => setTimeout(resolve, ms));
=======
    return new Promise((resolve) => setTimeout(resolve, ms));
>>>>>>> Stashed changes
=======
    return new Promise((resolve) => setTimeout(resolve, ms));
>>>>>>> Stashed changes
};

/**
 * Omit properties from an object
 */
export const omit = <T extends object, K extends keyof T>(
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
=======
=======
>>>>>>> Stashed changes
    obj: T,
    keys: K[]
): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);
    return result;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Pick properties from an object
 */
export const pick = <T extends object, K extends keyof T>(
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
=======
=======
>>>>>>> Stashed changes
    obj: T,
    keys: K[]
): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};
