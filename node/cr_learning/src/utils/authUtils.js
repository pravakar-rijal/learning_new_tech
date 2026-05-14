const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../config/constants");

function hashPassword(password){
    try{
        const salt = bcrypt.genSaltSync(+constants.saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }catch(error){
        throw error;
    }
}

function comparePassword(inputPassword, hashedPassword){
    try{
        const verified = bcrypt.compare(inputPassword, hashedPassword)
        return verified;

    }catch(error){
        throw error;
    }
}

async function generateToken(userId, userEmail, isAccessToken = true){
    try{
        if(isAccessToken){
            const accessToken = jwt.sign({userId, userEmail}, constants.jwtSecretKey, {
                expiresIn: constants.jwtExpiresIn
            })
            return accessToken;
        }else{
            const refreshToken = jwt.sign({userId, userEmail}, constants.refreshTokenSecretKey, {
                expiresIn: constants.refreshTokenExpiresIn
            });
            return refreshToken;
        }
    }catch(error){
        throw error;
    }
}

async function verifyToken(userId, token, isAccessToken = true){
    try{
        if(isAccessToken){
            const decoded = jwt.verify(token, constants.jwtSecretKey);
            return decoded;
        }else{
            const decoded = jwt.verify(token, constants.refreshTokenSecretKey);
            return decoded;
        }
    }catch(error){
        throw error;
    }

}

module.exports = { hashPassword, comparePassword, generateToken, verifyToken };