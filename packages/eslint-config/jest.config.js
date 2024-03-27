const base = require('../../jest.config.base');

module.exports = base('eslint-config', [
    '<rootDir>../../setupTests.js',
    '<rootDir>/setupTests.js',
]);