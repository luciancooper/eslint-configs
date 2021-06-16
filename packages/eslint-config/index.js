const { resolveCheck } = require('./utils');

module.exports = {
    extends: [
        'airbnb-base',
    ].concat([
        './rules/core',
        './rules/import',
    ].map(require.resolve)),
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    overrides: [resolveCheck('eslint-plugin-jsdoc') && {
        // only apply jsdoc rules to js files
        files: ['*.js', '*.mjs', '*.cjs', '*.jsx'],
        extends: [
            require.resolve('./rules/jsdoc'),
        ],
    }].filter(Boolean),
};