const { PrismaClient, PaymentStatus } = require('../generated/prisma');
const prisma = new PrismaClient();
const AppError = require('../utils/appError');

// GET ALL PAYMENTS
exports.getAllPayments = async () => {
    const payments = await prisma.payment.findMany({
        where:{
            status: PaymentStatus.completed
        },
        include:{
          user:{
            select:{
              id: true,
              name: true,
            },
          },
          bill:{
            select:{
              id: true,
              title: true,
            }
          }
        },
        omit:{
          billId: true,
          userId: true,
        }
    });
    return payments;
};

// GET PAYMENT BY ID
exports.getPayment = async (paymentId) => {
    const payment = await prisma.payment.findUnique({
        where:{
            id: paymentId,
            status: PaymentStatus.completed
        },
        include:{
            user: {
                select:{
                    id: true,
                    name: true,
                }
            },
            bill: {
                select:{
                    id: true,
                    title: true,
                }
            }
        },
        omit:{
            userId: true,
            billId: true,
        }
    });

    return payment;
};

// GET PAYMENTS FOR BILL
exports.getPaymentsByBill = async (billId) => {
    const payments = await prisma.payment.findMany({
        where:{
            billId,
            status: PaymentStatus.completed
        },
        include:{
            user:{
                select:{
                    id: true,
                    name: true,
                }
            },
            bill:{
                select:{
                    id: true,
                    title: true,
                }
            }
        },
        omit:{
            userId: true,
            billId: true
        }
    });

    return payments;
};

// GET PAYMENTS BY USER
exports.getPaymentsByUser = async (userId) => {
    const payments = await prisma.payment.findMany({
      where: {
        userId,
        status: PaymentStatus.completed
      },
      include:{
        bill:{
            select:{
                id: true,
                title: true,
            }
        }
      },
      omit:{
        billId: true,
      }
    });

    return payments;
};

// CREATE PAYMENT
exports.createPayment = async (userId, billId, amountPaid, userName) => {
  
    if (!userId || !billId || typeof amountPaid !== 'number') {
      throw new AppError('All fields are required', 422);
    }

    if(amountPaid < 0){
      throw new AppError('Amount Paid must be a positive number', 422);
    }

    const bill = await prisma.bill.findUnique({
      where:{
        id: billId
      }
    });

    if(bill.totalAmount === 0){
      throw new AppError("Bill already paid", 422);
    }

    if(!bill){
      throw new AppError("Invalid Bill", 422);
    }

    if(amountPaid > bill.totalAmount){
      throw new AppError("Amount cannot be greater than bill amount", 422);
    }

    if(amountPaid <= bill.totalAmount){
      await prisma.bill.update({
        data:{
          totalAmount: bill.totalAmount - amountPaid
        },
        where:{
          id: bill.id
        }
      });
    }

    const payment = await prisma.payment.create({
      data: {
        amountPaid,
        status: PaymentStatus.completed,
        userId,
        billId,
        createdBy: userName,
        updatedBy: userName,
        createdAt: new Date()
      },
    });

    return payment;
};

// UPDATE PAYMENT
exports.updatePayment = async (paymentId, newAmountPaid, userName) => {
  const payment = await prisma.payment.findUnique({ 
    where: { 
      id: paymentId 
    } });


    if (!payment){
        throw new AppError('Payment not found', 404);
    }

    const bill = await prisma.bill.findUnique({
      where:{
        id: payment.billId
      }
    });

    if(!bill){
      throw new AppError("Linked Bill Not Found", 404);
    }

    const amountDifference = Number(newAmountPaid) - Number(payment.amountPaid);
    const newTotalAmount = Number(bill.totalAmount) - Number(amountDifference);

    if(newTotalAmount < 0){
      throw new AppError("Updated Payment exceeds bill amount", 422);
    }

    const updatedPayment = await prisma.payment.update({
      data:{
        status: PaymentStatus.updated,
        amountPaid: newAmountPaid,
        updatedBy: userName,
      },
      where:{
        id: paymentId,
      }
    });

    const changedBill = await prisma.bill.update({
      data:{
        totalAmount: newTotalAmount
      },
      where:{
        id: bill.id
      }
    });

    return updatedPayment;
};

// DELETE PAYMENT
exports.deletePayment = async (paymentId, userName) => {
    const payment = await prisma.payment.findUnique({ 
      where: {
         id: paymentId 
        } });
  
    if (!payment){
      throw new AppError('Payment not found', 404);
    }

    const bill = await prisma.bill.findUnique({
      where:{
        id: payment.billId
      }
    });

    if(!bill){
      throw new AppError("Linked Bill Not Found", 404);
    }

    const newBillAmount = Number(bill.totalAmount) + Number(payment.amountPaid);

    const updatedBill = await prisma.bill.update({
      data:{
        totalAmount: newBillAmount
      },
      where:{
        id: bill.id
      }
    });

    const deletedPayment = await prisma.payment.update({
      data: { 
        status: PaymentStatus.deleted,
        updatedBy: userName,
       },
       where: {
        id: paymentId,
      },
      include:{
        user:{
          select:{
            id: true,
            name: true,
          }
        },
        bill:{
          select:{
            id: true,
            title: true,
          }
        }
      },
      omit:{
        billId: true,
        userId: true,
      }
    });

    return deletedPayment;
};
