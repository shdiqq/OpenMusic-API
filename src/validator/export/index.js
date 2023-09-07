const InvariantError = require('../../exception/InvariantError');
const PostExportSongToPlaylistIdPayloadSchema = require('./schema/post-export-song-to-playlist-id-payload-schema');

const ExportValidator = {
  validatePostExportSongToPlaylistIdPayload: (payload) => {
    const validationResult =
      PostExportSongToPlaylistIdPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExportValidator;
