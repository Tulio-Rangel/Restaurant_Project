const { getDefaultResponse } = require('../utils/messages');
const User = require("../models/user.model");

async function adminAuthMiddleware(req, res, next) {
    try {
        const { username } = req.user;
        const { isAdmin } = await User.findByUsername(username);
        if (isAdmin) {
            next();
        } else {
            getDefaultResponse(res, 403, 1);
        }
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

module.exports = adminAuthMiddleware;