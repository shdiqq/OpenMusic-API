const deleteSongByIdHandler = async (_this, request) => {
  const { id } = request.params;
  await _this._service.deleteSongByIdService(id);
  return {
    status: 'success',
    message: 'Song berhasil dihapus',
  };
};

module.exports = deleteSongByIdHandler;
