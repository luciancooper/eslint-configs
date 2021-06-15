const { ESLint } = require('eslint'),
    baseConfig = require('.');

const linter = new ESLint({
    useEslintrc: false,
    allowInlineConfig: false,
    baseConfig,
});

describe('plugins', () => {
    test('config applies correct plugins to javascript files', async () => {
        const jsPlugins = ['@lcooper', 'import', 'jsdoc', 'react', 'react-hooks', '@typescript-eslint'];
        await expect(linter.calculateConfigForFile('index.js')).resolves.toIncludePlugins(jsPlugins);
        await expect(linter.calculateConfigForFile('component.jsx')).resolves.toIncludePlugins(jsPlugins);
    });

    test('config applies correct plugins to typescript files', async () => {
        const tsPlugins = ['@lcooper', 'import', 'react', 'react-hooks', '@typescript-eslint', 'tsdoc'];
        await expect(linter.calculateConfigForFile('index.ts')).resolves.toIncludePlugins(tsPlugins);
        await expect(linter.calculateConfigForFile('component.tsx')).resolves.toIncludePlugins(tsPlugins);
    });
});