module.exports = {
    plugins: [
        '@lcooper',
    ],
    rules: {
        // consecutive-declarations
        'one-var': 0,
        '@lcooper/consecutive-declarations': 2,

        // global-require
        'global-require': 0,
        'node/global-require': 0,
        '@lcooper/global-require': 2,

        // prefer-template
        'prefer-template': 0,
        '@lcooper/prefer-template': 2,

        // top-level-padding-lines
        '@lcooper/top-level-padding-lines': 2,
    },
};