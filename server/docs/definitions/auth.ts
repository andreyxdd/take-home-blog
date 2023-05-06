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
};
