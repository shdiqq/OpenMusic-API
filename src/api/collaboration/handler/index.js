const deleteCollaboration = require('./delete-collaboration');
const postCollaboration = require('./post-collaboration');

class CollaborationHandler {
  constructor(collaborationService, validator) {
    this._collaborationService = collaborationService;
    this._validator = validator;
  }

  postCollaborationHandler = async (request, h) => {
    const result = await postCollaboration(this, request, h);
    return result;
  };

  deleteCollaborationHandler = async (request, h) => {
    const result = await deleteCollaboration(this, request, h);
    return result;
  };
}

module.exports = CollaborationHandler;
