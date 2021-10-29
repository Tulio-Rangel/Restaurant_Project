const { on } = require("nodemon")

module.exports = {
    PORT: process.env.PORT,
    DB_URI: process.env.MONGODB_URI,
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
    JWT_PASSWORD: process.env.JWT_PASS,
    REDIS_PORT: parseInt(process.env.REDIS_PORT)
}