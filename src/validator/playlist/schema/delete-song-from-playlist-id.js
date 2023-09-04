const Joi = require('joi');

const DeleteSongFromPlaylistIdPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = DeleteSongFromPlaylistIdPayloadSchema;
