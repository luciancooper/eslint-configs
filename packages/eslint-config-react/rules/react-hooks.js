module.exports = {
    plugins: [
        'react-hooks',
    ],
    rules: {
        // Checks rules of Hooks
        'react-hooks/rules-of-hooks': 2,
        // Checks effect dependencies
        'react-hooks/exhaustive-deps': 2,
    },
};