module.exports = {
    extends: [
        'airbnb-base',
    ],
    env: {
        es6: true,
        node: true,
    },
    rules: {
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'eol-last': ['error', 'never'],
        'one-var': ['error', 'consecutive'],
        'no-console': 'off',
        'no-unused-vars': ['error', {
            vars: 'local',
            args: 'none',
        }],
        'no-underscore-dangle': 'off',
        'no-nested-ternary': 'off',
        'no-bitwise': 'off',
        'class-methods-use-this': 'off',
        camelcase: 'off',
        'no-continue': 'off',
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: { array: false, object: true },
                AssignmentExpression: { array: false, object: false },
            },
            { enforceForRenamedProperties: false },
        ],
        'max-len': ['error', 120, 4, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        'no-await-in-loop': 'off',
        'consistent-return': ['error', {
            treatUndefinedAsUnspecified: true,
        }],
        'no-void': 'off',
    },
};