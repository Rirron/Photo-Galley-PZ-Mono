// tests/data/testData.ts

const timestamp = Date.now();

export const testData = {
  automationUser: {
    username: '',
    password: '',
    userId: '',
  },

  credentials: {
    valid: { username: '', password: '' },
    invalid: { username: 'bad-user', password: 'bad-pass' },
  },

  messages: {
    loginError: 'Invalid email, username or password',
    emptyCredentialsError: 'Username and password required',
    usernameRequired: 'Username is required',
    passwordRequired: 'Password is required',
  },
  album: {
    name: `Album_${timestamp}`,
    description: 'Album used for automated tests',
  },

  images: {
    albumCover: {
      name: `album-cover-${timestamp}.jpg`,
      description: 'Cover image used for creating a new album',
      path: 'tests/assets/album-cover.jpg',
    },
    albumImage: {
      name: `album-image-${timestamp}.jpg`,
      description: 'Regular photo added inside an existing album',
      path: 'tests/assets/album-image.jpg',
    },
  },

  timestamp,
};
