const PostSongPayloadSchema = require('./schema/post-song');
const PutSongByIdPayloadSchema = require('./schema/put-song-by-id');
const InvariantError = require('../../exception/InvariantError');

const SongValidator = {
  validatePostSongPayload: (payload) => {
    const validationResult = PostSongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutSongByIdPayload: (payload) => {
    const validationResult = PutSongByIdPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongValidator;
