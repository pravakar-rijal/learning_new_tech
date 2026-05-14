const { param, body } = require('express-validator');

exports.getBillValidation = [
    param('id')
    .isUUID().withMessage('Invalid Bill Id')
];

exports.createBillValidation = [
    body('title')
    .notEmpty().withMessage('Title is required'),
  
  body('totalAmount')
    .notEmpty().withMessage('Total Amount is required')
    .isNumeric().withMessage('Total Amount must be a number'),
  
  body('groupId')
    .notEmpty().withMessage('Group ID is required')
    .isUUID().withMessage('Group ID must be a valid UUID'),
]