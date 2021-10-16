const { getDefaultResponse } = require('../utils/messages');
const bcrypt = require('bcrypt');
const User = require("../models/user.model");

async function validateUserMiddleware(req, res, next) {
    try {
        const { username, password } = req.body;
        const { password: userPassword } = await User.findByUsername(username);
        const validate = await bcrypt.compare(password, userPassword)
        if (validate) next();
        else {
            getDefaultResponse(res, 401, 1);
        }
    } catch (e) {
        getDefaultResponse(res, 404, 1);
    }
}

module.exports = validateUserMiddleware;