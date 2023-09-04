const { Pool } = require('pg');
const getPlaylist = require('./get-playlist');
const postSongToPlayListId = require('./post-song-to-playlist-id');
const postPlaylist = require('./post-playlist');
const getSongInPlaylistId = require('./get-song-in-playlist-id');
const deleteSongFromPlaylistId = require('./delete-song-from-playlist-id');
const deletePlaylistById = require('./delete-playlist-by-id');
const getPlaylistIdActivities = require('./get-playlist-id-activities');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async postPlaylistService({ name, owner }) {
    const result = await postPlaylist(this, { name, owner });
    return result;
  }

  async getPlaylistService({ owner }) {
    const result = await getPlaylist(this, { owner });
    return result;
  }

  async postSongToPlaylistIdService({ playlistId, songId, owner }) {
    const result = await postSongToPlayListId(this, { playlistId, songId, owner });
    return result;
  }

  async getSongInPlaylistIdService(id, owner) {
    const result = await getSongInPlaylistId(this, id, owner);
    return result;
  }

  async deleteSongFromPlaylistIdService({ playlistId, songId, owner }) {
    const result = await deleteSongFromPlaylistId(this, { playlistId, songId, owner });
    return result;
  }

  async deletePlaylistByIdService(id, owner) {
    const result = await deletePlaylistById(this, id, owner);
    return result;
  }

  async getPlaylistIdActivitiesService(id, owner) {
    const result = await getPlaylistIdActivities(this, id, owner);
    return result;
  }
}

module.exports = PlaylistService;
