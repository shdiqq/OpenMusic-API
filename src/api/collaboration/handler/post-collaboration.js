const postCollaboration = async (_this, request, h) => {
  _this._validator.validatePostCollaborationPayload(request.payload);
  const { id: owner } = request.auth.credentials;
  const { playlistId, userId } = request.payload;

  const collaborationId = await _this._collaborationService.postCollaborationService(playlistId, userId, owner);

  const response = h.response({
    status: 'success',
    message: 'Kolaborasi berhasil ditambahkan',
    data: {
      collaborationId,
    },
  });
  response.code(201);
  return response;
};

module.exports = postCollaboration;
