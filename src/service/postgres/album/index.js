const { Pool } = require('pg');
const postAlbum = require('./post-album');
const getAlbumById = require('./get-album-by-id');
const putAlbumById = require('./put-album-by-id');
const deleteAlbumById = require('./delete-album-by-id');
const getCountLikeInAlbumId = require('./get-count-like-in-album-id');
const postLikeToAlbumId = require('./post-like-to-album-id');
const putCoverAlbumId = require('./put-cover-album-id');
const deleteLikeInAlbumId = require('./delete-like-in-album-id');

class AlbumService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async postAlbumService({ name, year }) {
    const result = await postAlbum(this, { name, year });
    return result;
  }

  async getAlbumByIdService(id) {
    const result = await getAlbumById(this, id);
    return result;
  }

  async putAlbumByIdService(id, { name, year }) {
    const result = await putAlbumById(this, id, { name, year });
    return result;
  }

  async deleteAlbumByIdService(id) {
    const result = await deleteAlbumById(this, id);
    return result;
  }

  async putCoverAlbumIdService(id, fileLocation) {
    await putCoverAlbumId(this, id, fileLocation);
  }

  async postLikeToAlbumIdService(id, userId) {
    const result = await postLikeToAlbumId(this, id, userId);
    return result;
  }

  async getCountLikeInAlbumIdService(id) {
    const result = await getCountLikeInAlbumId(this, id);
    return result;
  }

  async DeleteLikeInAlbumIdService(id, userId) {
    const result = await deleteLikeInAlbumId(this, id, userId);
    return result;
  }
}

module.exports = AlbumService;
