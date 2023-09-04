const CollaborationHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'collaboration',
  version: '1.0.0',
  register: async (server, { collaborationService, validator }) => {
    const collaborationHandler = new CollaborationHandler(
      collaborationService, validator,
    );
    server.route(routes(collaborationHandler));
  },
};
