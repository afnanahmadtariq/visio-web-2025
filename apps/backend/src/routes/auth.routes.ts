import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { loginRateLimiter } from '../middlewares/security.middleware';
import {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  RegisterSchema,
  LoginSchema,
  ChangePasswordSchema,
=======
    RegisterSchema,
    LoginSchema,
    ChangePasswordSchema,
>>>>>>> Stashed changes
=======
    RegisterSchema,
    LoginSchema,
    ChangePasswordSchema,
>>>>>>> Stashed changes
} from '../validations/auth.validation';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  '/register',
  validateRequest(RegisterSchema),
  authController.register
=======
    '/register',
    validateRequest(RegisterSchema),
    authController.register
>>>>>>> Stashed changes
=======
    '/register',
    validateRequest(RegisterSchema),
    authController.register
>>>>>>> Stashed changes
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  '/login',
  loginRateLimiter,
  validateRequest(LoginSchema),
  authController.login
=======
=======
>>>>>>> Stashed changes
    '/login',
    loginRateLimiter,
    validateRequest(LoginSchema),
    authController.login
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', authController.refreshToken);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Public
 */
router.post('/logout', authController.logout);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', isAuthenticated, authController.getProfile);

/**
 * @route   PUT /api/auth/password
 * @desc    Change password
 * @access  Private
 */
router.put(
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  '/password',
  isAuthenticated,
  validateRequest(ChangePasswordSchema),
  authController.changePassword
=======
=======
>>>>>>> Stashed changes
    '/password',
    isAuthenticated,
    validateRequest(ChangePasswordSchema),
    authController.changePassword
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
);

export default router;
