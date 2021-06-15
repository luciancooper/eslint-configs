const { resolveCheck } = require('@lcooper/eslint-config/utils');

module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        '@lcooper/eslint-config',
        'plugin:@typescript-eslint/eslint-recommended',
        require.resolve('./rules/base'),
        require.resolve('./rules/import'),
    ],
    overrides: [{
        files: ['*.ts'],
        extends: [
            './rules/overrides',
            resolveCheck('eslint-plugin-tsdoc') && './rules/tsdoc',
        ].filter(Boolean).map(require.resolve),
    }],
};