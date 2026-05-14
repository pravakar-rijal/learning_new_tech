const router = require('express').Router();
const paymentController = require('../controllers/paymentController');
const { ensureAuthenticated, authorize } = require('../middlewares/authMiddleware');
const { ROLES } = require('../config/constants');

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: API endpoints for managing payments
 */

/**
 * @swagger
 * /api/v1/payments:
 *   get:
 *     tags: [Payments]
 *     summary: Get all payments
 *     responses:
 *       200:
 *         description: A list of all payments
 */
router.get('/', ensureAuthenticated, authorize([ROLES.admin]),paymentController.getPayments);

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   get:
 *     tags: [Payments]
 *     summary: Get a payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment not found
 */
router.get('/:id', ensureAuthenticated, authorize([ROLES.admin, ROLES.member]), paymentController.getPayment);

/**
 * @swagger
 * /api/v1/payments/bill/{billId}:
 *   get:
 *     tags: [Payments]
 *     summary: Get all payments for a bill
 */
router.get('/bill/:billId', ensureAuthenticated, authorize([ROLES.admin]), paymentController.getPaymentsByBill);

/**
 * @swagger
 * /api/v1/payments/user/{userId}:
 *   get:
 *     tags: [Payments]
 *     summary: Get all payments by a user
 */
router.get('/user/:userId', ensureAuthenticated, authorize([ROLES.admin], [ROLES.member]), paymentController.getPaymentsByUser);

/**
 * @swagger
 * /api/v1/payments:
 *   post:
 *     tags: [Payments]
 *     summary: Create a new payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - userId
 *               - billId
 *               - amount
 *             properties:
 *               name:
 *                 type: string
 *               userId:
 *                 type: string
 *               billId:
 *                 type: string
 *               amount:
 *                 type: number
 *                 format: decimal
 *     responses:
 *       201:
 *         description: Payment created
 */
router.post('/', ensureAuthenticated, authorize([ROLES.admin, ROLES.member]), paymentController.createPayment);

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   patch:
 *     tags: [Payments]
 *     summary: Update a payment
 */
router.patch('/:id', ensureAuthenticated, authorize([ROLES.admin]), paymentController.updatePayment);

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   delete:
 *     tags: [Payments]
 *     summary: Delete (soft) a payment
 */
router.delete('/:id', ensureAuthenticated, authorize([ROLES.admin]), paymentController.deletePayment);

module.exports = router;
