export default {
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
        description: 'Title, text body of the post, and files array (if any).',
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/definitions/PostAddUpdate',
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
  '/api/blog/post/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Id of the post to update/delete it',
        type: 'string',
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
              $ref: '#/definitions/PostAddUpdate',
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
};
