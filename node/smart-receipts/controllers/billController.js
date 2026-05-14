const billService = require('../services/billService');

//GET ALL BILLS
exports.getBills = async (req, res, next) => {
    try{
        const bills = await billService.getAllBills();
        return res.status(200).json(bills);
    }catch(error){
        next(error);
    }
}

//GET BILL BY ID
exports.getBill = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const bill = await billService.getBillById(userId);

        return res.status(200).json(bill);
    }catch(error){
        next(error);
    }
};

//CREATE BILL
exports.createBill = async (req, res, next) => {
    try{
    const { title, totalAmount, groupId } = req.body;
    const { userName } = req.user;

    const updatedUser = await billService.createBill(title, totalAmount, groupId, userName);

    return res.status(201).json(updatedUser);

    }catch(error){
        next(error);
    }
}

//UPDATE BILL
exports.updateBill = async (req, res, next) => {
    try{
        const billId = req.params.id;
        const { userName } = req.user;
        const { title, totalAmount } = req.body;
        
        const updatedBill = await billService.updateBill(billId, title, totalAmount, userName);

        return res.status(200).json(updatedBill);
    }catch(error){
        next(error);
    }
}

//DELETE BILL
exports.deleteBill = async (req, res, next) => {
    try{
        const billId = req.params.id;
        const { userName } = req.user;

        const deletedBill = await billService.deleteBill(billId, userName);
        return res.status(200).json(deletedBill);

    }catch(error){
       next(error);
    }
};

exports.getBillsByGroupId = async(req, res, next) => {
    try{
        const groupId = req.params.groupId;
        const bills = await billService.getBillsByGroupId(groupId);
        return res.status(200).json(bills);
    }catch(error){
        next(error);
    }
}