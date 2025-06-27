const Joi = require('joi')

const addProduct = Joi.object({

  product_name: Joi.string().required().label('Product Name'),
  product_description: Joi.string().allow('', null).label('Product Description'),
  brands: Joi.array().items(
    Joi.object({
      brand_name: Joi.string().required().label('Brand Name'),
      detail: Joi.string().allow('', null).label('Brand Details'),
      image: Joi.string().uri().required().label('Brand Image'),
      price: Joi.number().required().label('Price')
    })
  ).min(1).required()
});

module.exports = {
  addProduct
}