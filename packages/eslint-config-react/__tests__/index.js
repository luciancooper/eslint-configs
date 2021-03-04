const { ESLint } = require('eslint'),
    baseConfig = require('../index');

describe('plugin rule coverage', () => {
    let reactRules,
        hooksRules;

    beforeAll(async () => {
        ({ react: reactRules, 'react-hooks': hooksRules } = global.analyzePluginRules(
            await new ESLint({
                baseConfig,
                useEslintrc: false,
                allowInlineConfig: false,
            }).calculateConfigForFile('index.js'),
        ));
    });

    test('configures no unknown `react` plugin rules', () => {
        expect(reactRules.unknown).toHaveLength(0);
    });

    test('configures no deprecated `react` plugin rules', () => {
        expect(reactRules.deprecated).toHaveLength(0);
    });

    test('configures all available `react` plugin rules', () => {
        expect(reactRules.unused).toHaveLength(0);
    });

    test('configures no unknown `react-hooks` plugin rules', () => {
        expect(hooksRules.unknown).toHaveLength(0);
    });

    test('configures no deprecated `react-hooks` plugin rules', () => {
        expect(hooksRules.deprecated).toHaveLength(0);
    });

    test('configures all available `react-hooks` plugin rules', () => {
        expect(hooksRules.unused).toHaveLength(0);
    });
});