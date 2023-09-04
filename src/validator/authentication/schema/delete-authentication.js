const Joi = require('joi');

const DeleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = DeleteAuthenticationPayloadSchema;
