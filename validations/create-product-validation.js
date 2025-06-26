const Joi = require('joi')

const addProduct = Joi.object({
  name: Joi.string().required().label('Name'),
  description: Joi.string().optional().label('Description'),
});

module.exports={
    addProduct
}