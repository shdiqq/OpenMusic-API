const deleteAlbumById = require('./delete-album-by-id');
const deleteLikeInAlbumId = require('./delete-like-in-album-id');
const getAlbumById = require('./get-album-by-id');
const getCountLikeInAlbumId = require('./get-count-like-in-album-id');
const postAlbum = require('./post-album');
const postCoverToAlbumId = require('./post-cover-to-album-id');
const postLikeToAlbumId = require('./post-like-to-album-id');
const putAlbumById = require('./put-album-by-id');

class AlbumHandler {
  constructor(albumService, albumValidator, storageService, uploadValidator) {
    this._albumService = albumService;
    this._albumValidator = albumValidator;
    this._storageService = storageService;
    this._uploadValidator = uploadValidator;
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

  postCoverToAlbumIdHandler = async (request, h) => {
    const result = await postCoverToAlbumId(this, request, h);
    return result;
  };

  postLikeToAlbumIdHandler = async (request, h) => {
    const result = await postLikeToAlbumId(this, request, h);
    return result;
  };

  getCountLikeInAlbumIdHandler = async (request, h) => {
    const result = await getCountLikeInAlbumId(this, request, h);
    return result;
  };

  deleteLikeInAlbumIdHandler = async (request, h) => {
    const result = await deleteLikeInAlbumId(this, request, h);
    return result;
  };
}

module.exports = AlbumHandler;
