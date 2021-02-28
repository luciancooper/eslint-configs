module.exports = {
    overrides: [{
        files: [
            '**/setupTests.[jt]s?(x)',
            '**/jest.setup.[jt]s?(x)',
            '**/test?(s)/*.[jt]s?(x)',
            '**/__test?(s)__/*.[jt]s?(x)',
            '**/+(*.)@(spec|test).[jt]s?(x)',
        ],
        env: {
            jest: true,
        },
    }],
};