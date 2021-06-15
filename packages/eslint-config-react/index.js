module.exports = {
    extends: [
        '@lcooper/eslint-config',
        require.resolve('./rules/react'),
        require.resolve('./rules/react-hooks'),
    ],
    env: {
        browser: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.json'],
            },
        },
    },
    rules: {
        // enforce consistent use of  single quotes in JSX attributes
        'jsx-quotes': [2, 'prefer-single'],
    },
};