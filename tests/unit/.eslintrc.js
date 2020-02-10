module.exports = {
  env: {
    mocha: true,
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
