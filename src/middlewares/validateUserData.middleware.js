const { getDefaultResponse } = require('../utils/messages');
const User = require("../models/user.model");

async function validateUserDataMiddleware(req, res, next) {
    const { email, username } = req.body;
    const validateEmail = await User.findByEmail(email)
    const validateUsername = await User.findByUsername(username);
    if (validateEmail) {
        getDefaultResponse(res, 400, 5);
    } else if (validateUsername) {
        getDefaultResponse(res, 400, 6);
    } else {
        next();
    };
}

module.exports = validateUserDataMiddleware;