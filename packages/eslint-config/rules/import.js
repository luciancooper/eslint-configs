const { rules: baseRules } = require('eslint-config-airbnb-base/rules/imports');

module.exports = {
    rules: {
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': (() => {
            const [level, { devDependencies, ...options }] = baseRules['import/no-extraneous-dependencies'];
            return [level, {
                ...options,
                devDependencies: [
                    // jest setup file
                    '**/setupTests.{js,jsx}',
                    // for non top-level test directories
                    '**/{test,tests}/**',
                    // stylelint config
                    '**/.stylelintrc.js',
                    '**/stylelint.config.js',
                    // babel config
                    '**/.babelrc.js',
                    '**/babel.config.js',
                    // postcss config
                    '**/.postcssrc.js',
                    '**/postcss.config.js',
                    // top-level tasks
                    'tasks/**',
                    // package level tasks in a monorepo
                    'packages/*/tasks/**',
                    // globs from base config
                    ...devDependencies,
                ],
            }];
        })(),
        // reports the use of import declarations with CommonJS exports
        'import/no-import-module-exports': 0, // seems unnecessary, disabling
        // prevent importing packages through relative paths
        'import/no-relative-packages': 0,
        // prevent importing from the same path multiple times
        'import/no-duplicates': [2, { 'prefer-inline': true }],
        // enforces or bans the use of inline type-only markers for named imports.
        'import/consistent-type-specifier-style': 0,
        // reports the use of empty named import blocks.
        'import/no-empty-named-blocks': 2,
        // enforces having one empty line after the last top-level import statement or require call.
        'import/newline-after-import': [2, { considerComments: true }],
    },
};