const { ESLint } = require('eslint'),
    baseConfig = require('.');

// create linter with config
const linter = new ESLint({
    baseConfig,
});

// jsdoc syntax tests
describe('jsdoc fixtures', () => {
    test.each(global.parseFixtures(__dirname, 'jsdoc.js'))('%s', (message, errors, code) => (
        expect(linter.lintText(code)).resolves.toHaveErrorCount(errors)
    ));
});

// no-mixed-operator tests
describe('no-mixed-operator fixtures', () => {
    test.each(global.parseFixtures(__dirname, 'operators.js'))('%s', (message, errors, code) => (
        expect(linter.lintText(code)).resolves.toHaveErrorCount(errors)
    ));
});

describe('plugin rule coverage', () => {
    let importRules,
        jsdocRules;

    beforeAll(async () => {
        ({ import: importRules, jsdoc: jsdocRules } = global.analyzePluginRules(
            await new ESLint({
                baseConfig,
                useEslintrc: false,
                allowInlineConfig: false,
            }).calculateConfigForFile('index.js'),
        ));
    });

    test('configures no unknown `import` plugin rules', () => {
        expect(importRules.unknown).toHaveLength(0);
    });

    test('configures no deprecated `import` plugin rules', () => {
        expect(importRules.deprecated).toHaveLength(0);
    });

    test('configures all available `import` plugin rules', () => {
        expect(importRules.unused).toHaveLength(0);
    });

    test('configures no unknown `jsdoc` plugin rules', () => {
        expect(jsdocRules.unknown).toHaveLength(0);
    });

    test('configures no deprecated `jsdoc` plugin rules', () => {
        expect(jsdocRules.deprecated).toHaveLength(0);
    });

    test('configures all available `jsdoc` plugin rules', () => {
        expect(jsdocRules.unused).toHaveLength(0);
    });
});