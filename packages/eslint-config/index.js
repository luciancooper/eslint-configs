module.exports = {
    extends: [
        'airbnb-base',
    ].concat([
        './rules/core',
        './rules/import',
        './rules/jsdoc',
    ].map(require.resolve)),
    env: {
        es6: true,
        node: true,
    },
};