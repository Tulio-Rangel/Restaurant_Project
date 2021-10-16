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
    addressId: Joi.string()
        .required(),
    products: array.required(),
    paymentMethodId: Joi.string().required()
});

module.exports = schema