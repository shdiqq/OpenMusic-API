const Joi = require('joi');

const PutAlbumByIdPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

module.exports = PutAlbumByIdPayloadSchema;
