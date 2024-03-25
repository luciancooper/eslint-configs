const globals = require('globals'),
    sjs = require('@stylistic/eslint-plugin-js'),
    lcooper = require('@lcooper/eslint-plugin');

const airbnb = {
    ...require('eslint-config-airbnb-base/rules/best-practices').rules,
    ...require('eslint-config-airbnb-base/rules/errors').rules,
    ...require('eslint-config-airbnb-base/rules/node').rules,
    ...require('eslint-config-airbnb-base/rules/style').rules,
    ...require('eslint-config-airbnb-base/rules/variables').rules,
    ...require('eslint-config-airbnb-base/rules/es6').rules,
    ...require('eslint-config-airbnb-base/rules/strict').rules,
};

module.exports = {
    plugins: {
        '@lcooper': lcooper,
        '@stylistic/js': sjs,
    },
    languageOptions: {
        ecmaVersion: 'latest',
        globals: {
            ...globals.es2021,
        },
    },
    linterOptions: {
        reportUnusedDisableDirectives: 'error',
    },
    rules: {
        ...airbnb,
        // disable all legacy rules that were moved to @stylistic/js
        ...sjs.configs['disable-legacy'].rules,
        // configure all stylistic rules with airbnb base config
        ...Object.keys(sjs.rules).reduce((acc, key) => {
            if (Object.hasOwnProperty.call(airbnb, key)) {
                acc[`@stylistic/js/${key}`] = airbnb[key];
            }
            return acc;
        }, {}),

        // Plugin Rules

        // include @lcooper plugin recommended config
        ...lcooper.configs.all.rules,
        // require padding lines between top level statements
        '@lcooper/top-level-padding-lines': [2, 'always', {
            betweenSingleLines: 'ignore',
        }],

        // Best Practices

        // enforce that class methods utilize `this`
        'class-methods-use-this': 0,
        // require `return` statements to either always or never specify values
        'consistent-return': [2, {
            treatUndefinedAsUnspecified: true,
        }],
        // require `default` cases in `switch` statements
        'default-case': [2, {
            // alter the comment pattern from airbnb's config to allow more verbose comments
            commentPattern: '^no default',
        }],
        // require grouped accessor pairs in object literals and classes (v6.7.0)
        'grouped-accessor-pairs': [2, 'getBeforeSet'],
        // enforce a maximum number of classes per file
        'max-classes-per-file': 0,
        // disallow function declarations that contain unsafe references inside loop statements
        'no-loop-func': 0,
        // disallow reassigning `function` parameters
        'no-param-reassign': [2, {
            props: false,
        }],
        // disallow `void` operators
        'no-void': 0,
        // disallow use of the `RegExp` constructor in favor of regular expression literals (v6.4.0)
        'prefer-regex-literals': 2,

        // Possible Errors

        // disallow `await` inside of loops
        'no-await-in-loop': 0,
        // disallow the use of `console`
        'no-console': 0,
        // disallow control characters in regular expressions
        'no-control-regex': 0,
        // disallow empty block statements
        'no-empty': [2, {
            allowEmptyCatch: true,
        }],
        // disallow sparse arrays
        'no-sparse-arrays': 0,
        // disallow loops with a body that allows only one iteration (7.3.0)
        'no-unreachable-loop': 2,

        // ECMAScript 6

        // require `const` declarations for variables that are never reassigned after declared
        'prefer-const': [2, {
            destructuring: 'all', // apply rule only if all destructured variables should be const
            ignoreReadBeforeAssign: true,
        }],
        // require destructuring from arrays and/or objects
        'prefer-destructuring': [2, {
            VariableDeclarator: { array: false, object: true },
            AssignmentExpression: { array: false, object: false },
        }, {
            enforceForRenamedProperties: false,
        }],

        // Stylistic Issues

        // enforce camelcase naming convention
        camelcase: 0,
        // require or disallow named `function` expressions
        'func-names': [1, 'as-needed'],
        // disallow bitwise operators
        'no-bitwise': 0,
        // disallow `continue` statements
        'no-continue': 0,
        // disallow nested ternary expressions
        'no-nested-ternary': 0,
        // disallow specified syntax
        'no-restricted-syntax': (() => {
            // modifiy airbnb's base config to allow for-of loops
            const [level, ...options] = airbnb['no-restricted-syntax'],
                modifiedOptions = options.filter(({ selector }) => selector !== 'ForOfStatement');
            return [level, ...modifiedOptions];
        })(),
        // disallow dangling underscores in identifiers
        'no-underscore-dangle': 0,

        // Variables

        // disallow unused variables
        'no-unused-vars': [2, {
            vars: 'local',
            args: 'none',
        }],

        // stylistic rules

        // enforce linebreaks after opening and before closing array brackets
        '@stylistic/js/array-bracket-newline': [2, 'consistent'],
        // require or disallow newline at the end of files
        '@stylistic/js/eol-last': [2, 'never'],
        // enforce consistent indentation
        '@stylistic/js/indent': [2, 4, {
            SwitchCase: 1,
        }],
        // enforce a maximum line length
        '@stylistic/js/max-len': [2, 120, 4, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        // enforce a maximum number of statements allowed per line
        '@stylistic/js/max-statements-per-line': [2, { max: 1 }],
        // disallow mixed binary operators
        '@stylistic/js/no-mixed-operators': [2, {
            groups: [
                ['**', '+'],
                ['**', '-'],
                ['**', '*'],
                ['**', '/'],
                ['**', '%'],
                ['%', '+'],
                ['%', '-'],
                ['%', '*'],
                ['%', '/'],
                ['&', '|', '^', '<<', '>>', '>>>', '==', '!=', '===', '!==', '>', '>=', '<', '<=', 'in', 'instanceof'],
                ['&&', '||'],
            ],
            allowSamePrecedence: false,
        }],
        // enforce consistent line breaks after opening and before closing braces
        '@stylistic/js/object-curly-newline': (() => {
            // modifiy airbnb's base config to allow for 6 properties in a line for import / export statements
            const [level, { ImportDeclaration, ExportDeclaration, ...options }] = airbnb['object-curly-newline'];
            return [level, {
                ...options,
                ImportDeclaration: { ...ImportDeclaration, minProperties: 7 },
                ExportDeclaration: { ...ExportDeclaration, minProperties: 7 },
            }];
        })(),
    },
};