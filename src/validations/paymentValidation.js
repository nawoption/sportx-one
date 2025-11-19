const Joi = require("joi");

// Payment transaction validation schema
const paymentTransactionSchema = Joi.object({
    to: Joi.string().required(),
    toModel: Joi.string().valid("Admin", "Senior", "Master", "Agent", "User").required(),
    type: Joi.string().valid("deposit", "withdraw").required(),
    amount: Joi.number().positive().required(),
    remark: Joi.string().allow("").optional(),
});

module.exports = {
    paymentTransactionSchema,
};
