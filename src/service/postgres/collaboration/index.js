const { Pool } = require('pg');
const postCollaboration = require('./post-collaboration');
const deleteCollaboration = require('./delete-collaboration');

class CollaborationService {
  constructor() {
    this._pool = new Pool();
  }

  async postCollaborationService(playlistId, userId, owner) {
    const result = await postCollaboration(this, playlistId, userId, owner);
    return result;
  }

  async deleteCollaborationService(playlistId, userId, owner) {
    const result = await deleteCollaboration(this, playlistId, userId, owner);
    return result;
  }
}

module.exports = CollaborationService;
