const { FlatESLint } = require('eslint/use-at-your-own-risk'),
    baseConfig = require('.');

describe('plugins', () => {
    let config;

    beforeAll(async () => {
        config = await new FlatESLint({
            baseConfig: [baseConfig],
            overrideConfigFile: true,
            allowInlineConfig: false,
        }).calculateConfigForFile('index.js');
    });

    describe('`react` plugin', () => {
        test('config includes the `react` plugin', () => {
            expect(config).toIncludePlugin('react');
        });

        test('configures no unknown `react/` plugin rules', () => {
            expect(config).toConfigureNoUnknownPluginRules('react');
        });

        test('enables no deprecated `react/` plugin rules', () => {
            expect(config).toEnableNoDeprecatedPluginRules('react');
        });

        test('includes all `react/` plugin rules', () => {
            expect(config).toConfigureAllPluginRules('react');
        });
    });

    describe('`react-hooks` plugin', () => {
        test('config includes the `react-hooks` plugin', () => {
            expect(config).toIncludePlugin('react-hooks');
        });

        test('configures no unknown `react-hooks/` plugin rules', () => {
            expect(config).toConfigureNoUnknownPluginRules('react-hooks');
        });

        test('enables no deprecated `react-hooks/` plugin rules', () => {
            expect(config).toEnableNoDeprecatedPluginRules('react-hooks');
        });

        test('includes all `react-hooks/` plugin rules', () => {
            expect(config).toConfigureAllPluginRules('react-hooks');
        });
    });
});