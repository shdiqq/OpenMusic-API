const postPlaylist = async (_this, request, h) => {
  _this._validator.validatePostPlaylistPayload(request.payload);
  const { id: owner } = request.auth.credentials;
  const { name } = request.payload;

  const PlaylistId = await _this._service.postPlaylistService({name, owner});

  const response = h.response({
    status: 'success',
    message: 'Playlist berhasil ditambahkan',
    data: {
      playlistId: PlaylistId,
    },
  });
  response.code(201);
  return response;
};

module.exports = postPlaylist;
