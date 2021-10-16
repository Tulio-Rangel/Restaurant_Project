const { getDefaultResponse, getDynamicResponse } = require('../utils/messages');
const Product = require("../models/product.model");
const clientRedis = require('../redis');

const getProductsController = async (_, res) => {
    try {
        const products = await Product.find();
        // clientRedis.setex('products', 5 * 60, JSON.stringify(products));
        res.json(products);
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const createProductController = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newProduct = new Product({ name, price });
        await newProduct.save();
        getDynamicResponse(res, 201, "Producto añadido");
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const editProductController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, price } = req.body;
        const editingProduct = await Product.findById(id);
        editingProduct.name = name ? name : editingProduct.name;
        editingProduct.price = price ? price : editingProduct.price;
        await editingProduct.save();
        // clientRedis.del('products');
        res.json(editingProduct);
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const deleteProductController = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndRemove(id);
        getDynamicResponse(res, 200, "Producto eliminado");
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

module.exports = {
    getProductsController,
    createProductController,
    editProductController,
    deleteProductController
}