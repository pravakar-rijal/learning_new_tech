import { Request, Response } from "express";
import UserService from "../services/userService";
import { User, RequestBody, RequestParams } from "../types/userType";

class UserController {
    public getAllUsers(req: Request, res: Response){
        try{
            const users: User[] = UserService.getAllUsers(); 
            res.status(200).json(users);

        }catch(error: any){
            res.status(500).json({error: error.message});
        }
    }

    public getUserById(req: Request<RequestParams>, res: Response){
        try{
            const {id: userId} = req.params;
            const user: User = UserService.getUserById(+userId);
            res.status(200).json(user);
            
        }catch(error: any){
            res.status(500).json({error: error.message});
        }
    }

    public createUser(req: Request<{}, {}, RequestBody>, res: Response){
        try{
            const {name: userName} = req.body;
            const createdUser = UserService.createUser(userName);

            res.status(201).json(createdUser);

        }catch(error: any){
            res.status(500).json({error: error.message})
        }
    }

    updateUser(req: Request<RequestParams, {}, RequestBody>, res: Response){
        try{
            const {id: userId} = req.params;
            const {name: userName} = req.body;

            const updatedUser = UserService.updateUser(+userId, userName);
            res.status(200).json(updatedUser);

        }catch(error: any){
            res.status(500).json({error: error.message});
        }

    }

    deleteUser(req: Request<RequestParams>, res: Response){
        try{
            const {id: userId} = req.params;

            UserService.deleteUser(+userId);
            res.status(204).json({message: "User deleted successfully"});

        }catch(error: any){
            res.status(500).json({error: error.message});
        }

    }
}

export default new UserController();