const Joi = require('joi')

const SellerLogin = Joi.object({
  email: Joi.string().email().required().label('Seller Email'),
  password: Joi.string().min(4).required().label('Seller Password')
});

module.exports = {
  SellerLogin
};