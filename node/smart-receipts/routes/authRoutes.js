const express = require('express');
const {ensureAuthenticated, authenticateGoogle, authenticateGoogleCallback} = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidator');
const validateResult = require('../middlewares/validateRequest');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: API for managing accounts
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Account]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already in use
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerValidation, validateResult, authController.register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Account]
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     tags: [Account]
 *     summary: Logout a user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.get('/logout', ensureAuthenticated, authController.logout);

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   post:
 *     tags: [Account]
 *     summary: Refresh JWT access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New tokens generated successfully
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post('/refresh-token', authController.refreshToken);

/**
 * @swagger
 * /api/v1/auth/2fa/generate:
 *   get:
 *     tags: [Account]
 *     summary: Generate 2FA QR Code
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: QR code generated successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/2fa/generate', ensureAuthenticated, authController.generate2fa);

/**
 * @swagger
 * /api/v1/auth/2fa/validate:
 *   post:
 *     tags: [Account]
 *     summary: Validate 2FA TOTP code
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totp:
 *                 type: string
 *     responses:
 *       200:
 *         description: 2FA validation successful
 *       400:
 *         description: Invalid OTP
 *       401:
 *         description: Unauthorized
 */
router.post('/2fa/validate', ensureAuthenticated, authController.validate2fa);

/**
 * @swagger
 * /api/v1/auth/login/2fa:
 *   post:
 *     tags: [Account]
 *     summary: Login using 2FA
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temporaryToken:
 *                 type: string
 *               totp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid or expired temporary token or TOTP
 *       422:
 *         description: Missing fields
 */
router.post('/login/2fa', authController.login2fa);

/**
 * @swagger
 * /api/v1/auth/login/google:
 *   get:
 *     tags: [Account]
 *     summary: Initiate Google OAuth login
 *     responses:
 *       302:
 *         description: Redirect to Google login page
 */
router.get('/login/google', authenticateGoogle());

/**
 * @swagger
 * /api/v1/auth/google/callback:
 *   get:
 *     tags: [Account]
 *     summary: Google OAuth callback
 *     responses:
 *       200:
 *         description: Google login successful
 *       401:
 *         description: Google login failed
 */
router.get('/google/callback',authenticateGoogleCallback(), authController.googleCallback);



module.exports = router;
