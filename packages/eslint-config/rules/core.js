const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');

module.exports = {
    plugins: [
        '@lcooper',
    ],
    rules: {
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
        // enforce default clauses in switch statements to be last (v7.0.0)
        'default-case-last': 2,
        // enforce default parameters to be last (v6.4.0)
        'default-param-last': 2,
        // require grouped accessor pairs in object literals and classes (v6.7.0)
        'grouped-accessor-pairs': [2, 'getBeforeSet'],
        // enforce a maximum number of classes per file
        'max-classes-per-file': 0,
        // disallow returning value from constructor (v6.7.0)
        'no-constructor-return': 2,
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
        // disallow duplicate conditions in if-else-if chains (v6.7.0)
        'no-dupe-else-if': 2,
        // disallow empty block statements
        'no-empty': [2, {
            allowEmptyCatch: true,
        }],
        // disallow assigning to imported bindings (v6.4.0)
        'no-import-assign': 2,
        // disallow literal numbers that lose precision (v7.1.0)
        'no-loss-of-precision': 2,
        // disallow returning values from Promise executor functions (v7.3.0)
        'no-promise-executor-return': 2,
        // disallow returning values from setters (v6.7.0)
        'no-setter-return': 2,
        // disallow sparse arrays
        'no-sparse-arrays': 0,
        // disallow loops with a body that allows only one iteration (7.3.0)
        'no-unreachable-loop': 2,
        // disallow useless backreferences in regular expressions (v7.0.0)
        'no-useless-backreference': 2,

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

        // enforce linebreaks after opening and before closing array brackets
        'array-bracket-newline': [2, 'consistent'],
        // enforce camelcase naming convention
        camelcase: 0,
        // require or disallow newline at the end of files
        'eol-last': [2, 'never'],
        // enforce line breaks between arguments of a function call (v6.2.0)
        'function-call-argument-newline': [2, 'consistent'],
        // enforce consistent indentation
        indent: [2, 4, {
            SwitchCase: 1,
        }],
        // enforce a maximum line length
        'max-len': [2, 120, 4, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        // disallow bitwise operators
        'no-bitwise': 0,
        // disallow `continue` statements
        'no-continue': 0,
        // disallow mixed binary operators
        'no-mixed-operators': [2, {
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
        // disallow nested ternary expressions
        'no-nested-ternary': 0,
        // disallow specified syntax
        'no-restricted-syntax': (() => {
            // modifiy airbnb's base config to allow for-of loops
            const [level, ...options] = baseStyleRules['no-restricted-syntax'],
                modifiedOptions = options.filter(({ selector }) => selector !== 'ForOfStatement');
            return [level, ...modifiedOptions];
        })(),
        // disallow dangling underscores in identifiers
        'no-underscore-dangle': 0,
        // enforce variables to be declared either together or separately in functions
        'one-var': 0,
        // disallow the use of `Math.pow` in favor of the `**` operator
        'prefer-exponentiation-operator': 2, // v6.7.0

        // Variables

        // disallow unused variables
        'no-unused-vars': [2, {
            vars: 'local',
            args: 'none',
        }],

        // Plugin Rules

        // require consecutive variable declarations to be combined into a single declaration
        '@lcooper/consecutive-declarations': 2,
    },
};