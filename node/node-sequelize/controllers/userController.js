const UserService = require("../services/userService");

class UserController{
    async getAllUsers(req, res){
        try{
            const users = await UserService.getAllUsers();
            res.status(200).json(users);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async getUserById(req, res){
        try{
            const {id: userId} = req.params;
    
            const user = await UserService.getUserById(userId);
            return res.status(200).json(user);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async createUser(req, res){
        try{
            const {firstName, lastName} = req.body;
    
            const user = await UserService.createUser({firstName, lastName});
            return res.status(201).json(user);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async updateUser(req, res){
        try{
            const {id: userId} = req.params;
            const {firstName, lastName} = req.body;

            const updatedUser = await UserService.updateUser(userId, {firstName, lastName});
            return res.status(200).json(updatedUser);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async deleteUser(req, res){
        try{
            const {id: userId} = req.params;

            const deletedUser = await UserService.deleteUser(userId);
            return res.status(204).json(deletedUser);

        }catch(error){
           return res.status(500).json({error: error.message}); 
        }
    }
}

module.exports = new UserController();