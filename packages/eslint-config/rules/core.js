module.exports = {
    rules: {
        indent: [2, 4, {
            SwitchCase: 1,
        }],
        'eol-last': [2, 'never'],
        'one-var': [2, 'consecutive'],
        'no-console': 0,
        'no-unused-vars': [2, {
            vars: 'local',
            args: 'none',
        }],
        'no-underscore-dangle': 0,
        'no-nested-ternary': 0,
        'no-bitwise': 0,
        'class-methods-use-this': 0,
        camelcase: 0,
        'no-continue': 0,
        'prefer-destructuring': [
            2,
            {
                VariableDeclarator: { array: false, object: true },
                AssignmentExpression: { array: false, object: false },
            },
            { enforceForRenamedProperties: false },
        ],
        'prefer-const': [2, {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
        }],
        'max-len': [2, 120, 4, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        'no-await-in-loop': 0,
        'consistent-return': [2, {
            treatUndefinedAsUnspecified: true,
        }],
        'no-void': 0,
        'no-loop-func': 0,
        'no-param-reassign': [2, {
            props: false,
        }],
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
        'no-empty': [2, {
            allowEmptyCatch: true,
        }],
        'max-classes-per-file': 0,
        'no-sparse-arrays': 0,
    },
};