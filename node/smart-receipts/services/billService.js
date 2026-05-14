const { PrismaClient } = require('../generated/prisma');
const AppError = require('../utils/appError');
const prisma = new PrismaClient();

exports.getAllBills = async () => {
    const bills = await prisma.bill.findMany({
        where:{
            isActive: true
        },
        include:{
            group:{
                select:{
                    id: true,
                    name: true
                }
            }
    },
    omit:{
        groupId: true
    }
    });

    return bills;
}

exports.getBillById = async (billId) => {
    const bill = await prisma.bill.findUnique({
        where: {
            id: billId,
            isActive: true
        },
        include:{
            group:{
                select:{
                    id: true,
                    name: true
                }
            }
        },
        omit:{
            groupId: true
        }
    });

    return bill;
}

exports.createBill = async (title, totalAmount, groupId, userName) => {
    if(!title)
        throw new AppError('Title is required', 422);

    if(!groupId || !await prisma.group.findUnique({where:{id: groupId, isActive: true}})){
        throw new AppError("Group Not Found", 404);
    }

    if(!totalAmount || typeof totalAmount !== "number" || totalAmount < 0){
        throw new AppError("Total Amount must be non-negative number", 422);
    }

    const newBill = await prisma.bill.create({
        data:{
            title,
            totalAmount,
            groupId,
            createdBy: userName,
            updatedBy: userName,
            createdAt: new Date()
        },
        include:{
            group:{
                select:{
                    id: true,
                    name: true
                }
            }
        },
        omit:{
            groupId: true
        }
    });

    return newBill;
}


//UPDATE BILL
exports.updateBill = async (billId, title, totalAmount, userName) => {
        if(title && title.trim().length === 0)
            throw new AppError("Title is Required", 400);
        
        if(totalAmount && (typeof totalAmount !== 'number' || totalAmount < 0))
            throw new AppError("Total Amount must be a non-negative number", 422);

        if(!await prisma.bill.findFirst({where: {id: billId, isActive: true}}))
            throw new AppError("Bill Not Found", 404);

        const updatedBill = await prisma.bill.update({
            data:{
                title,
                totalAmount,
                updatedBy: userName
            },
            where:{
                id: billId
            },
            include:{
                group:{
                    select:{
                        id: true,
                        name: true,
                    }
                }
            },
            omit:{
                groupId: true
            }
        });

        return updatedBill;
}

//DELETE BILL
exports.deleteBill = async (billId, userName) => {
        if(!await prisma.bill.findUnique({where:{id: billId, isActive: true}})){
            throw new AppError("Bill Not Found", 404);
        }

        const deletedBill = await prisma.bill.update({
            data:{
                isActive: false,
                updatedBy: userName
            },
            where:{
                id: billId
            }
        });

        return deletedBill;
};

//GET BILLS BY GROUP ID
exports.getBillsByGroupId = async(groupId) => {
    if(!await prisma.group.findUnique({where:{id: groupId, isActive: true}})){
        throw new AppError("Group Not Found", 404);
    }

    const bills = await prisma.bill.findMany({
        where:{
            groupId
        },
        include:{
            group:{
                select:{
                    id: true,
                    name: true,
                }
            }
        },
        omit:{
            groupId: true
        },
        orderBy:{
            title: 'asc'
        }
    });

    return bills;
}