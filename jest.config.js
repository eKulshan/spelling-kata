module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
