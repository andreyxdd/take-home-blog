export default {
  PostResponse: {
    properties: {
      id: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      body: {
        type: 'string',
      },
      createdAt: {
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
    type: 'object',
    required: ['title', 'body'],
    properties: {
      title: {
        type: 'string',
      },
      body: {
        type: 'string',
      },
      files: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  },
};
