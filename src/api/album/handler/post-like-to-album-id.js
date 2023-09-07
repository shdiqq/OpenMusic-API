const postLikeToAlbumId = async (_this, request, h) => {
  const { id } = request.params;
  const { id: credentialId } = request.auth.credentials;

  const message = await _this._albumService.postLikeToAlbumIdService(
    id,
    credentialId
  );
  const response = h.response({
    status: 'success',
    message,
  });
  response.code(201);
  return response;
};

module.exports = postLikeToAlbumId;
