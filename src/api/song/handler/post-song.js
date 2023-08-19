const postSong = async (_this, request, h) => {
  _this._validator.validatePostSongPayload(request.payload);
  const {
    title,
    year,
    genre,
    performer,
    duration,
    albumId = null,
  } = request.payload;

  const SongId = await _this._service.postSongService({
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
  });

  const response = h.response({
    status: 'success',
    message: 'Song berhasil ditambahkan',
    data: {
      songId: SongId,
    },
  });
  response.code(201);
  return response;
};

module.exports = postSong;
