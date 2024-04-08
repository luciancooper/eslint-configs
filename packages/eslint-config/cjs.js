const base = require('./base'),
    { node: { cjs, esm } } = require('./envs');

module.exports = [
    ...base,
    cjs,
    { files: ['**/*.mjs'], ...esm },
];