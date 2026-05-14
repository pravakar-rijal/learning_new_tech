const { where } = require("sequelize");
const { User, Product } = require("../models");

class UserService {
    async getAllUsers(){
        try{
            const users = await User.findAll({
                attributes: { exclude: ['password']},
            });
            return users;

        }catch(error){
            throw error;
        }
    }

    async createUser({firstName, lastName, email, password}){
        try{
            const createdUser = await User.create({firstName, lastName, email, password});
            const {password: pass, ...user} = createdUser.toJSON();
            return user;

        }catch(error){
            throw error;
        }
    }

    async getAllProducts(userId){
        try{
            const products = await Product.findAll({where: {userId}});
            return products;
        }catch(error){
            throw error;
        }
    }
}

module.exports = new UserService();