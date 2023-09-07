const postCoverToAlbumId = async (_this, request, h) => {
  const { id } = request.params;
  const { cover } = request.payload;

  await _this._albumService.getAlbumByIdService(id);

  _this._uploadValidator.validateImageHeaders(cover.hapi.headers);

  const filename = await _this._storageService.writeFile(cover, cover.hapi);
  const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/api/album/file/cover/${filename}`;
  await _this._albumService.putCoverAlbumIdService(id, fileLocation);

  const response = h.response({
    status: 'success',
    message: 'Sampul berhasil diunggah',
  });
  response.code(201);
  return response;
};

module.exports = postCoverToAlbumId;
