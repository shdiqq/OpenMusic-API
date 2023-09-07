const verifyPlaylistOwner = require('../../../util/verify-playlist-owner');

const postExportSongToPlaylistId = async (_this, request, h) => {
  _this._validator.validatePostExportSongToPlaylistIdPayload(request.payload);

  const { playlistId } = request.params;
  const { id: owner } = request.auth.credentials;

  await verifyPlaylistOwner(_this._playlistService, playlistId, owner);

  const message = {
    userId: owner,
    playlistId,
    targetEmail: request.payload.targetEmail,
  };

  await _this._service.sendMessage('export:playlist', JSON.stringify(message));

  const response = h.response({
    status: 'success',
    message: 'Permintaan Anda sedang kami proses',
  });
  response.code(201);
  return response;
};

module.exports = postExportSongToPlaylistId;
