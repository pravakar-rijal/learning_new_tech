const { hashPassword, comparePassword, generateTemporaryToken, generateAccessToken, generateRefreshToken, verifyToken, generateQrCode, generate2faSecret, verifyTOTP, verifyTemporaryToken } = require('../utils/authUtils');
const { PrismaClient } = require('../generated/prisma');
const passport = require('passport');
const AppError = require('../utils/appError');
const { ROLES } = require('../config/constants');

const prisma = new PrismaClient();

exports.registerUser = async (name, email, password, roleId) => {
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        roleId: roleId || ROLES.member,
      },
      include:{
        role: true
      },
      omit:{
        roleId: true,
        googleProfileId: true,
        password: true,
        isActive: true,
        enable2Fa: true,
        secret2Fa: true
      }
    });

    return newUser;
};

exports.loginUser = async (email, password) => {
    if(!email || !password){
        throw new AppError("All fields are required.", 422);
    }

    const user = await prisma.user.findUnique({
         where: {
             email 
            } 
        });

    if (!user) {
        throw new AppError('Invalid email or password', 404);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new AppError('Invalid email or password', 400);
    }

    if(user.enable2Fa){
        const temporaryToken = generateTemporaryToken(user);
        return ({temporaryToken, expiresInSeconds: process.env.TEMP_TOKEN_EXPIRES_IN});
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.userRefreshToken.create({
      data:{
        userId: user.id,
        token: refreshToken
      }
    });

    const loginCredentials = {
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken
      }

    return loginCredentials;
};

exports.logoutUser = async (userId, accessToken) => {
  await prisma.userRefreshToken.deleteMany({
      where:{
        userId
      }
    });

    await prisma.userInvalidToken.create({
      data:{
        userId,
        accessToken: accessToken.value,
        expirationTime: accessToken.exp,
      }
    });

    return;
};

exports.refreshToken = async (refreshToken) => {
    if(!refreshToken){
      throw new AppError("No Refresh Token Found", 401);
    }
  
    const decodedRefreshToken = verifyToken(refreshToken, false);

    if(decodedRefreshToken === "InvalidToken"){
      throw new AppError("Access Token Invalid", 401);
    }

    if(decodedRefreshToken === "TokenExpired"){
      throw new AppError("Access Token Expired", 401);
    }

    const userId = decodedRefreshToken.userId;

    const userRefreshToken = await prisma.userRefreshToken.findFirst({
      where:{
        token: refreshToken,
        userId
      }
    });

    if(!userRefreshToken){
      throw new AppError("Refresh Token Invalid or Expired", 401);
    }

    await prisma.userRefreshToken.delete({
      where:{
        id: userRefreshToken.id
      }
    });

    const user = await prisma.user.findUnique({
      where:{
        id: userId
      }
    });

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await prisma.userRefreshToken.create({
      data:{
        userId,
        token: newRefreshToken
      }
    });

    const tokenResponse = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };

    return tokenResponse;
};

exports.generate2fa = async (userId) => {
    const secret2Fa = generate2faSecret();
  
    const user = await prisma.user.update({
      data:{
        secret2Fa
      },
      where:{
        id: userId
      }
    });

    return await generateQrCode(user.email, secret2Fa);
};

exports.validate2fa = async (totp, userId) => {
    if(!totp){
      throw new AppError("OTP is required", 422);
    }
  
    const user = await prisma.user.findUnique({
      where:{
        id: userId
      }
    });
    
    const verified = verifyTOTP(totp, user.secret2Fa);
  
    if(!verified){
      throw new AppError("OTP is invalid", 400);
    }

    await prisma.user.update({
      data:{
        enable2Fa: true
      },
      where:{
        id: userId
      }
    });

    return;
};

exports.login2fa = async (temporaryToken, totp ) => {
    if(!temporaryToken || !totp){
      throw new AppError("Please fill in all the fields (temporaryToken and totp)", 422);
    }

    const userId = verifyTemporaryToken(temporaryToken);

    if(!userId){
      throw new AppError("The provided temporary token is incorrect or expired", 401);
    }

    const user = await prisma.user.findUnique({
      where:{
        id: userId
      }
    });

    const verified = verifyTOTP(totp, user.secret2Fa);

    if(!verified){
      throw new AppError("The provided totp is incorrect or expired", 401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.userRefreshToken.create({
      data:{
        token: refreshToken,
        userId: user.id
      }
    });

    const loginCredentials = {
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken
      };

    return loginCredentials;
};

exports.googleCallback = async (user) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
  
    await prisma.userRefreshToken.create({
      data:{
        userId: user.id,
        token: refreshToken
      }
    })
  
    const loginCredentials = {
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken
      };

    return loginCredentials;
};