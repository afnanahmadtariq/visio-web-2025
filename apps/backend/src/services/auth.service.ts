import { prisma } from '../db/prisma';
import { AuthLog } from '../db/models';
import { isMongoConnected } from '../db/mongo';
import {
<<<<<<< Updated upstream
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
=======
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
>>>>>>> Stashed changes
} from '../middlewares/auth.middleware';
import { hashPassword, comparePassword } from '../utils/helpers';
import { BadRequestError, UnauthorizedError, ConflictError } from '../middlewares/errorHandler.middleware';
import { env } from '../config/env';
import type { RegisterInput, LoginInput } from '../validations/auth.validation';

export interface AuthResult {
<<<<<<< Updated upstream
  user: {
    id: string;
    email: string;
    username: string;
    role: 'USER' | 'ADMIN';
    creditBalance: number;
  };
  accessToken: string;
  refreshToken: string;
=======
    user: {
        id: string;
        email: string;
        username: string;
        role: 'USER' | 'ADMIN';
        creditBalance: number;
    };
    accessToken: string;
    refreshToken: string;
>>>>>>> Stashed changes
}

/**
 * Register a new user
 */
export const register = async (
<<<<<<< Updated upstream
  input: RegisterInput,
  ip?: string,
  userAgent?: string
): Promise<AuthResult> => {
  const { email, username, password } = input;

  // Check if email already exists
  const existingEmail = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingEmail) {
    throw new ConflictError('Email is already registered');
  }

  // Check if username already exists
  const existingUsername = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (existingUsername) {
    throw new ConflictError('Username is already taken');
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user with initial credit bonus
  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        email,
        username,
        passwordHash,
        creditBalance: 500.0,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        creditBalance: true,
      },
    });

    // Create initial credit transaction
    await tx.creditTransaction.create({
      data: {
        userId: newUser.id,
        amount: 500.0,
        type: 'INITIAL_BONUS',
        note: 'Welcome bonus credit',
      },
    });

    return newUser;
  });

  // Log registration
  if (isMongoConnected()) {
    await AuthLog.create({
      type: 'REGISTER',
      email,
      userId: user.id,
      ip,
      userAgent,
    });
  }

  // Generate tokens
  const accessToken = signAccessToken({ id: user.id, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id, role: user.role });

  return {
    user: {
      ...user,
      creditBalance: Number(user.creditBalance),
    },
    accessToken,
    refreshToken,
  };
=======
    input: RegisterInput,
    ip?: string,
    userAgent?: string
): Promise<AuthResult> => {
    const { email, username, password } = input;

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
    });

    if (existingEmail) {
        throw new ConflictError('Email is already registered');
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findUnique({
        where: { username },
        select: { id: true },
    });

    if (existingUsername) {
        throw new ConflictError('Username is already taken');
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user with initial credit bonus
    const user = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
            data: {
                email,
                username,
                passwordHash,
                creditBalance: 500.0,
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                creditBalance: true,
            },
        });

        // Create initial credit transaction
        await tx.creditTransaction.create({
            data: {
                userId: newUser.id,
                amount: 500.0,
                type: 'INITIAL_BONUS',
                note: 'Welcome bonus credit',
            },
        });

        return newUser;
    });

    // Log registration
    if (isMongoConnected()) {
        await AuthLog.create({
            type: 'REGISTER',
            email,
            userId: user.id,
            ip,
            userAgent,
        });
    }

    // Generate tokens
    const accessToken = signAccessToken({ id: user.id, role: user.role });
    const refreshToken = signRefreshToken({ id: user.id, role: user.role });

    return {
        user: {
            ...user,
            creditBalance: Number(user.creditBalance),
        },
        accessToken,
        refreshToken,
    };
>>>>>>> Stashed changes
};

/**
 * Login user
 */
