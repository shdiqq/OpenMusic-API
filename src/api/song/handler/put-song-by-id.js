const putSongById = async (_this, request) => {
  _this._validator.validatePutSongByIdPayload(request.payload);
  const { title, year, genre, performer, duration, albumId } = request.payload;
  const { id } = request.params;

  await _this._service.putSongByIdService(id, {
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
  });

  return {
    status: 'success',
    message: 'Song berhasil diperbarui',
  };
};

module.exports = putSongById;
