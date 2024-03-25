module.exports = (displayName, setupFilesAfterEnv = ['<rootDir>../../setupTests.js']) => ({
    displayName,
    testEnvironment: 'node',
    setupFilesAfterEnv,
});