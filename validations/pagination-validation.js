const Joi = require('joi')

const pagination = Joi.object({
  page: Joi.number().min(1).optional().label('Page'),
  limit: Joi.number().min(1).optional().label('Limit')
});

module.exports = {
  pagination
};