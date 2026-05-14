const { body } = require('express-validator');
const { PrismaClient } = require('../generated/prisma');
const { comparePassword } = require('../utils/authUtils');
const prisma = new PrismaClient();

exports.registerValidation = [
    body('name')
    .notEmpty()
    .withMessage('Name is required'),

    body('email')
    .toLowerCase()
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .bail()
    .custom(async (value) => {
        const existingUser = await prisma.user.findFirst({
            where:{
                email: value
            }
        });
        if(existingUser){
            throw new Error('Email is already in use');
        }
    }),

    body('password')
    .isStrongPassword({minLength: 8, minNumbers: 1, minLowercase: 1, minSymbols: 1, minUppercase: 1})
    .withMessage('Please enter strong password (A Strong Password Consists of a minimum of 8 characters containing at least 1 number, 1 lowercase alphabet, 1 uppercase alphaber and 1 special character'),

    body('roleId')
    .optional()
    .isUUID()
    .withMessage('Role ID must be valid UUID')
    .bail()
    .custom(async (value) =>{
        const existingRole = await prisma.role.findUnique({
            where:{
                id: value
            }
        });

        if(!existingRole){
            throw new Error('Invalid Role Id')
        }
    }),
];