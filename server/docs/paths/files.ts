export default {
  '/api/files/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'File id as it appears in the \'uploads\' directory. This filename is passed with response body of the \'api/blog/posts\' GET endpoint.',
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
