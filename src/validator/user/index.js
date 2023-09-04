const InvariantError = require('../../exception/InvariantError');
const PostUserPayloadSchema = require('./schema/post-user');

const UserValidator = {
  validatePostUserPayload: (payload) => {
    const validationResult = PostUserPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UserValidator;
