const getPlaylistIdActivities = async (_this, request) => {
  const { id: owner } = request.auth.credentials;
  const { id } = request.params;
  const data = await _this._service.getPlaylistIdActivitiesService(id, owner);
  return {
    status: 'success',
    data,
  };
};

module.exports = getPlaylistIdActivities;
