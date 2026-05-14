const { where } = require("sequelize");
const User = require("../models");

class UserService{

    async getAllUsers(){
        try{
            const users = await User.findAll({exclude: ['password']});
            return users;

        }catch(error){
            throw error;
        }
    }

    async getUserById(userId){
        try{
            const user = await User.findPk({where: {id: userId}, exclude: ['password']});
            return user;

        }catch(error){
            throw error;
        }
    }

    async updateUser(userId, { email, firstName, lastName, username, isActive, password, sha256Key, roleId }){
        try{
            const updatedUser = await User.update({ email, firstName, lastName, username, isActive, password, sha256Key, roleId }, {where: {id: userId}});
            return updatedUser;

        }catch(error){
            throw error;
        }
    }

    async deleteUser(userId){
        try{
            const deletedUser = await User.destroy({where: {id: userId}});
            return deletedUser;

        }catch(error){
            throw error;
        }
    }
}

module.exports = new UserService();