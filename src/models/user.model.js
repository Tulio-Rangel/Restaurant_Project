const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const addressSchema = new Schema({
    address: {
        type: String,
    }
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    addresses: [addressSchema],
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

userSchema.statics.findByUsername = function (username) {
    return this.findOne({ username })
}

userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email })
}

userSchema.methods.changeAccountState = function (status) {
    this.isActive = status;
}


module.exports = Model("User", userSchema);
