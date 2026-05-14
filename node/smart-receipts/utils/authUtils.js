const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');
const crypto = require('crypto');
const { authenticator } = require('otplib');
const qrcode = require('qrcode');

const cache = new NodeCache();

// Hash password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare password
async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// Generate JWT token
function generateAccessToken(user) {
  return jwt.sign({ userId: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET_KEY, {
    subject: process.env.JWT_SUBJECT,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

// Generate Refresh Token 
function generateRefreshToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    subject: process.env.REFRESH_TOKEN_SUBJECT,
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
}

// Generate Temporary Token
function generateTemporaryToken(user){
  const temporaryToken = crypto.randomUUID();
  cache.set(`temporaryToken: ${temporaryToken}`, user.id, +process.env.TEMP_TOKEN_EXPIRES_IN);
  return temporaryToken;
}

// Verify AccessToken or RefreshToken
function verifyToken(token, isAccessToken){
  try{
    if(isAccessToken){
      const decodedAccessToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return decodedAccessToken;
    }
    else{
      const decodedRefreshToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
      return decodedRefreshToken;
    }
      
  }catch(error){
    if(error instanceof jwt.TokenExpiredError){
      return "TokenExpired";
    }
    else if(error instanceof jwt.JsonWebTokenError){
      return "InvalidToken";
    }
    else{
      throw error;
    }
  }
}

// Generate Secret Key for 2FA
function generate2faSecret(){
  return authenticator.generateSecret();
}

//Generate QR Code
async function generateQrCode(email, secret2Fa){
  try{
    const uri = authenticator.keyuri(email, process.env.ISSUER, secret2Fa);
    const qrCode = await qrcode.toBuffer(uri, {type: 'image/png', margin: 1});
    return qrCode;

  }catch(error){
    throw error;
  }
}

function verifyTOTP(totp, secretKey){
  try{
    return authenticator.verify({token: totp, secret: secretKey});
  }catch(error){
    throw error;
  }
}

function verifyTemporaryToken(temporaryToken){
  try{
    const userId = cache.get(`temporaryToken: ${temporaryToken}`);
    return userId;
  }catch(error){
    throw error;
  }
}

module.exports = { hashPassword, comparePassword, generateTemporaryToken, generateAccessToken, generateRefreshToken, verifyToken, generate2faSecret, generateQrCode, verifyTOTP, verifyTemporaryToken };
