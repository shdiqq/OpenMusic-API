const { Pool } = require('pg');
const postAlbum = require('./post-album');
const getAlbumById = require('./get-album-by-id');
const putAlbumById = require('./put-album-by-id');
const deleteAlbumById = require('./delete-album-by-id');

class AlbumService {
  constructor() {
    this._pool = new Pool();
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
}

module.exports = AlbumService;
