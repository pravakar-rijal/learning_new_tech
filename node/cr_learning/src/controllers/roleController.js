const RoleService = require("../services/roleService");

class RoleController{
    async getAllRoles(req, res){
        try{
            const roles = await RoleService.getAllRoles();
            return res.status(200).json(roles);
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async getRoleById(req, res){
        try{
            const roleId = req.params.id;
            const role = await RoleService.getRoleById(roleId);

            return res.status(200).json(role);
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async createRole(req, res){
        try{
            const { roleName, isActive, description } = req.body;
            const createdRole = await RoleService.createRole({roleName, isActive, description});
            
            return res.status(201).json(createdRole);
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async updateRole(req, res){
        try{
            const roleId = req.params.id;
            const { roleName, isActive, description } = req.body;
            const updatedRole = await RoleService.updateRole(roleId, {roleName, isActive, description});

            return res.status(200).json(updatedRole);
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async deleteRole(req, res){
        try{
            const roleId = req.params.id;
            const deletedRole = await RoleService.deleteRole(roleId);

            return res.status(204).json(deletedRole);
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = new RoleController();