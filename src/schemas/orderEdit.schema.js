const Joi = require('joi');

const array = Joi.array().items(
    Joi.object({
        id: Joi.string()
            .required(),
        quantity: Joi.number()
            .positive()
    }
    )
);

const schema = Joi.object({
    addressId: Joi.string(),
    products: array,
    paymentMethodId: Joi.string(),
});

module.exports = schema