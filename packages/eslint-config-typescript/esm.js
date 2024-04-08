const { node: { cjs, esm } } = require('@lcooper/eslint-config/envs'),
    base = require('./base');

module.exports = [
    ...base,
    { files: ['**/*.js', '**/*.mjs'], ...esm },
    { files: ['**/*.cjs'], ...cjs },
];