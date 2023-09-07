const getAlbumById = async (_this, request) => {
  const { id } = request.params;
  const Album = await _this._albumService.getAlbumByIdService(id);
  return {
    status: 'success',
    data: {
      album: Album,
    },
  };
};

module.exports = getAlbumById;
