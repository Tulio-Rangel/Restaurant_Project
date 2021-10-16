const { getDynamicResponse } = require('../utils/messages');
const userRegisterSchema = require('../schemas/userRegister.schema');
const userLoginSchema = require('../schemas/userLogin.schema');
const productSchema = require('../schemas/product.schema');
const paymentSchema = require('../schemas/payment.schema');
const orderSchema = require('../schemas/order.schema');
const orderEditSchema = require('../schemas/orderEdit.schema');

async function validateRegisterPost(req, res, next) {
    try {
        await userRegisterSchema.validateAsync(req.body);
        next();
    } catch (error) {
        getDynamicResponse(res, 400, error.details[0].message);
    }
}

async function validateLoginPost(req, res, next) {
    try {
        await userLoginSchema.validateAsync(req.body);
        next();
    } catch (error) {
        getDynamicResponse(res, 400, error.details[0].message);
    }
}

async function validateProductPost(req, res, next) {
    try {
        await productSchema.validateAsync(req.body);
        next();
    } catch (error) {
        getDynamicResponse(res, 400, error.details[0].message);
    }
}

async function validatePaymentPost(req, res, next) {
    try {
        await paymentSchema.validateAsync(req.body);
        next();
    } catch (error) {
        getDynamicResponse(res, 400, error.details[0].message);
    }
}

async function validateOrderPost(req, res, next) {
    try {
        await orderSchema.validateAsync(req.body);
        next();
    } catch (error) {
        getDynamicResponse(res, 400, error.details[0].message);
    }
}

async function validateOrderEditPost(req, res, next) {
    try {
        await orderEditSchema.validateAsync(req.body);
        next();
    } catch (error) {
        getDynamicResponse(res, 400, error.details[0].message);
    }
}


module.exports = {
    validateRegisterPost,
    validateLoginPost,
    validateProductPost,
    validatePaymentPost,
    validateOrderPost,
    validateOrderEditPost
}