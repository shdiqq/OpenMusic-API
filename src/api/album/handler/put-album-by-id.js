const putAlbumById = async (_this, request) => {
  _this._albumValidator.validatePutAlbumByIdPayload(request.payload);
  const { name, year } = request.payload;
  const { id } = request.params;

  await _this._albumService.putAlbumByIdService(id, { name, year });

  return {
    status: 'success',
    message: 'Album berhasil diperbarui',
  };
};

module.exports = putAlbumById;
