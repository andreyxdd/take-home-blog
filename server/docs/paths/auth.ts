export default {
  '/api/auth/login': {
    post: {
      tags: ['Auth'],
      security: { bearerAuth: [] },
      description: 'Login an existing user. This request attaches the access (at) and refresh tokens to the cookies.',
      requestBody: {
        description: 'Existing user credentials',
        type: 'object',
        content: {
          'application/json': {
            schema: {
              required: ['email', 'password'],
              properties: {
                email: {
                  type: 'string',
                  default: 'alice@test.com',
                },
                password: {
                  type: 'string',
                  default: 'qwerty123',
                },
              },
            },
          },
        },
      },
      produces: ['application/json'],
      responses: {
        200: {
          description: 'User is logged-in',
          schema: {
            $ref: '#/definitions/UserResponse',
          },
        },
      },
    },
  },
  '/api/auth/register': {
    post: {
      tags: ['Auth'],
      security: { bearerAuth: [] },
      description: 'Register a new user. This request attaches the access (at) and refresh tokens to the cookies.',
      requestBody: {
        description: 'New user credentials',
        content: {
          'application/json': {
            schema: {
              $ref: '#/definitions/UserRegistration',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'OK',
          schema: {
            $ref: '#/definitions/UserResponse',
          },
        },
      },
    },
  },
  '/api/auth/user': {
    get: {
      tags: ['Auth'],
      description: 'Get user data. This request check if \'Authorization\' header specifies a valid bearer token',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'User data',
          schema: {
            $ref: '#/definitions/UserResponse',
          },
        },
      },
    },
  },
  '/api/auth/logout': {
    post: {
      tags: ['Auth'],
      description: 'Logout an existing user. This authorized request removes auth tokens from the cookies.',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Success',
        },
      },
    },
  },
  '/api/auth/refresh-tokens': {
    patch: {
      tags: ['Auth'],
      security: { bearerAuth: [] },
      description: 'Issue new access and, if needed, refresh tokens. Similarly, the tokens are places in cookies. This call should be used in the middleware of the client request. This allows to update expired access token.',
      produces: ['application/json'],
    },
  },
};
