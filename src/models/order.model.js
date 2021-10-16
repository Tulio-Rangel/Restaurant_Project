const Product = require("./product.model");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const productSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    total: {
        type: Number,
    },
    _id: {
        type: mongoose.ObjectId,
        required: true,
    }
});

const orderSchema = new Schema({
    userData: { type: Schema.Types.ObjectId, ref: "User" },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pendiente",
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    products: [productSchema]
});

orderSchema.statics.findByUserId = function (id) {
    return this.find({ userData: id })
}

orderSchema.statics.findOpenOrder = function (userId) {
    return this.findOne({ userData: userId, status: "Pendiente" })
}

orderSchema.methods.getTotalOrder = function () {
    return this.products.reduce((acum, currentValue) => acum + currentValue.total, 0);
}

const Order = Model("Order", orderSchema);

const fetchProductsInfo = async (products) => {
    const addInfoProducts = async function ({ quantity, id }) {
        const { price, name } = await Product.findById(id);
        const total = quantity * price;
        return { _id: id, price, name, total, quantity };
    }
    const promises = products.map(product => addInfoProducts(product));
    return newProducts = await Promise.all(promises);
}

const editProductsOrder = async (products, orderProducts) => {
    const newProducts = await fetchProductsInfo(products);
    newProducts.forEach(prod => {
        const validate = orderProducts.id(prod._id);
        if (validate) {
            validate.remove();
            orderProducts.push(prod);
        }
        else {
            orderProducts.push(prod);
        }
    });
}





module.exports = { Order, fetchProductsInfo, editProductsOrder }
