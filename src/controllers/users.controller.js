const { getDefaultResponse, getDynamicResponse } = require('../utils/messages');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require("../models/user.model");

const loginController = (req, res) => {
    try {
        const username = req.body.username;
        const token = jwt.sign({ username }, config.JWT_PASSWORD);
        res.json({ token })
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const registerController = async (req, res) => {
    try {
        const { username, fullName, email, phone, address, password, isAdmin } = req.body;
        const newUser = new User({
            username,
            fullName,
            email,
            phone,
            password: bcrypt.hashSync(password, config.SALT_ROUNDS),
            isAdmin
        });
        newUser.addresses.push({ address });
        await newUser.save();
        getDynamicResponse(res, 201, "Usuario registrado");
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const getAddressesController = async (req, res) => {
    try {
        const username = req.user.username;
        const { addresses } = await User.findByUsername(username);
        res.json(addresses);
    }
    catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const createAddressController = async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findByUsername(username);
        const address = req.body.address;
        user.addresses.push({ address });
        await user.save();
        getDynamicResponse(res, 201, "Direccion añadida");
    }
    catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const editAddressController = async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findByUsername(username);
        const id = req.params.id;
        const address = req.body.address;
        const oldAddress = user.addresses.id(id);
        oldAddress.address = address;
        await user.save();
        res.json(oldAddress);
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const deleteAddressController = async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findByUsername(username);
        const id = req.params.id;
        user.addresses.id(id).remove();
        await user.save();
        getDynamicResponse(res, 200, "Dirección eliminada");
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

const getAccountsStatusController = async (req, res) => {
    try {
        const accountsStatus = await User.find({}, '_id username isActive');
        res.status(200).json(accountsStatus)
    } catch (e) {

    }
}

const changeStatusAccountController = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const user = await User.findById(id);
        user.changeAccountState(status);
        user.save();
        getDynamicResponse(res, 200, "Se cambio el estado de la cuenta del usuario");
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

module.exports = {
    loginController,
    registerController,
    getAddressesController,
    createAddressController,
    editAddressController,
    deleteAddressController,
    changeStatusAccountController,
    getAccountsStatusController
};