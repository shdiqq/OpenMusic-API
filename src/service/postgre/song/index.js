const { Pool } = require('pg');
const postSong = require('./post-song');
const getSong = require('./get-song');
const getSongById = require('./get-song-by-id');
const putSongById = require('./put-song-by-id');
const deleteSongById = require('./delete-song-by-id');

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  async postSongService({ title, year, genre, performer, duration, albumId }) {
    const result = await postSong(this, {
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    });
    return result;
  }

  async getSongService(title, performer) {
    const result = await getSong(this, title, performer);
    return result;
  }

  async getSongByIdService(id) {
    const result = await getSongById(this, id);
    return result;
  }

  async putSongByIdService(
    id,
    { title, year, genre, performer, duration, albumId }
  ) {
    const result = await putSongById(this, id, {
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    });
    return result;
  }

  async deleteSongByIdService(id) {
    const result = await deleteSongById(this, id);
    return result;
  }
}

module.exports = SongService;
