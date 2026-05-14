const { where } = require("sequelize");
const Role = require("../models");

class RoleService{
    async getAllRoles(){
        try{
            const roles = await Role.findAll();
            return roles;

        }catch(error){
            throw error;
        }
    }

    async getRoleById(roleId){
        try{
            const role = await Role.findPk(roleId);
            return role;

        }catch(error){
            throw error;
        }
    }

    async createRole({roleName, isActive, description}){
        try{
            const createdRole = await Role.create({roleName, isActive, description});
            return createdRole;

        }catch(error){
            throw error;
        }
    }

    async updateRole(roleId, {roleName, isActive, description}){
        try{
            const updatedRole = await Role.update({roleName, isActive, description}, {where: {id: roleId}});
            return updatedRole;
            
        }catch(error){
            throw error;
        }
    }

    async deleteRole(roleId){
        try{
            const deletedRole = await Role.destroy({where: {id: roleId}});
            return deletedRole;

        }catch(error){
            throw error;
        }
    }

}

module.exports = new RoleService();