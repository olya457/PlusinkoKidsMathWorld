module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['jest.setup.js', '__tests__/**/*.tsx'],
      env: {
        jest: true,
      },
    },
  ],
};
