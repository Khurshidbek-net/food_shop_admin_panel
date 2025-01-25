const Joi = require("joi");

exports.adminValidation = (data) =>{

  const adminSchema = Joi.object({
    first_name: Joi.string().required().trim().min(3).max(20),
    last_name: Joi.string().required().trim().min(5).max(20),
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().trim().required().min(6).max(30),
    phone: Joi.string().pattern(/^(\+998)\d{2}-\d{3}-\d{2}-\d{2}$/),
  });

  return adminSchema.validate(data, {abortEarly: false});
}