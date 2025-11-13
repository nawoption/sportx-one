const Joi = require("joi");

const commissionValidationSchema = Joi.object({
    hdpOuFtLg: Joi.number().min(0.1).max(1).required(),
    hdpOuFtSm: Joi.number().min(0.1).max(1).required(),
    hdpOuHtLg: Joi.number().min(0.1).max(1).required(),
    hdpOuHtSm: Joi.number().min(0.1).max(1).required(),
    mixParlay2: Joi.number().min(0.1).max(7).required(),
    mixParlay3to8: Joi.number().min(0.1).max(15).required(),
    mixParlay9to11: Joi.number().min(0.1).max(15).required(),
    oneX2Ft: Joi.number().min(0.1).max(1).required(),
    csFt: Joi.number().min(0.1).max(1).required(),
    eoFt: Joi.number().min(0.1).max(1).required(),
});

module.exports = {
    commissionValidationSchema,
};
