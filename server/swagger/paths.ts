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

  '/api/blog/posts': {
    get: {
      tags: ['Blog'],
      description: 'Get posts with pagination. This authorized endpoint returns the total number of pages for the provided limit on one page.',
      parameters: [
        {
          name: 'page',
          in: 'query',
          description: 'Page nunmber',
          default: 1,
        },
        {
          name: 'limit',
          in: 'query',
          description: 'Pagination limit',
          default: 20,
        },
      ],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'List of posts as pre pagination settings porvided in the query parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/PostsResponse',
              },
            },

          },
        },
      },
    },
    post: {
      tags: ['Blog'],
      description: 'Add a new post',
      requestBody: {
        description: 'Title, content, and files array (if any) of a new post',
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              required: ['title', 'content', 'file'],
              properties: {
                title: {
                  type: 'string',
                },
                content: {
                  type: 'string',
                },
                file: {
                  type: 'array',
                  items: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'A new post has been successfully created.',
        },
      },
    },
  },
  '/api/blog/post': {
    parameters: [
      {
        name: 'id',
        in: 'query',
        required: true,
        description: 'Id of the post to update/delete it',
        type: 'integer',
      },
    ],
    patch: {
      description: 'Update a post with the given id',
      tags: ['Blog'],
      requestBody: {
        description: 'Updated title, content, and files array (if any) for an existing post.',
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              required: ['title', 'content', 'files'],
              properties: {
                title: {
                  type: 'string',
                },
                content: {
                  type: 'string',
                },
                files: {
                  type: 'array',
                  items: {
                    type: 'object',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'An existing post has been successfully updated.',
        },
      },
    },
    delete: {
      description: 'Delete the post with the given id.',
      tags: ['Blog'],
      responses: {
        200: {
          description: 'The post was successfully deleted.',
        },
      },
    },
  },
  '/api/file': {
    parameters: [
      {
        name: 'filename',
        in: 'query',
        required: true,
        description: 'Filename as it appears in the \'uploads\' directory. This filename is passed with response body of the \'api/blog/posts\' GET endpoint.',
        type: 'integer',
      },
    ],
    get: {
      description: 'Get the media file with the given filename',
      tags: ['Files'],
      responses: {
        200: {
          description: 'A file successfully was successful retrived.',
        },
      },
    },
    delete: {
      description: 'Delete a media file with the given filename.',
      tags: ['Files'],
      responses: {
        200: {
          description: 'A file successfully was successful deleted.',
        },
      },
    },
  },
};
