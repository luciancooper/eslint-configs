const base = require('../../jest.config.base');

module.exports = base('eslint-config-typescript', [
    '<rootDir>../../setupTests.js',
    '<rootDir>/setupTests.js',
]);