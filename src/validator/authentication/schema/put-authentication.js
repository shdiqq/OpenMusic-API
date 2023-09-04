const Joi = require('joi');

const PutAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = PutAuthenticationPayloadSchema;
