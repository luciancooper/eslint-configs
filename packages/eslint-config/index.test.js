const { FlatESLint } = require('eslint/use-at-your-own-risk'),
    baseConfig = require('.');

// create linter with config
const linter = new FlatESLint({
    baseConfig,
    overrideConfigFile: true,
});

// jsdoc syntax tests
describe('jsdoc fixtures', () => {
    test.each(global.parseFixtures(__dirname, 'jsdoc.js'))('%s', (message, errors, code) => (
        expect(linter.lintText(code, { filePath: 'jsdoc.js' }))
            .resolves.toHaveErrorCount(errors)
    ));
});

// no-mixed-operator tests
describe('no-mixed-operator fixtures', () => {
    test.each(global.parseFixtures(__dirname, 'operators.js'))('%s', (message, errors, code) => (
        expect(linter.lintText(code, { filePath: 'operators.js' }))
            .resolves.toHaveErrorCount(errors)
    ));
});

describe('plugins', () => {
    let config;

    beforeAll(async () => {
        config = await new FlatESLint({
            baseConfig,
            overrideConfigFile: true,
            allowInlineConfig: false,
        }).calculateConfigForFile('index.js');
    });

    describe('`@stylistic/js` plugin', () => {
        test('config includes the `@stylistic/js` plugin', () => {
            expect(config).toIncludePlugin('@stylistic/js');
        });

        test('configures no unknown `@stylistic/js/` plugin rules', () => {
            expect(config).toConfigureNoUnknownPluginRules('@stylistic/js');
        });

        test('enables no deprecated `@stylistic/js/` plugin rules', () => {
            expect(config).toEnableNoDeprecatedPluginRules('@stylistic/js');
        });

        test('includes all `@stylistic/js/` plugin rules', () => {
            expect(config).toConfigureAllPluginRules('@stylistic/js', ['function-call-spacing']);
        });
    });

    describe('`import` plugin', () => {
        test('config includes the `import` plugin', () => {
            expect(config).toIncludePlugin('import');
        });

        test('configures no unknown `import/` plugin rules', () => {
            expect(config).toConfigureNoUnknownPluginRules('import');
        });

        test('enables no deprecated `import/` plugin rules', () => {
            expect(config).toEnableNoDeprecatedPluginRules('import');
        });

        test('includes all `import/` plugin rules', () => {
            expect(config).toConfigureAllPluginRules('import');
        });
    });

    describe('`jsdoc` plugin', () => {
        test('config includes the `jsdoc` plugin', () => {
            expect(config).toIncludePlugin('jsdoc');
        });

        test('configures no unknown `jsdoc/` plugin rules', () => {
            expect(config).toConfigureNoUnknownPluginRules('jsdoc');
        });

        test('enables no deprecated `jsdoc/` plugin rules', () => {
            expect(config).toEnableNoDeprecatedPluginRules('jsdoc');
        });

        test('includes all `jsdoc/` plugin rules', () => {
            expect(config).toConfigureAllPluginRules('jsdoc');
        });
    });
});