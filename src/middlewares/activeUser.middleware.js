const { getDefaultResponse } = require('../utils/messages');
const User = require("../models/user.model");

async function activeUserMiddleware(req, res, next) {
    try {
        const { username } = req.user;
        const { isActive } = await User.findByUsername(username);
        if (isActive) {
            next();
        } else {
            getDefaultResponse(res, 403, 1);
        }
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

module.exports = activeUserMiddleware;