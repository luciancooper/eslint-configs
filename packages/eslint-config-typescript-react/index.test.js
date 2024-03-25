const { FlatESLint } = require('eslint/use-at-your-own-risk'),
    baseConfig = require('.');

const linter = new FlatESLint({
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