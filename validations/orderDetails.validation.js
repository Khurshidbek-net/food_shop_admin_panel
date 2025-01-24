const Joi = require("joi");

exports.orderDetailsValidation = (data) => {
    const orderDetailsSchema = Joi.object({
        name: Joi.string()
        .max(40)
        .message("ism maximal 40 ta belgidan iborat bo'lishi kerak!")
        .min(4)
        .message("ism minimal 4 ta belgidan iborat bo'lishi kerak!"),
        quantity: Joi.number(),
        price: Joi.number()
    })
    return orderDetailsSchema.validate(data, {abortEarly: false})
}