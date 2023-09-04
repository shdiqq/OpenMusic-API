const InvariantError = require('../../exception/InvariantError');
const DeleteCollaborationPayloadSchema = require('./schema/delete-collaboration');
const PostCollaborationPayloadSchema = require('./schema/post-collaboration');

const CollaborationValidator = {
  validatePostCollaborationPayload: (payload) => {
    const validationResult = PostCollaborationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteCollaborationPayload: (payload) => {
    const validationResult = DeleteCollaborationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CollaborationValidator;
