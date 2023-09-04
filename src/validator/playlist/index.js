const InvariantError = require('../../exception/InvariantError');
const DeleteSongFromPlaylistIdPayloadSchema = require('./schema/delete-song-from-playlist-id');
const PostPlaylistPayloadSchema = require('./schema/post-playlist');
const PostSongToPlaylistIdPayloadSchema = require('./schema/post-song-to-playlist-id');

const SongValidator = {
  validatePostPlaylistPayload: (payload) => {
    const validationResult = PostPlaylistPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePostSongToPlaylistIdPayload: (payload) => {
    const validationResult =
      PostSongToPlaylistIdPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteSongFromPlaylistIdPayload: (payload) => {
    const validationResult =
      DeleteSongFromPlaylistIdPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongValidator;
