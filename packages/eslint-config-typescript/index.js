const core = require('@lcooper/eslint-config'),
    tseslint = require('typescript-eslint'),
    base = require('./rules/base'),
    overrides = require('./rules/overrides'),
    imports = require('./rules/import');

module.exports = [
    ...core,
    tseslint.configs.eslintRecommended,
    base,
    overrides,
    imports,
];