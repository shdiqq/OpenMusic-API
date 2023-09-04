const deleteSongFromPlaylistId = async (_this, request) => {
  _this._validator.validateDeleteSongFromPlaylistIdPayload(request.payload);
  const { id: owner } = request.auth.credentials;
  const { songId } = request.payload;
  const { id: playlistId } = request.params;

  await _this._service.deleteSongFromPlaylistIdService({playlistId, songId, owner});

  return {
    status: 'success',
    message: 'Song dari Playlist berhasil dihapus',
  };
};

module.exports = deleteSongFromPlaylistId;
