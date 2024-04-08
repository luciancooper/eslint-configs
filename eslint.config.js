module.exports = [
    { ignores: ['**/__fixtures__/**/*'] },
    ...require('@lcooper/eslint-config'),
    require('@lcooper/eslint-config-jest'),
    { settings: { 'import/internal-regex': /^@lcooper\/eslint-config/ } },
];