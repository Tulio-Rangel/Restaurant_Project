const { getDefaultResponse, getDynamicResponse } = require('../utils/messages');
const { Order, fetchProductsInfo, editProductsOrder } = require("../models/order.model");
const User = require("../models/user.model");
const moment = require("moment");
const PaymentMethod = require("../models/paymentMethod.model");

async function getUserId(req) {
    try {
        const username = req.user.username;
        const { _id } = await User.findByUsername(username);
        return _id;
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const getUserOrdersController = async (req, res) => {
    try {
        const id = await getUserId(req);
        const userOrders = await Order.findByUserId(id).populate("userData", ["fullName", "phone"]);
        res.json(userOrders);
    } catch {
        getDefaultResponse(res, 500, 1);
    }
}

const createOrderController = async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findByUsername(username);
        const { products, addressId, paymentMethodId } = req.body;
        const productsInfo = await fetchProductsInfo(products);
        const { name: paymentName } = await PaymentMethod.findById(paymentMethodId);
        const newOrder = new Order({
            address: user.addresses.id(addressId).address,
            products: productsInfo,
            userData: user._id,
            paymentMethod: paymentName,
            date: moment().format("lll"),
        });
        newOrder.total = newOrder.getTotalOrder();
        await newOrder.save();
        getDynamicResponse(res, 201, "Orden creada");
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}




const editOrderController = async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findByUsername(username);
        const { addressId, paymentMethodId, products } = req.body;
        const existingOrder = await Order.findOpenOrder(user._id);
        if (products) {
            await editProductsOrder(products, existingOrder.products);
            existingOrder.total = existingOrder.getTotalOrder();
        };
        if (paymentMethodId) {
            const { name } = await PaymentMethod.findById(paymentMethodId);
            existingOrder.paymentMethod = name;
        }
        if (addressId) {
            const { address } = user.addresses.id(addressId);
            existingOrder.address = address;
        }
        await existingOrder.save();
        res.json(existingOrder);
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const deleteProductOrderController = async (req, res) => {
    try {
        const id = await getUserId(req);
        const { products } = req.body;
        const existingOrder = await Order.findOpenOrder(id);
        products.forEach(product => {
            try {
                existingOrder.products.id(product.id).remove();
            } catch { }
        });
        existingOrder.total = existingOrder.getTotalOrder();
        await existingOrder.save()
        res.json(existingOrder);
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const confirmOrderController = async (req, res) => {
    try {
        const id = await getUserId(req);
        const existingOrder = await Order.findOpenOrder(id);
        existingOrder.status = "Confirmado";
        await existingOrder.save();
        getDynamicResponse(res, 200, "Pedido confirmado");
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const getTotalOrdersController = async (req, res) => {
    try {
        const orders = await Order.find().populate("userData", ["fullName", "phone"]);
        res.json(orders);
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const editStatusOrderController = async (req, res) => {
    try {
        const status = req.body.status;
        const id = req.params.id;
        const editingOrder = await Order.findById(id);
        editingOrder.status = status;
        await editingOrder.save()
        getDynamicResponse(res, 200, "Estado actualizado");
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}


module.exports = {
    getUserOrdersController,
    getTotalOrdersController,
    createOrderController,
    editOrderController,
    deleteProductOrderController,
    editStatusOrderController,
    confirmOrderController
}