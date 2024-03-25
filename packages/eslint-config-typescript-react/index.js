const base = require('@lcooper/eslint-config-react');

module.exports = {
    ...base,
    files: ['**/*.{js,mjs,jsx,ts,mts,tsx}'],
    rules: {
        ...base.rules,
        // Disallow unnecessary fragments 🔧
        'react/jsx-no-useless-fragment': [2, {
            allowExpressions: true,
        }],
    },
};