const AlbumHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'album',
  version: '1.0.0',
  register: async (
    server,
    { albumService, albumValidator, storageService, uploadValidator }
  ) => {
    const albumHandler = new AlbumHandler(
      albumService,
      albumValidator,
      storageService,
      uploadValidator
    );
    server.route(routes(albumHandler));
  },
};
