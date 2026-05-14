const UserService = require("../services/userService");

class UserController{

    async getAllUsers(req, res){
        try{
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async getUserById(req, res){
        try{
            const userId = req.params.id;
            const user = await UserService.getUserById(userId);
            return res.status(200).json(user);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async updateUser(req, res){
        try{
            const userId = req.params.id;
            const { email, firstName, lastName, username, isActive, password, sha256Key, roleId } = req.body;
            const updatedUser = await UserService.updateUser(userId, { email, firstName, lastName, username, isActive, password, sha256Key, roleId });
            return res.status(200).json(updatedUser);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async deleteUser(req, res){
        try{
            const userId = req.params.id;
            const deletedUser = await UserService.deleteUser(userId);
            return res.status(204).json(deletedUser);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = new UserController();