const getSongInPlaylistId = async (_this, request) => {
  const { id: owner } = request.auth.credentials;
  const { id } = request.params;
  const Playlist = await _this._service.getSongInPlaylistIdService(id, owner);
  return {
    status: 'success',
    data: {
      playlist: Playlist,
    },
  };
};

module.exports = getSongInPlaylistId;
