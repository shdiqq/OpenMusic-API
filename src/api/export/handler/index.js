const postExportSongToPlaylistId = require('./post-export-song');

class ExportHandler {
  constructor(service, playlistService, validator) {
    this._service = service;
    this._playlistService = playlistService;
    this._validator = validator;
  }

  postExportSongToPlaylistIdHandler = async (request, h) => {
    const result = await postExportSongToPlaylistId(this, request, h);
    return result;
  };
}

module.exports = ExportHandler;
