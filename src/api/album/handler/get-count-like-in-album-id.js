const getCountLikeInAlbumId = async (_this, request, h) => {
  const { id } = request.params;
  const { likes, source } =
    await _this._albumService.getCountLikeInAlbumIdService(id);
  const response = h.response({
    status: 'success',
    data: {
      likes,
      source,
    },
  });
  response.header('X-Data-Source', source);
  response.code(200);
  return response;
};

module.exports = getCountLikeInAlbumId;
