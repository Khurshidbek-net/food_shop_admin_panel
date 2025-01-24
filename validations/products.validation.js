const Joi = require("joi");

exports.productValidationSchema = (data) => {
  const adminSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().default("").max(600),
    price: Joi.number().required(),
    stock: Joi.number().default(0),
    category_id: Joi.string().required(),
    discount_id: Joi.string(),
  });

  return adminSchema.validate(data, { abortEarly: false });
};
