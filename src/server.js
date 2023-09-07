require('dotenv').config();

const path = require('path');
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');

// album
const album = require('./api/album');
const AlbumService = require('./service/postgres/album');
const AlbumValidator = require('./validator/album');

// song
const song = require('./api/song');
const SongService = require('./service/postgres/song');
const SongValidator = require('./validator/song');

// playlist
const playlist = require('./api/playlist');
const PlaylistService = require('./service/postgres/playlist');
const PlaylistValidator = require('./validator/playlist');

// collaboration
const collaboration = require('./api/collaboration');
const CollaborationService = require('./service/postgres/collaboration');
const CollaborationValidator = require('./validator/collaboration');

// user
const user = require('./api/user');
const UserService = require('./service/postgres/user');
const UserValidator = require('./validator/user');

// authentication
const authentication = require('./api/authentication');
const AuthenticationService = require('./service/postgres/authentication');
const AuthenticationValidator = require('./validator/authentication');

// Export
const _export = require('./api/export');
const ProducerService = require('./service/rabbitmq/ProducerService');
const ExportValidator = require('./validator/export');

// upload
const StorageService = require('./service/storage/StorageService');
const UploadValidator = require('./validator/upload');

// cache
const CacheService = require('./service/redis/CacheService');

// token
const TokenManager = require('./tokenize/TokenManager');

// error
const ClientError = require('./exception/ClientError');

const init = async () => {
  const cacheService = new CacheService();

  const albumService = new AlbumService(cacheService);
  const songService = new SongService();
  const playlistService = new PlaylistService();
  const collaborationService = new CollaborationService();
  const userService = new UserService();
  const authenticationService = new AuthenticationService();

  const storageService = new StorageService(
    path.resolve(__dirname, 'api/album/file/cover')
  );

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
    // registrasi plugin eksternal
    await server.register([
      {
        plugin: Jwt,
      },
      {
        plugin: Inert,
      },
    ]);

    // mendefinisikan strategy autentikasi jwt
    server.auth.strategy('openmusicapp_jwt', 'jwt', {
      keys: process.env.ACCESS_TOKEN_KEY,
      verify: {
        aud: false,
        iss: false,
        sub: false,
        maxAgeSec: process.env.ACCESS_TOKEN_AGE,
      },
      validate: (artifact) => ({
        isValid: true,
        credentials: {
          id: artifact.decoded.payload.id,
        },
      }),
    });

    await server.register([
      {
        plugin: album,
        options: {
          albumService,
          albumValidator: AlbumValidator,
          storageService,
          uploadValidator: UploadValidator,
        },
      },
      {
        plugin: song,
        options: {
          service: songService,
          validator: SongValidator,
        },
      },
      {
        plugin: playlist,
        options: {
          service: playlistService,
          validator: PlaylistValidator,
        },
      },
      {
        plugin: collaboration,
        options: {
          collaborationService,
          validator: CollaborationValidator,
        },
      },
      {
        plugin: user,
        options: {
          service: userService,
          validator: UserValidator,
        },
      },
      {
        plugin: authentication,
        options: {
          authenticationService,
          userService,
          tokenManager: TokenManager,
          validator: AuthenticationValidator,
        },
      },
      {
        plugin: _export,
        options: {
          service: ProducerService,
          playlistService,
          validator: ExportValidator,
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
    console.log(`[APP] Server berjalan pada ${server.info.uri}`);
  } catch (error) {
    console.error('[APP] Terjadi kesalahan: ', error);
  }
};

init();
