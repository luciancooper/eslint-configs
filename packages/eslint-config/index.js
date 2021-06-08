const jsdocPluginPresent = (() => {
    try {
        require.resolve('eslint-plugin-jsdoc');
        return true;
    } catch (e) {
        return false;
    }
})();

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
    overrides: [jsdocPluginPresent && {
        // only apply jsdoc rules to js files
        files: ['*.js', '*.mjs', '*.cjs', '*.jsx'],
        extends: [
            require.resolve('./rules/jsdoc'),
        ],
    }].filter(Boolean),
};