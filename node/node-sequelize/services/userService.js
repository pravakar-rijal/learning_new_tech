const { where } = require("sequelize");
const userModel = require("../models/user");

class UserService{
    async getAllUsers(){
        try{
            const users = await userModel.findAll();
            return users;
            
        }catch(error){
            throw error;
        }
    }

    async getUserById(userId){
        try{
            const user = await userModel.findByPk(userId);
            return user;

        }catch(error){
            throw error;
        }
    }

    async createUser({firstName, lastName}){
        try{
            const user = await userModel.create({firstName, lastName});
            return user;

        }catch(error){
            throw error;
        }
    }

    async updateUser(userId, {firstName, lastName}){
        try{
            const updatedUser = await userModel.update({ firstName, lastName}, {where: {id: userId}});
            return updatedUser;

        }catch(error){
            throw error;
        }
    }

    async deleteUser(userId){
        try{
            const deletedUser = await userModel.destroy({where: {id: userId}});
            return deletedUser;

        }catch(error){
            throw error;
        }
    }
}

module.exports = new UserService();