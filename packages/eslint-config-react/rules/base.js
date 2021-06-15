module.exports = {
    env: {
        browser: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        // enforce consistent use of  single quotes in JSX attributes
        'jsx-quotes': [2, 'prefer-single'],
    },
};