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
        files: ['*.ts', '*.tsx'],
        extends: [
            require.resolve('./rules/overrides'),
        ],
    }],
};