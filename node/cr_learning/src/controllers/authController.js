const AuthService = require("../services/authService");

class AuthController{
    async registerUser(req, res){
        try{
            const { email, firstName, lastName, username, isActive, password, sha256Key, roleId } = req.body;
            const registeredUser = await AuthService.registerUser({email, firstName, lastName, username, isActive, password, sha256Key, roleId});
            
            return res.status(201).json(registeredUser);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async loginUser(req, res){
        try{
            const { email, password } = req.body;
            const loggedInUser = await AuthService.loginUser({email, password});
            
            return res.status(200).json(loggedInUser);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

}

module.exports = new AuthController();