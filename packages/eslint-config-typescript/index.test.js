const { FlatESLint } = require('eslint/use-at-your-own-risk'),
    tseslint = require('typescript-eslint'),
    sts = require('@stylistic/eslint-plugin-ts'),
    baseConfig = require('.');

describe('plugins', () => {
    let tsConfig,
        jsConfig;

    beforeAll(async () => {
        // calculate configs for `ts` and `js` file paths
        const eslint = new FlatESLint({ baseConfig, overrideConfigFile: true, allowInlineConfig: false });
        tsConfig = await eslint.calculateConfigForFile('index.ts');
        jsConfig = await eslint.calculateConfigForFile('index.js');
    });

    describe('`@typescript-eslint` plugin', () => {
        test('config includes the `@typescript-eslint` plugin', () => {
            expect(jsConfig).toIncludePlugin('@typescript-eslint');
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
                extensionRules = Object.entries(tseslint.plugin.rules).map(([name, { meta }]) => (!meta.deprecated ? {
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

    describe('`@stylistic/ts` plugin', () => {
        test('config includes the `@stylistic/ts` plugin', () => {
            expect(jsConfig).toIncludePlugin('@stylistic/ts');
            expect(tsConfig).toIncludePlugin('@stylistic/ts');
        });

        test('configures no unknown `@stylistic/ts/` plugin rules', () => {
            expect(tsConfig).toConfigureNoUnknownPluginRules('@stylistic/ts');
        });

        test('enables no deprecated `@stylistic/ts/` plugin rules', () => {
            expect(tsConfig).toEnableNoDeprecatedPluginRules('@stylistic/ts');
        });

        test('includes all `@stylistic/ts/` plugin rules', () => {
            expect(tsConfig).toConfigureAllPluginRules('@stylistic/ts', ['function-call-spacing']);
        });

        describe('extension rules', () => {
            let extensionRules;

            beforeAll(() => {
                // extract extension rule info from @stylistic/ts plugin module
                extensionRules = Object.entries(sts.rules).filter(([name, { meta }]) => (
                    !meta.deprecated && meta.docs.extendsBaseRule === true && name !== 'function-call-spacing'
                )).map(([name]) => ({ id: `@stylistic/ts/${name}`, baseRule: `@stylistic/js/${name}` }));
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

    describe('`tsdoc` plugin', () => {
        test('plugin does not apply to javascript files', () => {
            expect(jsConfig).not.toIncludePlugin('tsdoc');
        });

        test('plugin applies to typescript files', () => {
            expect(tsConfig).toIncludePlugin('tsdoc');
        });

        test('configures no unknown `tsdoc/` plugin rules', () => {
            expect(tsConfig).toConfigureNoUnknownPluginRules('tsdoc');
        });

        test('enables no deprecated `tsdoc/` plugin rules', () => {
            expect(tsConfig).toEnableNoDeprecatedPluginRules('tsdoc');
        });

        test('includes all `tsdoc/` plugin rules', () => {
            expect(tsConfig).toConfigureAllPluginRules('tsdoc');
        });
    });
});