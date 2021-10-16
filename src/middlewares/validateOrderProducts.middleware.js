const { getDynamicResponse } = require('../utils/messages');
const Product = require("../models/product.model")

async function validateProducts(product) {
    try {
        const noValidate = await Product.findById(product.id);
        if (noValidate) return false;
        else return product.id;
    } catch (e) {
        return product.id;
    }
}

async function validateOrderProductsMiddleware(req, res, next) {
    try {
        const products = req.body.products;
        let productsErrors = [];
        if (products) {
            const promises = products.map(product => validateProducts(product));
            const errors = await Promise.all(promises);
            productsErrors = errors.filter(element => element != false);
            if (productsErrors.length > 0) {
                let message = "Productos no encontrados:";
                productsErrors.forEach(productId => {
                    message += `{id: ${productId}} `
                })
                getDynamicResponse(res, 404, message);
            } else next();
        } else next();
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }

}

module.exports = validateOrderProductsMiddleware;