const Joi = require("joi");

module.exports = {
  signup: {
    body: Joi.object({
      name: Joi.string().required(),
      role: Joi.string().required().valid('owner', 'customer'),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  signin: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },

};
