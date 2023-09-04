const deletePlaylistById = require("./delete-playlist-by-id");
const getPlaylist = require("./get-playlist");
const postPlaylist = require("./post-playlist");
const postSongToPlaylistId = require("./post-song-to-playlist-id");
const getSongInPlaylistId = require("./get-song-in-playlist-id");
const deleteSongFromPlaylistId = require("./delete-song-from-playlist-id");
const getPlaylistIdActivities = require("./get-playlist-id-activities");

class PlaylistHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postPlaylistHandler = async (request, h) => {
    const result = await postPlaylist(this, request, h);
    return result;
  };

  postSongToPlaylistIdHandler = async (request, h) => {
    const result = await postSongToPlaylistId(this, request, h);
    return result;
  };

  getPlaylistHandler = async (request) => {
    const result = await getPlaylist(this, request);
    return result;
  };

  getSongInPlaylistIdHandler = async (request) => {
    const result = await getSongInPlaylistId(this, request);
    return result;
  };

  deleteSongFromPlaylistIdHandler = async (request) => {
    const result = await deleteSongFromPlaylistId(this, request);
    return result;
  };

  deletePlaylistByIdHandler = async (request) => {
    const result = await deletePlaylistById(this, request);
    return result;
  };

  getPlaylistIdActivitiesHandler = async (request) => {
    const result = await getPlaylistIdActivities(this, request);
    return result;
  };
}

module.exports = PlaylistHandler;
