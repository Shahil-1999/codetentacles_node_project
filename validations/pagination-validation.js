const Joi = require('joi')

const pagination = Joi.object({
  page: Joi.number().min(1).optional().label('page'),
  limit: Joi.number().min(1).optional().label('limit')
});

module.exports = {
  pagination
};