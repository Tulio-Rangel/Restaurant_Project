const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const paymentMethodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});

module.exports = Model("PaymentMethod", paymentMethodSchema);

