const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    price: Joi.number()
        .positive()
        .required(),
});

module.exports = schema