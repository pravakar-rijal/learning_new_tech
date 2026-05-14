const groupService = require('../services/groupService');

exports.getGroups = async(req, res, next) => {
    try{
        const groups = await groupService.getGroups();
        return res.status(200).json({
            success: true,
            "message": "Groups retrieved successfully",
            data: groups, 
        });

    }catch(error){
        next(error);
    }
};

exports.getGroup = async(req, res, next) => {
    try{
        const groupId = req.params.id;

        const group = await groupService.getGroup(groupId);
        return res.status(200).json(group);

    }catch(error){
        next(error);
    }
};

exports.createGroup = async(req, res, next) =>{
    try{
        const { userName } = req.user;
        const groupName = req.body.groupName;

        const newGroup = await groupService.createGroup(groupName, userName);
        return res.status(201).json(newGroup);

    }catch(error){
        next(error);
    }
};

exports.updateGroup = async (req, res, next) => {
    try{
        const groupId = req.params.id;
        const groupName = req.body.groupName;
        const { userName } = req.user;

        const updatedGroup = await groupService.updateGroup(groupId, groupName, userName);
        return res.status(200).json(updatedGroup);

    }catch(error){
        next(error);
    }
};

exports.deleteGroup = async (req, res, next) => {
    try{
        const groupId = req.params.id;
        const { userName } = req.user;

        const deletedGroup = await groupService.deleteGroup(groupId, userName);
        return res.status(200).json(deletedGroup);

    }catch(error){
       next(error);
    }
}

exports.addUserToGroup = async (req, res, next) => {
    try{
        const { groupId, userId } = req.body;
        
        const groupMember = await groupService.addUserToGroup(groupId, userId);
        return res.status(200).json(groupMember);

    } catch (error) {
        next(error);
    }
};
  