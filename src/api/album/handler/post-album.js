const postAlbum = async (_this, request, h) => {
  _this._albumValidator.validatePostAlbumPayload(request.payload);
  const { name, year } = request.payload;

  const AlbumId = await _this._albumService.postAlbumService({ name, year });

  const response = h.response({
    status: 'success',
    message: 'Album berhasil ditambahkan',
    data: {
      albumId: AlbumId,
    },
  });
  response.code(201);
  return response;
};

module.exports = postAlbum;
