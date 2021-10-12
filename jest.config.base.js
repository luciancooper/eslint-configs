module.exports = (displayName, setupFilesAfterEnv = ['<rootDir>../../setupTests.js']) => ({
    displayName,
    testEnvironment: 'node',
    setupFilesAfterEnv,
    moduleNameMapper: {
        '@eslint/eslintrc/universal': '@eslint/eslintrc/dist/eslintrc-universal.cjs',
        'eslint/use-at-your-own-risk': 'eslint/lib/unsupported-api.js',
    },
});