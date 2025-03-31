const { ESLint } = require('eslint'),
    baseConfig = require('.');

const linter = new ESLint({
    baseConfig: [baseConfig],
    overrideConfigFile: true,
    allowInlineConfig: false,
});

const plugins = ['react', 'react-hooks'];

describe('plugins', () => {
    test('config applies correct plugins to javascript files', async () => {
        await expect(linter.calculateConfigForFile('index.js')).resolves.toIncludePlugins(plugins);
        await expect(linter.calculateConfigForFile('component.jsx')).resolves.toIncludePlugins(plugins);
    });

    test('config applies correct plugins to typescript files', async () => {
        await expect(linter.calculateConfigForFile('index.ts')).resolves.toIncludePlugins(plugins);
        await expect(linter.calculateConfigForFile('component.tsx')).resolves.toIncludePlugins(plugins);
    });
});