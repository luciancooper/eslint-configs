module.exports = {
    extends: [
        '@lcooper/eslint-config',
        require.resolve('./rules/base'),
        require.resolve('./rules/react'),
        require.resolve('./rules/react-hooks'),
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.json'],
            },
        },
    },
};