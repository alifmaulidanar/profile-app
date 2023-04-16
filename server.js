const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');

const init = async () => {
  const server = Hapi.server({
      port: 9000,
      host: 'localhost',
      routes: {
        files: {
          relativeTo: Path.join(__dirname, 'app')
        }
      },
  });

  await server.register(Inert);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
      }
    }
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();