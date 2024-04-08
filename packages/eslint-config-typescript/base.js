const jsbase = require('@lcooper/eslint-config/base'),
    tseslint = require('typescript-eslint'),
    core = require('./rules/core'),
    overrides = require('./rules/overrides'),
    imports = require('./rules/import');

module.exports = [
    ...jsbase,
    tseslint.configs.eslintRecommended,
    core,
    overrides,
    imports,
];