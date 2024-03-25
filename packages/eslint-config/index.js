const globals = require('globals'),
    core = require('./rules/core'),
    imports = require('./rules/import'),
    jsdoc = require('./rules/jsdoc');

module.exports = [
    { languageOptions: { globals: { ...globals.node } } },
    core,
    imports,
    jsdoc,
];