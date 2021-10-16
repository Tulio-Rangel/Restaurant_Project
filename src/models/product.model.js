const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

module.exports = Model("Product", productSchema);