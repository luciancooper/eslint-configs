const { resolveCheck } = require('@lcooper/eslint-config/utils');

module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        '@lcooper/eslint-config',
        '@lcooper/eslint-config-react/rules/base',
        '@lcooper/eslint-config-react/rules/react',
        '@lcooper/eslint-config-react/rules/react-hooks',
        'plugin:@typescript-eslint/eslint-recommended',
        '@lcooper/eslint-config-typescript/rules/base',
        '@lcooper/eslint-config-typescript/rules/import',
    ],
    overrides: [{
        files: ['*.ts', '*.tsx'],
        extends: [
            '@lcooper/eslint-config-typescript/rules/overrides',
            resolveCheck('eslint-plugin-tsdoc') && '@lcooper/eslint-config-typescript/rules/tsdoc',
        ].filter(Boolean),
    }],
};