const { getDefaultResponse, getDynamicResponse } = require('../utils/messages');
const PaymentMethod = require("../models/paymentMethod.model")

const getPaymentMethodsController = async (_, res) => {
    try {
        const payments = await PaymentMethod.find()
        res.json(payments);
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const createPaymentMethodController = async (req, res) => {
    try {
        const name = req.body.name;
        const newPaymentMethod = new PaymentMethod({ name });
        await newPaymentMethod.save();
        getDynamicResponse(res, 201, "Metodo añadido");
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const editPaymentMethodController = async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const editedPayment = await PaymentMethod.findById(id);
        editedPayment.name = name;
        await editedPayment.save();
        res.json(editedPayment);
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const deletePaymentMethodController = async (req, res) => {
    try {
        const id = req.params.id;
        await PaymentMethod.findByIdAndDelete(id);
        getDynamicResponse(res, 200, "Metodo de pago eliminado");
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

module.exports = {
    getPaymentMethodsController,
    createPaymentMethodController,
    editPaymentMethodController,
    deletePaymentMethodController
}