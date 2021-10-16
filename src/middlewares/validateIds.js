const { getDefaultResponse } = require('../utils/messages');
const User = require("../models/user.model");
const Product = require("../models/product.model")
const PaymentMethod = require("../models/paymentMethod.model")
const { Order } = require("../models/order.model");

async function validateProductMiddleware(req, res, next) {
    const id = req.params.id;
    try {
        const validate = await Product.findById(id);
        if (validate) {
            next();
        } else {
            getDefaultResponse(res, 404, 2);
        }
    } catch (e) {
        if (e.kind === "ObjectId") {
            getDefaultResponse(res, 400, 4);
        } else {
            getDefaultResponse(res, 500, 1);
        }
    }
}

async function validatePaymentMiddleware(req, res, next) {
    const { paymentMethodId } = req.body;
    const paymentId = req.params.id;
    const id = paymentId || paymentMethodId;
    if (id) {
        try {
            const validate = await PaymentMethod.findById(id);
            if (validate) {
                next();
            } else {
                getDefaultResponse(res, 404, 3);
            }
        } catch (e) {
            if (e.kind === "ObjectId") {
                getDefaultResponse(res, 400, 4);
            } else {
                getDefaultResponse(res, 500, 1);
            }
        }
    } else {
        next();
    }

}

async function validateOrderMiddleware(req, res, next) {
    try {
        const id = req.params.id;
        const validate = await Order.findById(id);
        if (validate) {
            next();
        } else {
            getDefaultResponse(res, 404, 4);
        }
    } catch (e) {
        if (e.kind === "ObjectId") {
            getDefaultResponse(res, 400, 4);
        } else {
            getDefaultResponse(res, 500, 1);
        }
    }
}

async function validateIsConfirmOrder(req, res, next) {
    const id = req.params.id;
    try {
        const { status } = await Order.findById(id);
        if (status === "Pendiente") {
            getDefaultResponse(res, 400, 3);
        }
        else next();
    } catch (e) {
        if (e.kind === "ObjectId") {
            getDefaultResponse(res, 400, 4);
        } else {
            getDefaultResponse(res, 500, 1);
        }
    }
}


async function validateOrderToConfirm(req, res, next) {
    try {
        const username = req.user.username;
        const { _id } = await User.findByUsername(username);
        const validate = await Order.findOpenOrder(_id);
        if (validate) next();
        else {
            getDefaultResponse(res, 400, 1);
        }
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

async function validateOpenOrder(req, res, next) {
    try {
        const username = req.user.username;
        const { _id } = await User.findByUsername(username);
        const validate = await Order.findOpenOrder(_id);
        if (!validate) next();
        else {
            getDefaultResponse(res, 400, 2);
        }
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

async function validateUserId(req, res, next) {
    try {
        const id = req.params.id;
        const validate = await User.findById(id);
        if (validate) next();
        else {
            getDefaultResponse(res, 404, 1);
        }
    } catch (e) {
        if (e.kind === "ObjectId") {
            getDefaultResponse(res, 400, 4);
        } else {
            getDefaultResponse(res, 500, 1);
        }
    }
}

async function validateAddressMiddleware(req, res, next) {
    const { addressId } = req.body;
    const idAddress = req.params.id;
    const id = idAddress || addressId;
    if (id) {
        try {
            const username = req.user.username;
            const userData = await User.findByUsername(username);
            const validate = await userData.addresses.id(id);
            if (validate) {
                next();
            } else {
                getDefaultResponse(res, 404, 5);
            }
        } catch (e) {
            if (e.kind === "ObjectId") {
                getDefaultResponse(res, 400, 4);
            } else {
                getDefaultResponse(res, 500, 1);
            }
        }
    } else {
        next();
    }

}




module.exports = {
    validateOrderMiddleware,
    validateIsConfirmOrder,
    validatePaymentMiddleware,
    validateProductMiddleware,
    validateOrderToConfirm,
    validateOpenOrder,
    validateUserId,
    validateAddressMiddleware
}