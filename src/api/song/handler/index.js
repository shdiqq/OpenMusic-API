const deleteSongById = require('./delete-song-by-id');
const getSong = require('./get-song');
const getSongById = require('./get-song-by-id');
const postSong = require('./post-song');
const putSongById = require('./put-song-by-id');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postSongHandler = async (request, h) => {
    const result = await postSong(this, request, h);
    return result;
  };

  getSongHandler = async (request) => {
    const result = await getSong(this, request);
    return result;
  };

  getSongByIdHandler = async (request) => {
    const result = await getSongById(this, request);
    return result;
  };

  putSongByIdHandler = async (request) => {
    const result = await putSongById(this, request);
    return result;
  };

  deleteSongByIdHandler = async (request) => {
    const result = await deleteSongById(this, request);
    return result;
  };
}

module.exports = SongHandler;
