module.exports = {
    overrides: [{
        files: [
            '**/setupTests.[jt]s?(x)',
            '**/jest.setup.[jt]s?(x)',
            '**/test?(s)/*.[jt]s?(x)',
            '**/__tests__/*.[jt]s?(x)',
            '**/__mocks__/*.[jt]s?(x)',
            '**/+(*.)@(spec|test).[jt]s?(x)',
        ],
        extends: [
            require.resolve('./config'),
        ],
    }],
};