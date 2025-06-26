const Joi = require('joi')

const SellerLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required()
});

module.exports = {
  SellerLogin
};