module.exports = {
    rules: {
        // Best Practices

        // enforce that class methods utilize `this`
        'class-methods-use-this': 0,
        // require `return` statements to either always or never specify values
        'consistent-return': [2, {
            treatUndefinedAsUnspecified: true,
        }],
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

        // Possible Errors

        // disallow `await` inside of loops
        'no-await-in-loop': 0,
        // disallow the use of `console`
        'no-console': 0,
        // disallow empty block statements
        'no-empty': [2, {
            allowEmptyCatch: true,
        }],
        // disallow sparse arrays
        'no-sparse-arrays': 0,

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
        // require or disallow newline at the end of files
        'eol-last': [2, 'never'],
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
        // disallow dangling underscores in identifiers
        'no-underscore-dangle': 0,
        // enforce variables to be declared either together or separately in functions
        'one-var': [2, 'consecutive'],

        // Variables

        // disallow unused variables
        'no-unused-vars': [2, {
            vars: 'local',
            args: 'none',
        }],
    },
};