const Joi = require('joi');

const PostSongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number().default(null),
  albumId: Joi.string().default(null),
});

module.exports = PostSongPayloadSchema;
