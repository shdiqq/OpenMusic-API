require('dotenv').config();

const Hapi = require('@hapi/hapi');
const album = require('./api/album');
const song = require('./api/song');
const AlbumService = require('./service/postgre/album');
const SongService = require('./service/postgre/song');
const AlbumValidator = require('./validator/album/index');
const SongValidator = require('./validator/song/index');
const ClientError = require('./exception/ClientError');

const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  try {
    await server.register([
      {
        plugin: album,
        options: {
          service: albumService,
          validator: AlbumValidator,
        },
      },
      {
        plugin: song,
        options: {
          service: songService,
          validator: SongValidator,
        },
      },
    ]);

    server.ext('onPreResponse', (request, h) => {
      // mendapatkan konteks response dari request
      const { response } = request;
      if (response instanceof Error) {
        // penanganan client error secara internal.
        if (response instanceof ClientError) {
          const newResponse = h.response({
            status: 'fail',
            message: response.message,
          });
          newResponse.code(response.statusCode);
          return newResponse;
        }
        // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
        if (!response.isServer) {
          return h.continue;
        }
        // penanganan server error sesuai kebutuhan
        const newResponse = h.response({
          status: 'error',
          message: 'terjadi kegagalan pada server kami',
        });
        newResponse.code(500);
        return newResponse;
      }
      // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
      return h.continue;
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};

init();
