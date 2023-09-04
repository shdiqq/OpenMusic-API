const deletePlaylistById = async (_this, request) => {
  const { id: owner } = request.auth.credentials;
  const { id } = request.params;
  await _this._service.deletePlaylistByIdService(id, owner);
  return {
    status: 'success',
    message: 'Playlist berhasil dihapus',
  };
};

module.exports = deletePlaylistById;
