const getPlaylist = async (_this, request) => {
  const { id: owner } = request.auth.credentials;
  const Playlist = await _this._service.getPlaylistService({owner});
  return {
    status: 'success',
    data: {
      playlists: Playlist,
    },
  };
};

module.exports = getPlaylist;
