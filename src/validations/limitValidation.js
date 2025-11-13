const Joi = require("joi");

const limitValidationSchema = Joi.object({
    // Body Match
    bodyMatchFT: Joi.number().min(1000).max(1000000).required(),
    bodyMatchHT: Joi.number().min(1000).max(1000000).required(),
    // Handicap/Over/Under
    hdpOuMin: Joi.number().min(1000).max(1000000).required(),
    hdpOuMax: Joi.number().min(1000).max(1000000).required(),
    // Parlay
    parlayMin: Joi.number().min(500).max(1000000).required(),
    parlayMax: Joi.number().min(1000).max(1000000).required(),
    // Over/Under Match
    ouMatchFT: Joi.number().min(1000).max(1000000).required(),
    ouMatchHT: Joi.number().min(1000).max(1000000).required(),
    // Even/Odd
    eoMinFT: Joi.number().min(1000).max(1000000).required(),
    eoMaxFT: Joi.number().min(1000).max(1000000).required(),
    // Correct Score (CS)
    csMinFT: Joi.number().min(1000).max(1000000).required(),
    csMaxFT: Joi.number().min(1000).max(1000000).required(),
    // 1X2
    oneX2MinFT: Joi.number().min(1000).max(1000000).required(),
    oneX2MaxFT: Joi.number().min(1000).max(1000000).required(),
});

module.exports = {
    limitValidationSchema,
};
