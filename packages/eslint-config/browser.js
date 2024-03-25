const globals = require('globals'),
    base = require('./index');

module.exports = [
    { languageOptions: { globals: { ...globals.browser } } },
    ...base.slice(1),
];