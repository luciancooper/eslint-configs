const { ESLint } = require('eslint'),
    baseConfig = require('.');

const linter = new ESLint({
    useEslintrc: false,
    allowInlineConfig: false,
    baseConfig,
});

describe('config override globs', () => {
    test('match files with `.test` and `.spec` suffixes', async () => {
        await expect(linter.calculateConfigForFile('index.test.js'))
            .resolves.toIncludePlugin('jest');
        await expect(linter.calculateConfigForFile('index.spec.js'))
            .resolves.toIncludePlugin('jest');
        await expect(linter.calculateConfigForFile('index.js'))
            .resolves.not.toIncludePlugin('jest');
    });

    test('match top-level files in test directories', async () => {
        await expect(linter.calculateConfigForFile('test/index.js'))
            .resolves.toIncludePlugin('jest');
        await expect(linter.calculateConfigForFile('test/utils/index.js'))
            .resolves.not.toIncludePlugin('jest');
    });

    test('match top-level files in the __mocks__ directory', async () => {
        await expect(linter.calculateConfigForFile('__mocks__/index.js'))
            .resolves.toIncludePlugin('jest');
        await expect(linter.calculateConfigForFile('__mocks__/utils/index.js'))
            .resolves.not.toIncludePlugin('jest');
    });
});

describe('`jest` plugin', () => {
    let config;

    beforeAll(async () => {
        config = await linter.calculateConfigForFile('index.test.js');
    });

    test('configures no unknown `jest/` plugin rules', () => {
        expect(config).toConfigureNoUnknownPluginRules('jest');
    });

    test('enables no deprecated `jest/` plugin rules', () => {
        expect(config).toEnableNoDeprecatedPluginRules('jest');
    });

    test('includes all `jest/` plugin rules', () => {
        expect(config).toConfigureAllPluginRules('jest');
    });
});