const { where, Op } = require("sequelize");
const { User } = require("../models");

class AuthService{

    async registerUser({ email, firstName, lastName, username, isActive, password, sha256Key, roleId }){
        try{
            const registerdUser = await User.create({ email, firstName, lastName, username, isActive, password, sha256Key, roleId });
            const {password, ...safeUserResponse} = registerdUser.toJSON();
            return safeUserResponse;

        }catch(error){
            throw error;
        }
    }

    async loginUser({ email, password }){
        try{
            const loggedInUser = await User.findOne({where: Op.and[{email, password}]});
            if(!loggedInUser){
                throw new Error("Invalid Email or Password");
            }
            const accessToken = generateToken(loggedInUser);
            const refreshToken = generateToken(loggedInUser, false);

            return {accessToken, refreshToken};

        }catch(error){
            throw error;
        }
    }
}

module.exports = new AuthService();