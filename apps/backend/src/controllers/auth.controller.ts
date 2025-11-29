import type { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.middleware';
import { authService } from '../services/auth.service';
import { successResponse } from '../utils/response';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';
import type { RegisterInput, LoginInput, ChangePasswordInput } from '../validations/auth.validation';

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const input: RegisterInput = req.body;
  const ip = req.ip || req.socket.remoteAddress;
  const userAgent = req.get('user-agent');

  const result = await authService.register(input, ip, userAgent);

  // Set refresh token in HTTP-only cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(201).json(
    successResponse({
      user: result.user,
      accessToken: result.accessToken,
    }, 'Registration successful')
  );
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const input: LoginInput = req.body;
  const ip = req.ip || req.socket.remoteAddress;
  const userAgent = req.get('user-agent');

  const result = await authService.login(input, ip, userAgent);

  // Set refresh token in HTTP-only cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.json(
    successResponse({
      user: result.user,
      accessToken: result.accessToken,
    }, 'Login successful')
  );
});

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken || req.body.refreshToken;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Refresh token required' });
  }

  const result = await authService.refreshTokens(token);

  // Update refresh token cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.json(
    successResponse({ accessToken: result.accessToken }, 'Token refreshed')
  );
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Public
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  return res.json(successResponse(null, 'Logged out successfully'));
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const profile = await authService.getProfile(userId);
  return res.json(successResponse(profile));
});

/**
 * @route   PUT /api/auth/password
 * @desc    Change password
 * @access  Private
 */
export const changePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { currentPassword, newPassword }: ChangePasswordInput = req.body;

  await authService.changePassword(userId, currentPassword, newPassword);

  return res.json(successResponse(null, 'Password changed successfully'));
});

export const authController = {
  register,
  login,
  refreshToken,
  logout,
  getProfile,
  changePassword,
};

export default authController;
