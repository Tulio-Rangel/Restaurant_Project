const { getDefaultResponse } = require('../utils/messages');
const expressJwt = require('express-jwt')
const config = require('../config');

const validateTokenMiddleware = expressJwt({
    secret: config.JWT_PASSWORD,
    algorithms: ['HS256']
}).unless({
    path: ['/login', '/register']
});

const errorMiddleware = (err, _, res, __) => {
    if (err.name === 'UnauthorizedError') {
        getDefaultResponse(res, 401, 1);
    }
}
module.exports = { validateTokenMiddleware, errorMiddleware }