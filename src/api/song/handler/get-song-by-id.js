const getSongById = async (_this, request) => {
  const { id } = request.params;
  const Song = await _this._service.getSongByIdService(id);
  return {
    status: 'success',
    data: {
      song: Song,
    },
  };
};

module.exports = getSongById;
