const core = require('./rules/core'),
    imports = require('./rules/import'),
    jsdoc = require('./rules/jsdoc');

module.exports = [
    core,
    imports,
    jsdoc,
];