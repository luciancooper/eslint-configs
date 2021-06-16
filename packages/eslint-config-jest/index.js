module.exports = {
    overrides: [{
        files: [
            '**/setupTests.[jt]s?(x)',
            '**/jest.setup.[jt]s?(x)',
            '**/test?(s)/**/*.[jt]s?(x)',
            '**/__@(tests|mocks)__/**/*.[jt]s?(x)',
            '**/+(*.)@(spec|test).[jt]s?(x)',
            '**/test.[jt]s?(x)',
        ],
        excludedFiles: [
            '**/fixtures/**',
            '**/__fixtures__/**',
        ],
        extends: [
            require.resolve('./config'),
        ],
    }],
};