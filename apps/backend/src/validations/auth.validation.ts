import { z } from 'zod';

/**
 * User Registration Schema
 */
export const RegisterSchema = z.object({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * User Login Schema
 */
export const LoginSchema = z.object({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
=======
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
>>>>>>> Stashed changes
=======
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
>>>>>>> Stashed changes
});

/**
 * Refresh Token Schema
 */
export const RefreshTokenSchema = z.object({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  refreshToken: z.string().min(1, 'Refresh token is required'),
=======
    refreshToken: z.string().min(1, 'Refresh token is required'),
>>>>>>> Stashed changes
=======
    refreshToken: z.string().min(1, 'Refresh token is required'),
>>>>>>> Stashed changes
});

/**
 * Change Password Schema
 */
export const ChangePasswordSchema = z.object({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase, one uppercase, and one number'
    ),
=======
=======
>>>>>>> Stashed changes
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password too long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one lowercase, one uppercase, and one number'
        ),
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * User Update Profile Schema
 */
export const UpdateProfileSchema = z.object({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .optional(),
=======
=======
>>>>>>> Stashed changes
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must not exceed 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
        .optional(),
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

// Type exports
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