export const login = async (
<<<<<<< Updated upstream
  input: LoginInput,
  ip?: string,
  userAgent?: string
): Promise<AuthResult> => {
  const { email, password } = input;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      passwordHash: true,
      creditBalance: true,
      isLocked: true,
      failedLoginCount: true,
      deletedAt: true,
    },
  });

  // User not found or soft deleted
  if (!user || user.deletedAt) {
    // Log failed attempt
    if (isMongoConnected()) {
      await AuthLog.create({
        type: 'LOGIN_FAIL',
        email,
        ip,
        userAgent,
        meta: { reason: 'user_not_found' },
      });
    }
    throw new UnauthorizedError('Invalid email or password');
  }

  // Check if account is locked
  if (user.isLocked) {
    if (isMongoConnected()) {
      await AuthLog.create({
        type: 'LOGIN_FAIL',
        email,
        userId: user.id,
        ip,
        userAgent,
        meta: { reason: 'account_locked' },
      });
    }
    throw new UnauthorizedError('Account is locked. Please contact support.');
  }

  // No password (OAuth user)
  if (!user.passwordHash) {
    throw new BadRequestError('Please login using your OAuth provider');
  }

  // Verify password
  const isPasswordValid = await comparePassword(password, user.passwordHash);

  if (!isPasswordValid) {
    // Increment failed login count
    const newFailedCount = user.failedLoginCount + 1;
    const shouldLock = newFailedCount >= env.maxFailedLoginAttempts;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginCount: newFailedCount,
        isLocked: shouldLock,
      },
    });

    // Log failed attempt
    if (isMongoConnected()) {
      await AuthLog.create({
        type: 'LOGIN_FAIL',
        email,
        userId: user.id,
        ip,
        userAgent,
        meta: {
          reason: 'invalid_password',
          failedCount: newFailedCount,
          locked: shouldLock,
        },
      });
    }

    throw new UnauthorizedError('Invalid email or password');
  }

  // Successful login - reset failed count and update last login
  await prisma.user.update({
    where: { id: user.id },
    data: {
      failedLoginCount: 0,
      lastLoginAt: new Date(),
    },
  });

  // Log successful login
  if (isMongoConnected()) {
    await AuthLog.create({
      type: 'LOGIN_SUCCESS',
      email,
      userId: user.id,
      ip,
      userAgent,
    });
  }

  // Generate tokens
  const accessToken = signAccessToken({ id: user.id, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id, role: user.role });

  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      creditBalance: Number(user.creditBalance),
    },
    accessToken,
    refreshToken,
  };
=======
    input: LoginInput,
    ip?: string,
    userAgent?: string
): Promise<AuthResult> => {
    const { email, password } = input;

    // Find user
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            username: true,
            role: true,
            passwordHash: true,
            creditBalance: true,
            isLocked: true,
            failedLoginCount: true,
            deletedAt: true,
        },
    });

    // User not found or soft deleted
    if (!user || user.deletedAt) {
        // Log failed attempt
        if (isMongoConnected()) {
            await AuthLog.create({
                type: 'LOGIN_FAIL',
                email,
                ip,
                userAgent,
                meta: { reason: 'user_not_found' },
            });
        }
        throw new UnauthorizedError('Invalid email or password');
    }

    // Check if account is locked
    if (user.isLocked) {
        if (isMongoConnected()) {
            await AuthLog.create({
                type: 'LOGIN_FAIL',
                email,
                userId: user.id,
                ip,
                userAgent,
                meta: { reason: 'account_locked' },
            });
        }
        throw new UnauthorizedError('Account is locked. Please contact support.');
    }

    // No password (OAuth user)
    if (!user.passwordHash) {
        throw new BadRequestError('Please login using your OAuth provider');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
        // Increment failed login count
        const newFailedCount = user.failedLoginCount + 1;
        const shouldLock = newFailedCount >= env.maxFailedLoginAttempts;

        await prisma.user.update({
            where: { id: user.id },
            data: {
                failedLoginCount: newFailedCount,
                isLocked: shouldLock,
            },
        });

        // Log failed attempt
        if (isMongoConnected()) {
            await AuthLog.create({
                type: 'LOGIN_FAIL',
                email,
                userId: user.id,
                ip,
                userAgent,
                meta: {
                    reason: 'invalid_password',
                    failedCount: newFailedCount,
                    locked: shouldLock,
                },
            });
        }

        throw new UnauthorizedError('Invalid email or password');
    }

    // Successful login - reset failed count and update last login
    await prisma.user.update({
        where: { id: user.id },
        data: {
            failedLoginCount: 0,
            lastLoginAt: new Date(),
        },
    });

    // Log successful login
    if (isMongoConnected()) {
        await AuthLog.create({
            type: 'LOGIN_SUCCESS',
            email,
            userId: user.id,
            ip,
            userAgent,
        });
    }

    // Generate tokens
    const accessToken = signAccessToken({ id: user.id, role: user.role });
    const refreshToken = signRefreshToken({ id: user.id, role: user.role });

    return {
        user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            creditBalance: Number(user.creditBalance),
        },
        accessToken,
        refreshToken,
    };
