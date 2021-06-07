const { ESLint } = require('eslint'),
    baseConfig = require('.');

const linter = new ESLint({
    useEslintrc: false,
    allowInlineConfig: false,
    baseConfig,
});

describe('jest config', () => {
    test('is applied to files with test suffixes', async () => {
        await expect(linter.calculateConfigForFile('index.test.js')).resolves.toMatchObject({
            plugins: ['jest'],
        });
        await expect(linter.calculateConfigForFile('index.js')).resolves.not.toMatchObject({
            plugins: ['jest'],
        });
    });

    test('is applied to top-level files in test directories', async () => {
        await expect(linter.calculateConfigForFile('test/index.js')).resolves.toMatchObject({
            plugins: ['jest'],
        });
        await expect(linter.calculateConfigForFile('test/utils/index.js')).resolves.not.toMatchObject({
            plugins: ['jest'],
        });
    });

    test('is applied to top-level files in the __mocks__ directory', async () => {
        await expect(linter.calculateConfigForFile('__mocks__/index.js')).resolves.toMatchObject({
            plugins: ['jest'],
        });
        await expect(linter.calculateConfigForFile('__mocks__/utils/index.js')).resolves.not.toMatchObject({
            plugins: ['jest'],
        });
    });
});

describe('plugin rule coverage', () => {
    let jestRules;

    beforeAll(async () => {
        ({ jest: jestRules } = global.analyzePluginRules(
            await linter.calculateConfigForFile('index.test.js'),
        ));
    });

    test('configures no unknown `jest` plugin rules', () => {
        expect(jestRules.unknown).toHaveLength(0);
    });

    test('configures no deprecated `jest` plugin rules', () => {
        expect(jestRules.deprecated).toHaveLength(0);
    });

    test('configures all available `jest` plugin rules', () => {
        expect(jestRules.unused).toHaveLength(0);
    });
});