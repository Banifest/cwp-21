const Joi = require('joi');

const schemas = {
    'properties': Joi.object().keys({
        heading: Joi.string().max(50).min(1),
        price: Joi.number().min(1),
        currency: Joi.string().max(50).regex(/BYN|USD|EUR/),
        location: Joi.string().max(50).min(1),
    }),

    'offices': Joi.object().keys({
        title: Joi.string().max(50).min(1),
        website: Joi.string().max(50).min(1),
        address: Joi.string().max(50).min(1),
    }),

    'agents': Joi.object().keys({
        name: Joi.string().max(50).min(1),
        email: Joi.string().email().max(50).min(1),
        tel: Joi.string().max(50).min(1),
    }),
};

exports.check = function (schema, body)
{
    if (!schemas[schema])  return {};
    return Joi.validate(body, schemas[schema], { presence: 'required' });
};