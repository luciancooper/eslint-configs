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
                    // eslint config
                    '**/.eslintrc.js',
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
    },
};