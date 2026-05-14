const UserService = require("../services/userService");

class UserController {
    async getAllUsers(req, res){
        try{
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async createUser(req, res){
        try{
            const {firstName, lastName, email, password} = req.body;

            const createdUser = await UserService.createUser({firstName, lastName, email, password});
            return res.status(201).json(createdUser);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async getAllProducts(req, res){
        try{
            const userId = req.params.userId;
            const products = await UserService.getAllProducts(userId);
            return res.status(200).json(products);

        }catch(error){
            throw res.status(500).json({error: error.message});
        }
    }

}

module.exports = new UserController();