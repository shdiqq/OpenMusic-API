const postSongToPlaylistId = async (_this, request, h) => {
  _this._validator.validatePostSongToPlaylistIdPayload(request.payload);
  const { id: owner } = request.auth.credentials;
  const { songId } = request.payload;
  const { id: playlistId } = request.params;

  const PlaylistId = await _this._service.postSongToPlaylistIdService({playlistId, songId, owner});

  const response = h.response({
    status: 'success',
    message: 'Song berhasil ditambahkan pada playlist',
    data: {
      playlistId: PlaylistId,
    },
  });
  response.code(201);
  return response;

};

module.exports = postSongToPlaylistId;
