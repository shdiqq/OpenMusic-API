const deleteCollaboration = async (_this, request) => {
  _this._validator.validateDeleteCollaborationPayload(request.payload);
  const { id: owner } = request.auth.credentials;
  const { playlistId, userId } = request.payload;

  await _this._collaborationService.deleteCollaborationService(playlistId, userId, owner);

  return {
    status: 'success',
    message: 'Kolaborasi berhasil dihapus',
  };
};

module.exports = deleteCollaboration;
