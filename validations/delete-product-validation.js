const Joi = require('joi')

const deleteProduct = Joi.object({
  id: Joi.number().integer().required().label('ID')
});

module.exports = {
    deleteProduct
}
