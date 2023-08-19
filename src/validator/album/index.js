const PostAlbumPayloadSchema = require('./schema/post-album');
const PutAlbumByIdPayloadSchema = require('./schema/put-album-by-id');
const InvariantError = require('../../exception/InvariantError');

const AlbumValidator = {
  validatePostAlbumPayload: (payload) => {
    const validationResult = PostAlbumPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutAlbumByIdPayload: (payload) => {
    const validationResult = PutAlbumByIdPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumValidator;
