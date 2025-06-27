const Joi = require('joi')

const admin = Joi.object({
  email: Joi.string().email().required().label('Admin Email'),
  password: Joi.string().min(5).required().label('Admin Password')
});

module.exports = {
  admin
};