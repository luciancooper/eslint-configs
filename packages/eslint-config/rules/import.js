const plugin = require('eslint-plugin-import'),
    { rules: airbnb } = require('eslint-config-airbnb-base/rules/imports');

module.exports = {
    plugins: {
        import: plugin,
    },
    languageOptions: {
        parserOptions: {
            // Eslint doesn't supply ecmaVersion in `parser.js` `context.parserOptions`
            // This is required to avoid ecmaVersion < 2015 error or 'import' / 'export' error
            ecmaVersion: 'latest',
        },
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.mjs', '.js', '.jsx', '.json'],
            },
        },
        // added to address problems with plugin incompatability with flat configs
        // https://github.com/import-js/eslint-plugin-import/issues/2556
        'import/parsers': {
            espree: ['.js', '.cjs', '.mjs', '.jsx'],
        },
        'import/extensions': ['.js', '.mjs', '.jsx'],
        'import/core-modules': [],
        'import/ignore': [
            'node_modules',
            '\\.(coffee|scss|css|less|hbs|svg|json)$',
        ],
    },
    rules: {
        ...airbnb,
        // disabling this rule due to these issues:
        // https://github.com/import-js/eslint-plugin-import/issues/2132
        // https://github.com/import-js/eslint-plugin-import/issues/2703
        'import/no-unresolved': 0,
        // require modules with a single export to use a default export
        'import/prefer-default-export': 0,
        // forbid the use of extraneous packages
        'import/no-extraneous-dependencies': [2, {
            // incorperates globs from airbnb's config
            devDependencies: [
                // tests
                '**/{test,tests}/**',
                '**/__tests__/**',
                '**/__mocks__/**',
                'test.{js,mjs,cjs,jsx,ts,tsx}',
                'test-*.{js,mjs,cjs,jsx,ts,tsx}',
                '**/*{.,_}{test,spec}.{js,mjs,cjs,jsx,ts,tsx}',
                // jest config / setup
                '**/jest.config.{js,mjs,cjs,ts}',
                '**/jest.setup.{js,mjs,cjs,jsx,ts,tsx}',
                '**/setupTests.{js,mjs,cjs,jsx,ts,tsx}',
                // vue config
                '**/vue.config.{js,cjs}',
                // webpack config
                '**/webpack.config.{js,cjs}',
                '**/webpack.config.*.{js,cjs}',
                // rollup config
                '**/rollup.config.{js,cjs}',
                '**/rollup.config.*.{js,cjs}',
                // gulp config
                '**/gulpfile.{js,cjs}',
                '**/gulpfile.*.{js,cjs}',
                // gruntconfig
                '**/Gruntfile{,.js,.cjs}',
                // protractor config
                '**/protractor.conf.{js,cjs}',
                '**/protractor.conf.*.{js,cjs}',
                // karma config
                '**/karma.conf.{js,cjs}',
                // eslint config
                '**/.eslintrc.{js,cjs}',
                '**/eslint.config.{js,mjs,cjs}',
                // stylelint config
                '**/.stylelintrc.{js,cjs}',
                '**/stylelint.config.{js,cjs}',
                // babel config
                '**/.babelrc.{js,cjs}',
                '**/babel.config.{js,cjs}',
                // postcss config
                '**/.postcssrc.{js,cjs}',
                '**/postcss.config.{js,cjs}',
                // commitlint config
                '**/.commitlintrc.{js,cjs,mjs,ts,cts}',
                '**/commitlint.config.{js,cjs,mjs,ts,cts}',
                // top-level tasks
                'tasks/**',
                // package level tasks in a monorepo
                'packages/*/tasks/**',
            ],
            optionalDependencies: false,
        }],
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
        'import/newline-after-import': 0, // disabling since `@lcooper/top-level-padding-lines` enforces
    },
};