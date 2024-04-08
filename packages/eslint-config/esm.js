const base = require('./base'),
    { node: { cjs, esm } } = require('./envs');

module.exports = [
    ...base,
    esm,
    { files: ['**/*.cjs'], ...cjs },
];