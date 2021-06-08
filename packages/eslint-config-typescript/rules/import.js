const { rules: baseRules } = require('@lcooper/eslint-config/rules/import');

module.exports = {
    settings: {
        'import/parsers': {
            // from 'plugin:import/typescript' config
            '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
        },
        'import/resolver': {
            node: {
                // add typescript extensions to airbnb's 'import/resolver' setting
                extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
            },
        },
        // adding typescript extensions to airbnb's 'import/extension' setting
        'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
        // resolve type definitions
        'import/external-module-folders': [
            'node_modules',
            'node_modules/@types',
        ],
    },
    rules: {
        // disabling these because typescript provides the same checks as part of standard type checking
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#eslint-plugin-import
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
        // extend base config to include typescript extensions
        'import/no-extraneous-dependencies': (() => {
            const [level, { devDependencies, ...options }] = baseRules['import/no-extraneous-dependencies'];
            return [level, {
                ...options,
                devDependencies: [
                    // airbnb's base config includes '**/jest.setup.js', so ts version must be added manually
                    '**/jest.setup.ts',
                    // replace {js,jsx} with {js,jsx,ts,tsx}
                    ...devDependencies.map((glob) => glob.replace('js,jsx', 'js,jsx,ts,tsx')),
                ],
            }];
        })(),
    },
};