import { User, IUserService } from "../types/userType";

class UserService implements IUserService{
    private users: User[] = [];

    public getAllUsers(): User[]{
        try{
            return this.users;
        }catch(error){
            throw error;
        }
    }

    public getUserById(userId: number): User{
        try{
            const user = this.users.find((user) => user.id === userId);
            
            if(!user){
                throw new Error(`User with id ${userId} not found.`);
            }

            return user;
        }catch(error){
            throw error;
        }
    }

    public createUser(userName: string): User{
        try{
            const createdUserId: number = this.users.length + 1;
    
            const createdUser: User = {
                id: createdUserId,
                name: userName,
            };
    
            this.users.push(createdUser);
    
            return createdUser;

        }catch(error){
            throw error;
        }
    }

    public updateUser(userId: number, userName: string): User{
        try{
        const userIndex = this.users.findIndex((user) => user.id === userId);
        
        if(userIndex < 0){
            throw new Error(`User with id ${userId} was not found.`);
        }
        this.users[userIndex].name = userName;

        return this.users[userIndex];
    }catch(error){
        throw(error);
    }
    }

    public deleteUser(userId: number): void{
        try{
            if(!this.users.some ((user) => user.id === userId)){
                throw new Error(`User with id ${userId} was not found.`);
            }

            this.users = this.users.filter((user) => user.id !== userId);
        }catch(error){
            throw(error);
        }
    }
}

export default new UserService();