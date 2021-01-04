const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string(),
  password: Joi.string(),
  to: Joi.alternatives().try(
    Joi.string().email(),
    Joi.string().pattern(/^0[1-9]\d{8}$/)
  ),
  subject: Joi.string().trim().optional(),
  message: Joi.string().trim(),
});
