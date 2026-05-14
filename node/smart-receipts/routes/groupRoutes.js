const router = require('express').Router();
const groupController = require('../controllers/groupController');
const { ensureAuthenticated, authorize} = require('../middlewares/authMiddleware');
const { ROLES } = require('../config/constants');
/**
* @swagger
* components:
*   schemas:
*     Group:
*       type: object
*       required:
*         - name
*       properties:
*         id:
*           type: string
*           format: uuid
*           description: The auto-generated UUID of the group
*         name:
*           type: string
*           description: The name of the group
*         isActive:
*           type: boolean
*           default: true
*           description: Whether the group is active
*         createdBy:
*           type: string
*           description: User ID or name who created the group
*         createdAt:
*           type: string
*           format: date-time
*           description: Timestamp of when the group was created
*         updatedBy:
*           type: string
*           description: User ID or name who last updated the group
*         updatedAt:
*           type: string
*           format: date-time
*           description: Timestamp of last update
*       example:
*         id: "0e7194a0-4091-458c-9629-d5ff3d6003c2"
*         name: "Vertex Nepal Group"
*         isActive: true
*         createdBy: "Pravakar"
*         createdAt: "2024-01-15T10:30:00.000Z"
*         updatedBy: "Pravakar"
*         updatedAt: "2024-02-01T12:00:00.000Z"
*/

/**
* @swagger
* tags:
*   name: Groups
*   description: API for managing groups
*/

/**
* @swagger
* /api/v1/groups:
*   get:
*     tags: [Groups]
*     summary: Get a list of all active groups
*     responses:
*       200:
*         description: A list of active groups
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Group'
*       500:
*         description: Server error
*/
router.get('/', ensureAuthenticated, groupController.getGroups);

/**
* @swagger
* /api/v1/groups/{id}:
*   get:
*     tags: [Groups]
*     summary: Get a group by its ID
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*           format: uuid
*         description: The UUID of the group to retrieve
*     responses:
*       200:
*         description: A single group found by its ID
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Group'
*       404:
*         description: Group not found
*       500:
*         description: Server error
*/
router.get('/:id', ensureAuthenticated,groupController.getGroup);

/**
* @swagger
* /api/v1/groups:
*   post:
*     tags: [Groups]
*     summary: Create a new group
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               groupName:
*                 type: string
*                 description: The name of the new group
*     responses:
*       201:
*         description: Group created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Group'
*       422:
*         description: Missing or invalid input
*       409:
*         description: Group name already exists
*       500:
*         description: Server error
*/
router.post('/', ensureAuthenticated, authorize([ROLES.admin]), groupController.createGroup);

/**
* @swagger
* /api/v1/groups/{id}:
*   patch:
*     tags: [Groups]
*     summary: Update an existing group by ID
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*           format: uuid
*         description: The UUID of the group to update
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               groupName:
*                 type: string
*                 description: The updated name of the group
*     responses:
*       200:
*         description: Group updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Group'
*       404:
*         description: Group not found
*       409:
*         description: Group name already exists
*       422:
*         description: Missing or invalid input
*       500:
*         description: Server error
*/
router.patch('/:id', ensureAuthenticated, authorize([ROLES.admin]), groupController.updateGroup);

/**
* @swagger
* /api/v1/groups/{id}:
*   delete:
*     tags: [Groups]
*     summary: Soft delete a group by its ID (mark as inactive)
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*           format: uuid
*         description: The UUID of the group to delete
*     responses:
*       200:
*         description: Group deleted successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Group'
*       404:
*         description: Group not found
*       409:
*         description: Group cannot be deleted because it's being used in bills
*       500:
*         description: Server error
*/
router.delete('/:id', ensureAuthenticated, authorize([ROLES.admin]), groupController.deleteGroup);

/**
 * @swagger
 * /api/v1/groups/add-user:
 *   post:
 *     tags: [Groups]
 *     summary: Add a user to a group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - groupId
 *               - userId
 *             properties:
 *               groupId:
 *                 type: string
 *                 format: uuid
 *               userId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: User added to the group
 *       404:
 *         description: Group or user not found
 *       409:
 *         description: User already in group
 *       500:
 *         description: Server error
 */

router.post('/add-user', ensureAuthenticated, authorize([ROLES.admin]), groupController.addUserToGroup);

module.exports = router;
