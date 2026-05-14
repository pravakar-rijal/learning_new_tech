export interface User {
    id: number,
    name: string
};

export interface IUserService{
    getAllUsers(): User[];
    getUserById(userId: number): User;
    createUser(userName: string): User;
    updateUser(userId: number, userName: string): User;
    deleteUser(userId: number): void;
}

export type RequestBody = {
    name: string
}

export type RequestParams = {
    id: string
}
