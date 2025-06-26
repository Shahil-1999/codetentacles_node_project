const Joi = require('joi')

const addBrand = Joi.object({
  name: Joi.string().required().label('Name'),
  details: Joi.string().optional().label('Details'),
  image: Joi.string().optional().label('image'),
  price: Joi.number().required().label('price'),
  product_id: Joi.number().required().label('Product ID')

});

module.exports={
    addBrand
}