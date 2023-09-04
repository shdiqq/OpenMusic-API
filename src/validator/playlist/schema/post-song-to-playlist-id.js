const Joi = require('joi');

const PostSongToPlaylistIdPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = PostSongToPlaylistIdPayloadSchema;
