const base = require('@lcooper/eslint-config-react');

module.exports = {
    ...base,
    name: 'lcooper/typescript/react',
    files: ['**/*.{js,mjs,jsx,ts,mts,tsx}'],
    rules: {
        ...base.rules,
        // Disallow unnecessary fragments 🔧
        'react/jsx-no-useless-fragment': [2, {
            allowExpressions: true,
        }],
        // Ensures all component prop types are declared - only triggered by edge cases caused by type casting
        'react/prop-types': [2, {
            skipUndeclared: false,
        }],
        // Requiring defaults for optional props is unnecessary in typescript
        'react/require-default-props': 0,
        // TS support is way too inconsistent - only applies if props have a parameter object type annotation
        'react/sort-prop-types': 0,
    },
};