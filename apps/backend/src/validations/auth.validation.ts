import { z } from 'zod';

// Base schemas for field definitions
const registerBodySchema = z.object({
    email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required')
        .max(255, 'Email too long'),
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must not exceed 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password too long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one lowercase, one uppercase, and one number'
        ),
});

const loginBodySchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});

const refreshTokenBodySchema = z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
});

const changePasswordBodySchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password too long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one lowercase, one uppercase, and one number'
        ),
});

const updateProfileBodySchema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must not exceed 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
        .optional(),
});

/**
 * User Registration Schema (wrapped for validateRequest middleware)
 */
export const RegisterSchema = z.object({
    body: registerBodySchema,
});

/**
 * User Login Schema (wrapped for validateRequest middleware)
 */
export const LoginSchema = z.object({
    body: loginBodySchema,
});

/**
 * Refresh Token Schema (wrapped for validateRequest middleware)
 */
export const RefreshTokenSchema = z.object({
    body: refreshTokenBodySchema,
});

/**
 * Change Password Schema (wrapped for validateRequest middleware)
 */
export const ChangePasswordSchema = z.object({
    body: changePasswordBodySchema,
});

/**
 * User Update Profile Schema (wrapped for validateRequest middleware)
 */
export const UpdateProfileSchema = z.object({
    body: updateProfileBodySchema,
});

// Type exports (extract body types for controller use)
export type RegisterInput = z.infer<typeof registerBodySchema>;
export type LoginInput = z.infer<typeof loginBodySchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenBodySchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordBodySchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileBodySchema>;
