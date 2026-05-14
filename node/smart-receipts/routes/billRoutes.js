const router = require('express').Router();
const { ROLES } = require('../config/constants');
const billController = require('../controllers/billController');
const { ensureAuthenticated, authorize} = require('../middlewares/authMiddleware');
const validateResult = require('../middlewares/validateRequest');
const { getBillValidation, createBillValidation } = require('../validators/billValidator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Bill:
 *       type: object
 *       required:
 *         - title
 *         - totalAmount
 *         - groupId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated UUID of the bill
 *         title:
 *           type: string
 *           description: The title of the bill
 *         totalAmount:
 *           type: number
 *           format: float
 *           description: The total amount of the bill
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Whether the bill is active
 *         groupId:
 *           type: string
 *           format: uuid
 *           description: The ID of the group this bill belongs to
 *         group:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               description: The ID of the group
 *             name:
 *               type: string
 *               description: The name of the group
 *         createdBy:
 *           type: string
 *           description: User who created the bill
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the bill was created
 *         updatedBy:
 *           type: string
 *           description: User who last updated the bill
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the bill was last updated
 *       example:
 *         id: "b2314193-4708-4996-b5a7-cd301875dcb3"
 *         title: "Electricity Bill"
 *         totalAmount: 200.50
 *         isActive: true
 *         groupId: "6bcf5a0d-5f42-4cf9-b7e7-516c909b5d1f"
 *         group:
 *           id: "6bcf5a0d-5f42-4cf9-b7e7-516c909b5d1f"
 *           name: "Vertex Nepal Group"
 *         createdBy: "Pravakar"
 *         createdAt: "2024-04-01T10:00:00.000Z"
 *         updatedBy: "Pravakar"
 *         updatedAt: "2024-04-10T12:00:00.000Z"
 */

/**
 * @swagger
 * tags:
 *   name: Bills
 *   description: API for managing bills
 */

/**
 * @swagger
 * /api/v1/bills:
 *   get:
 *     tags: [Bills]
 *     summary: Get all active bills
 *     responses:
 *       200:
 *         description: A list of active bills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bill'
 *       500:
 *         description: Server error
 */
router.get('/', ensureAuthenticated, billController.getBills);

/**
 * @swagger
 * /api/v1/bills/{id}:
 *   get:
 *     tags: [Bills]
 *     summary: Get a bill by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the bill to retrieve
 *     responses:
 *       200:
 *         description: A single bill found by its ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 *       404:
 *         description: Bill not found
 *       500:
 *         description: Server error
 */
router.get('/:id', ensureAuthenticated, getBillValidation, validateResult, billController.getBill);

/**
 * @swagger
 * /api/v1/bills:
 *   post:
 *     tags: [Bills]
 *     summary: Create a new bill
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - totalAmount
 *               - groupId
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the bill
 *               totalAmount:
 *                 type: number
 *                 format: float
 *                 description: The total amount of the bill
 *               groupId:
 *                 type: string
 *                 format: uuid
 *                 description: The UUID of the group associated with this bill
 *     responses:
 *       201:
 *         description: Bill created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 *       422:
 *         description: Invalid or missing input fields
 *       404:
 *         description: Group not found
 *       500:
 *         description: Server error
 */
router.post('/', ensureAuthenticated, authorize([ROLES.admin]), createBillValidation, validateResult, billController.createBill);

/**
 * @swagger
 * /api/v1/bills/{id}:
 *   patch:
 *     tags: [Bills]
 *     summary: Update an existing bill by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the bill to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the bill
 *               totalAmount:
 *                 type: number
 *                 format: float
 *                 description: The updated total amount of the bill
 *               groupId:
 *                 type: string
 *                 format: uuid
 *                 description: The updated group ID associated with this bill
 *     responses:
 *       200:
 *         description: Bill updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 *       404:
 *         description: Bill or Group not found
 *       422:
 *         description: Invalid or missing input fields
 *       500:
 *         description: Server error
 */
router.patch('/:id', ensureAuthenticated, authorize([ROLES.admin]), billController.updateBill);

/**
 * @swagger
 * /api/v1/bills/{id}:
 *   delete:
 *     tags: [Bills]
 *     summary: Soft delete a bill by ID (mark as inactive)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the bill to delete
 *     responses:
 *       204:
 *         description: Bill deleted successfully
 *       404:
 *         description: Bill not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', ensureAuthenticated, authorize([ROLES.admin]), billController.deleteBill);

/**
 * @swagger
 * /api/v1/bills/group/{groupId}:
 *   get:
 *     tags: [Bills]
 *     summary: Get all active bills by group ID
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the group to get bills for
 *     responses:
 *       200:
 *         description: A list of active bills for the group
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bill'
 *       404:
 *         description: Group not found
 *       500:
 *         description: Server error
 */
router.get('/group/:groupId', ensureAuthenticated, billController.getBillsByGroupId);

module.exports = router;
