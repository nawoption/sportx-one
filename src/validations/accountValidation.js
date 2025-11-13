const Joi = require("joi");
const { limitValidationSchema } = require("./limitValidation");
const { commissionValidationSchema } = require("./comissionValidation");

const accountCreateSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    contact: Joi.string().optional(),
    limit: limitValidationSchema.required(),
    commission: commissionValidationSchema.required(),
});

const accountUpdateSchema = Joi.object({
    limit: limitValidationSchema.required(),
    commission: commissionValidationSchema.required(),
});

module.exports = {
    accountCreateSchema,
    accountUpdateSchema,
};
