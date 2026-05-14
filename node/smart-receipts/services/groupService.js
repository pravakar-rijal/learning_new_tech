const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const AppError = require('../utils/appError');

exports.getGroups = async() => {    
    const groups = await prisma.group.findMany({where:{
            isActive: true
    }});
        
    return groups;
};

exports.getGroup = async(groupId) => {
    const group = await prisma.group.findUnique({
        where:{
            id: groupId,
            isActive: true
        }
    });
    return group;
};

exports.createGroup = async(groupName, userName) =>{
    if(!groupName)
        throw new AppError("Name is Required", 422);

    if(await prisma.group.findFirst({where: {name: groupName}})){
        throw new AppError(`${groupName} already exists`, 409);
    }

    const newGroup = await prisma.group.create({
        data:{
            name: groupName,
            createdBy: userName,
            updatedBy: userName,
            createdAt: new Date()
        }
    });

    return newGroup;
}

exports.updateGroup = async (groupId, groupName, userName) => {
    if(!await prisma.group.findUnique({where: {id: groupId, isActive: true}})){
        throw new AppError("Group not Found", 404);
    }

    if(!groupName)
        throw new AppError('Group name is Required.', 500);

    if(await prisma.group.findFirst({where:{name: groupName}})){
        throw new AppError(`${groupName} already exists`, 409);
    }

    const updatedGroup = await prisma.group.update({
        data:{
            name: groupName,
            updatedBy: userName
        },
        where:{
            id: groupId
        }
    });

    return updatedGroup;
};

exports.deleteGroup = async (groupId, userName) => {
    if(!await prisma.group.findUnique({where: {id: groupId, isActive: true}})){
        throw new AppError('Group Not Found', 404);
    }

    const billsCount = await prisma.bill.count({where: {groupId}});

    if(billsCount)
        throw new AppError(`Group Id is being used in ${billsCount} bill(s)`, 409);

    const deletedGroup = await prisma.group.update({
        data:{
            isActive: false,
            updatedBy: userName
        },
        where:{
            id: groupId
        }
    });

    return deletedGroup;
}

exports.addUserToGroup = async (groupId, userId) => {
    const group = await prisma.group.findUnique({
    where: { 
        id: groupId 
    } });

    if (!group){
    throw new AppError('Group not found', 404);
    }

    const user = await prisma.user.findUnique({
    where: {
        id: userId 
    } });

    if (!user){
    throw new AppError('User not found', 404);
    }

    const existing = await prisma.groupMember.findFirst({
    where: {
        groupId,
        userId,
    },
    });

    if (existing){
    throw new AppError('User already in group', 409);
    }

    const groupMember = await prisma.groupMember.create({
    data: {
        groupId,
        userId,
    },
    include:{
        user:{
            select:{
                id: true,
                name: true,
            }
        },
        group:{
            select:{
                id: true,
                name: true,
            }
        },
    },
    omit:{
        groupId: true,
        userId: true,
        isActive: true,
    }
    });

    return groupMember;
}
