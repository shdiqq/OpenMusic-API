const Joi = require('joi');

const PostExportSongToPlaylistIdPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = PostExportSongToPlaylistIdPayloadSchema;
