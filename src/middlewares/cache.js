const clientRedis = require('../redis');

const cacheProducts = (req, res, next) => {
    try {
        clientRedis.get('products', (err, data) => {
            if (err) throw err;
            if (data) res.json(JSON.parse(data));
            else next();
        });
    } catch (e) {
        getDefaultResponse(res, 500, 1);
    }
}

module.exports = cacheProducts;