export default {
  openapi: '3.0.3',
  info: {
    version: '1.0.0',
    title: 'Take Home Blog Node.js Project',
    description: 'API Documentation',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token to access secure endpoints',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
  basePath: '/',
  tags: [
    {
      name: 'Auth',
      description: 'Endpoints to handle jw-based authorization/authentification.\n\nBoth access and refresh token are stored in cookies. Enpoints that require authorization have a lock symbol. To make these authorized requests, first call the login endpoint (with default body parameters) or register a new user. The successful response will include tokens in cookies. Open the browser development tools and copy the access token that lies under \'ac\' key in the cookies. Input that token into the authorization form (see \'Authorized\' green button above). Now, the access to authorized endpoints has been acquired.\n\nAll authorized endpoints are based on the use of "authMiddleware" that checks validity of the "Authorization" header where the bearer-type access token should be specified on the client.',
    },
    {
      name: 'Blog',
      description: 'Endpoints to handle read/write/delete operation on the blog data.\n\nAll the endpoints in this section require authorization.',
    },
    {
      name: 'Files',
      description: 'Endpoints to handle uploaded files.\n\nAll the endpoints in this section require authorization.',
    },
  ],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};