>>>>>>> Stashed changes
};

/**
 * Refresh tokens
 */
export const refreshTokens = async (token: string): Promise<{ accessToken: string; refreshToken: string }> => {
<<<<<<< Updated upstream
  try {
    const payload = verifyRefreshToken(token);

    // Verify user still exists and is valid
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, role: true, isLocked: true, deletedAt: true },
    });

    if (!user || user.isLocked || user.deletedAt) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    // Generate new tokens
    const accessToken = signAccessToken({ id: user.id, role: user.role });
    const refreshToken = signRefreshToken({ id: user.id, role: user.role });

    return { accessToken, refreshToken };
  } catch {
    throw new UnauthorizedError('Invalid or expired refresh token');
  }
=======
    try {
        const payload = verifyRefreshToken(token);

        // Verify user still exists and is valid
        const user = await prisma.user.findUnique({
            where: { id: payload.id },
            select: { id: true, role: true, isLocked: true, deletedAt: true },
        });

        if (!user || user.isLocked || user.deletedAt) {
            throw new UnauthorizedError('Invalid refresh token');
        }

        // Generate new tokens
        const accessToken = signAccessToken({ id: user.id, role: user.role });
        const refreshToken = signRefreshToken({ id: user.id, role: user.role });

        return { accessToken, refreshToken };
    } catch {
        throw new UnauthorizedError('Invalid or expired refresh token');
    }
>>>>>>> Stashed changes
};

/**
 * Get user profile
 */
export const getProfile = async (userId: string) => {
<<<<<<< Updated upstream
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      creditBalance: true,
      createdAt: true,
      lastLoginAt: true,
      addresses: {
        where: { deletedAt: null },
        orderBy: { isDefault: 'desc' },
      },
    },
  });

  if (!user) {
    throw new UnauthorizedError('User not found');
  }

  return {
    ...user,
    creditBalance: Number(user.creditBalance),
  };
=======
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            username: true,
            role: true,
            creditBalance: true,
            createdAt: true,
            lastLoginAt: true,
            addresses: {
                where: { deletedAt: null },
                orderBy: { isDefault: 'desc' },
            },
        },
    });

    if (!user) {
        throw new UnauthorizedError('User not found');
    }

    return {
        ...user,
        creditBalance: Number(user.creditBalance),
    };
>>>>>>> Stashed changes
};

/**
 * Change password
 */
export const changePassword = async (
<<<<<<< Updated upstream
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { passwordHash: true },
  });

  if (!user?.passwordHash) {
    throw new BadRequestError('Cannot change password for OAuth accounts');
  }

  const isValid = await comparePassword(currentPassword, user.passwordHash);
  if (!isValid) {
    throw new UnauthorizedError('Current password is incorrect');
  }

  const newHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newHash },
  });
};

export const authService = {
  register,
  login,
  refreshTokens,
  getProfile,
  changePassword,
=======
    userId: string,
    currentPassword: string,
    newPassword: string
): Promise<void> => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { passwordHash: true },
    });

    if (!user?.passwordHash) {
        throw new BadRequestError('Cannot change password for OAuth accounts');
    }

    const isValid = await comparePassword(currentPassword, user.passwordHash);
    if (!isValid) {
        throw new UnauthorizedError('Current password is incorrect');
    }

    const newHash = await hashPassword(newPassword);
    await prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newHash },
    });
};

export const authService = {
    register,
    login,
    refreshTokens,
    getProfile,
    changePassword,
>>>>>>> Stashed changes
};

export default authService;
