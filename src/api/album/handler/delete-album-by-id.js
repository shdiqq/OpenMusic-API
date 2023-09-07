const deleteAlbumByIdHandler = async (_this, request) => {
  const { id } = request.params;
  await _this._albumService.deleteAlbumByIdService(id);
  return {
    status: 'success',
    message: 'Album berhasil dihapus',
  };
};

module.exports = deleteAlbumByIdHandler;
