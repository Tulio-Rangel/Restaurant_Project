const redis = require('redis');
const config = require('./config');
const client = redis.createClient(config.REDIS_PORT);

module.exports = client;