const deleteLikeInAlbumId = async (_this, request, h) => {
  const { id } = request.params;
  const { id: credentialId } = request.auth.credentials;

  const message = await _this._albumService.DeleteLikeInAlbumIdService(
    id,
    credentialId
  );
  const response = h.response({
    status: 'success',
    message,
  });
  response.code(200);
  return response;
};

module.exports = deleteLikeInAlbumId;
