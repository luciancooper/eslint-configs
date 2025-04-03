module.exports = {
    name: 'lcooper/typescript/import',
    settings: {
        'import/parsers': {
            // from 'plugin:import/typescript' config
            '@typescript-eslint/parser': ['.ts', '.cts', '.mts', '.tsx'],
        },
        'import/resolver': {
            node: {
                // add typescript extensions to airbnb's 'import/resolver' setting
                extensions: ['.ts', '.cts', '.mts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
            },
            typescript: {
                alwaysTryTypes: true,
            },
        },
        // adding typescript extensions to airbnb's 'import/extension' setting
        'import/extensions': ['.ts', '.cts', '.mts', '.tsx', '.mjs', '.js', '.jsx'],
        // resolve type definitions
        'import/external-module-folders': [
            'node_modules',
            'node_modules/@types',
        ],
    },
    rules: {
        // disabling these because typescript provides the same checks as part of standard type checking
        // https://typescript-eslint.io/troubleshooting/performance-troubleshooting/#eslint-plugin-import
        'import/named': 0,
        'import/no-named-as-default-member': 0,

        // extending  to include `ts` and `tsx` extensions
        'import/extensions': [2, 'ignorePackages', {
            js: 'never',
            mjs: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
        }],
    },
};