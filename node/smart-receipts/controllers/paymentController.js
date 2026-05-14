const paymentService = require('../services/paymentService');

// GET ALL PAYMENTS
exports.getPayments = async (req, res, next) => {
  try{
    const payments = await paymentService.getAllPayments();
    return res.status(200).json(payments);
  }catch(error){
    next(error);
  }
};

// GET PAYMENT BY ID
exports.getPayment = async (req, res, next) => {
  try {
    const paymentId = req.params.id;

    const payment = await paymentService.getPayment(paymentId);
    return res.status(200).json(payment);

  } catch (error) {
    next(error);
  }
};

// GET PAYMENTS FOR BILL
exports.getPaymentsByBill = async (req, res, next) => {
  try {
    const { billId } = req.params;

    const payments = await paymentService.getPaymentsByBill(billId);
    res.status(200).json(payments);

  } catch (error) {
    next(error);
  }
};

// GET PAYMENTS BY USER
exports.getPaymentsByUser = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const payments = await paymentService.getPaymentsByUser(userId);
    res.status(200).json(payments);

  } catch (error) {
    next(error);
  }
};

// CREATE PAYMENT
exports.createPayment = async (req, res, next) => {
  try {
    const { userId, userName } = req.user;
    const { billId, amountPaid } = req.body;

    const payment = await paymentService.createPayment(userId, billId, amountPaid, userName);
    return res.status(201).json(payment);

  } catch (error) {
    next(error);
  }
};

// UPDATE PAYMENT
exports.updatePayment = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    const { amountPaid } = req.body;
    const { userName } = req.user;

    const updatedPayment = await paymentService.updatePayment(paymentId, amountPaid, userName);

    res.status(200).json(updatedPayment);

  } catch (error) {
    next(error);
  }
};

// DELETE PAYMENT
exports.deletePayment = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    const { userName } = req.user;

    const deletedPayment = await paymentService.deletePayment(paymentId, userName);

    res.status(200).json(deletedPayment);

  } catch (error) {
    next(error)
  }
};
