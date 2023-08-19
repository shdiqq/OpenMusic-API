const getSong = async (_this, request) => {
  const { title, performer } = request.query;
  const Song = await _this._service.getSongService(title, performer);
  return {
    status: 'success',
    data: {
      songs: Song,
    },
  };
};

module.exports = getSong;
