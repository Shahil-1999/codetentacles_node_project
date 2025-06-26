const Joi = require('joi')
const createSeller = Joi.object({
  name: Joi.string().required().label('Name'),
  email: Joi.string().email().required().label('Email'),
  mobile: Joi.number().required().label('Mobile'),
  country: Joi.string().required().label('country'),
  state: Joi.string().required().label('state'),
  password: Joi.string().required().label('password'),
  skills: Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string())).required(),
});

module.exports = {
    createSeller
}