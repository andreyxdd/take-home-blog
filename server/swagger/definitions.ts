export default {
  UserRegistration: {
    required: ['email', 'password', 'name'],
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
    },
  },
  UserLogin: {
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
  UserResponse: {
    required: ['email', 'name', 'id'],
    properties: {
      email: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      id: {
        type: 'string',
      },
    },
  },
  PostResponse: {
    properties: {
      id: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      content: {
        type: 'string',
      },
      updatedAt: {
        type: 'string',
      },
      author: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
        },
      },
      files: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            filename: {
              type: 'string',
            },
            originalname: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  PostsResponse: {
    properties: {
      totalPages: {
        type: 'number',
      },
      data: {
        type: 'array',
        $ref: '#/definitions/PostResponse',
      },
    },
  },
  PostAddUpdate: {
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
        items: {},
      },
    },
  },
};
