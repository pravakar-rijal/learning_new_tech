const { PrismaClient } = require('../generated/prisma/index.js');
const passport = require('passport');
const { verifyToken } = require('../utils/authUtils.js');

const prisma = new PrismaClient();

async function ensureAuthenticated(req, res, next) {
  const accessToken = req.header('Authorization')?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token not found' });
  }

  if(await prisma.userInvalidToken.findFirst({where: {accessToken}})){
    return res.status(401).json({
      message: "Access token invalid",
      code: "AccessTokenInvalid"
    });
  }

  try{
    const decodedAccessToken = verifyToken(accessToken, true);
    if(decodedAccessToken === "InvalidToken"){
      return res.status(401).json({
        message: "Access Token Invalid",
        code: "AccessTokenInvalid"
      });
    }
    else if(decodedAccessToken === "TokenExpired"){
      return res.status(401).json({
        message: "Access Token Expired",
        code: "AccessTokenExpired"
      });
    }

    req.accessToken = { value: accessToken, exp: decodedAccessToken.exp};
    req.user = { userId: decodedAccessToken.userId, userName: decodedAccessToken.name};
    next();
  }catch(error){
      return res.status(500).json({error: error.message});
    }
  }

function authorize(roleIds =[]){
  return async function (req, res, next){
    const { userId } = req.user;

    const user = await prisma.user.findUnique({
      where:{
        id: userId
      }
    });

    if(!user || !roleIds.includes(user.roleId)){
      return res.status(403).json({message: "Access denied"});
    }

    next();
  }
}

function authenticateGoogle(){
  return passport.authenticate('google', {
    scope: ['profile', 'email']
   });
  }

function authenticateGoogleCallback(){
    return passport.authenticate('google', {session: false});
}

module.exports = { ensureAuthenticated, authorize, authenticateGoogle, authenticateGoogleCallback};
