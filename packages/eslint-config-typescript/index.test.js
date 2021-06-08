const { ESLint } = require('eslint'),
    tsPlugin = require('@typescript-eslint/eslint-plugin'),
    baseConfig = require('.');

describe('plugins', () => {
    let tsConfig,
        jsConfig;

    beforeAll(async () => {
        // calculate configs for `ts` and `js` file paths
        const eslint = new ESLint({ baseConfig, useEslintrc: false, allowInlineConfig: false });
        tsConfig = await eslint.calculateConfigForFile('index.ts');
        jsConfig = await eslint.calculateConfigForFile('index.js');
    });

    describe('`@typescript-eslint` plugin', () => {
        test('config includes the `@typescript-eslint` plugin', () => {
            expect(tsConfig).toIncludePlugin('@typescript-eslint');
        });

        test('configures no unknown `@typescript-eslint/` plugin rules', () => {
            expect(tsConfig).toConfigureNoUnknownPluginRules('@typescript-eslint');
        });

        test('enables no deprecated `@typescript-eslint/` plugin rules', () => {
            expect(tsConfig).toEnableNoDeprecatedPluginRules('@typescript-eslint');
        });

        test('includes all `@typescript-eslint/` plugin rules', () => {
            expect(tsConfig).toConfigureAllPluginRules('@typescript-eslint');
        });

        describe('extension rules', () => {
            let extensionRules;

            beforeAll(() => {
                // extract extension rule info from ts plugin module
                extensionRules = Object.entries(tsPlugin.rules).map(([name, { meta }]) => (!meta.deprecated ? {
                    id: `@typescript-eslint/${name}`,
                    baseRule: meta.docs.extendsBaseRule === true ? name : meta.docs.extendsBaseRule,
                } : null)).filter((rule) => (rule && rule.baseRule));
            });

            test('associated base rules are disabled on typescript files', () => {
                expect(tsConfig).toHaveDisabledAssociatedBaseRules(extensionRules);
            });

            test('are disabled on javascript files', () => {
                expect(jsConfig).toHaveDisabledRules(extensionRules.map(({ id }) => id));
            });
        });
    });

    describe('`jsdoc` plugin', () => {
        test('plugin applies to javascript files', () => {
            expect(jsConfig).toIncludePlugin('jsdoc');
        });

        test('plugin does not apply to typescript files', () => {
            expect(tsConfig).not.toIncludePlugin('jsdoc');
        });
    });
});