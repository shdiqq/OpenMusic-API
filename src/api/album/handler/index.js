const deleteAlbumById = require('./delete-album-by-id');
const getAlbumById = require('./get-album-by-id');
const postAlbum = require('./post-album');
const putAlbumById = require('./put-album-by-id');

class AlbumHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postAlbumHandler = async (request, h) => {
    const result = await postAlbum(this, request, h);
    return result;
  };

  getAlbumByIdHandler = async (request) => {
    const result = await getAlbumById(this, request);
    return result;
  };

  putAlbumByIdHandler = async (request) => {
    const result = await putAlbumById(this, request);
    return result;
  };

  deleteAlbumByIdHandler = async (request) => {
    const result = await deleteAlbumById(this, request);
    return result;
  };
}

module.exports = AlbumHandler;
